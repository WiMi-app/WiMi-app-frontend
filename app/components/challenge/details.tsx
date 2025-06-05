import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  Modal
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Challenge {
  id: string;
  title: string;
  description: string;
  due_date: string;
  location: string;
  restriction: string;
  repetition: string;
  repetition_frequency: number | null;
  repetition_days: string[] | null;
  check_in_time: string | null;
  is_private: boolean;
  time_window: number | null;
  background_photo: string[] | null;
  creator_id: string;
  created_at: string;
  updated_at: string;
}

interface Participant {
  challenge_id: string;
  user_id: string;
  joined_at: string;
  status: string;
}

interface User {
  id: string;
  email: string;
  username: string;
  full_name: string;
  avatar_url: string[] | null;
  bio: string | null;
  updated_at: string;
}

interface DetailsScreenProps {
  challenge?: Challenge;
}

const DetailsScreen = ({ challenge }: DetailsScreenProps) => {
  const [participants, setParticipants] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', description: '' });

  useEffect(() => {
    if (challenge?.id) {
      fetchParticipants();
    }
  }, [challenge?.id]);

  const formatImageUrl = (urlParts: string[] | null, defaultType: 'avatar' | 'background' = 'background', username?: string) => {
    if (urlParts && urlParts.length === 2) {
      const [bucketName, fileName] = urlParts;
      return `https://vnxbcytjkzpmcdjkmkba.supabase.co/storage/v1/object/public/${bucketName}//${fileName}`;
    }
    if (defaultType === 'avatar' && username) {
      return `https://ui-avatars.com/api/?name=${username}&background=random`;
    }
    // Return a default background or handle missing background case if needed
    return 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?q=80&w=2070'; // Default placeholder
  };

  const fetchParticipants = async () => {
    if (!challenge?.id) return;
    
    setLoading(true);
    try {
      // Fetch participants
      const participantsResponse = await fetch(
        `https://wimi-app-backend-999646107030.us-east5.run.app/api/v0/challenges/${challenge.id}/participants`
      );
      const participantsData: Participant[] = await participantsResponse.json();

      // Fetch user details for each participant
      const userPromises = participantsData.slice(0, 5).map(async (participant) => {
        const userResponse = await fetch(
          `https://wimi-app-backend-999646107030.us-east5.run.app/api/v0/users/${participant.user_id}`
        );
        return userResponse.json();
      });

      const users: User[] = await Promise.all(userPromises);
      setParticipants(users);
    } catch (error) {
      console.error('Failed to fetch participants:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleIconPress = (icon: 'repetition' | 'time_window' | 'visibility') => {
    let title = '';
    let description = '';
    switch (icon) {
      case 'repetition':
        title = 'Repetition';
        description = 'This indicates how often the challenge activity should be performed.';
        break;
      case 'time_window':
        title = 'Grace Period';
        description = 'Even if you missed checking in on time, don\'t worry!. You still have a chance to check in!';
        break;
      case 'visibility':
        title = 'Visibility';
        description = 'This shows whether the challenge is public (visible to everyone) or private (visible only to invited participants).';
        break;
    }
    setModalContent({ title, description });
    setModalVisible(true);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatTime = (timeString: string | null) => {
    if (!timeString) return 'Anytime';
    const [hour, minute] = timeString.split(':');
    const h = parseInt(hour, 10);
    const ampm = h >= 12 ? 'PM' : 'AM';
    const formattedHour = h % 12 || 12;
    return `${formattedHour}:${minute} ${ampm}`;
  };

  if (!challenge) {
    return (
      <View style={styles.container}>
        <Text style={styles.emptyText}>Select a challenge to view details</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPressOut={() => setModalVisible(false)}
        >
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>{modalContent.title}</Text>
            <Text style={styles.modalText}>{modalContent.description}</Text>
            <TouchableOpacity
              style={styles.buttonClose}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.buttonCloseText}>Got it!</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      <View style={styles.header}>
        <Text style={styles.title}>{challenge.title}</Text>
      </View>

      <View style={styles.section}>
        <View style={styles.detailItem}>
          <Ionicons name="calendar-outline" size={20} color="#5858E8" style={styles.icon} />
          <Text style={styles.detailText}>Due: {formatDate(challenge.due_date)}</Text>
        </View>
        <View style={styles.detailItem}>
          <Ionicons name="time-outline" size={20} color="#5858E8" style={styles.icon} />
          <Text style={styles.detailText}>Check-in: {formatTime(challenge.check_in_time)}</Text>
        </View>
        <View style={styles.detailItem}>
          <Ionicons name="location-outline" size={20} color="#5858E8" style={styles.icon} />
          <Text style={styles.detailText}>{challenge.location || 'Any location'}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Description</Text>
        <Text style={styles.descriptionText}>
          {showFullDescription 
            ? challenge.description 
            : `${challenge.description.substring(0, 100)}...`
          }
        </Text>
        {challenge.description.length > 100 && (
          <TouchableOpacity onPress={() => setShowFullDescription(!showFullDescription)}>
            <Text style={styles.readMore}>
              {showFullDescription ? 'Show Less' : 'Read More'}
            </Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Participants</Text>
        {loading ? (
          <ActivityIndicator size="small" color="#5858E8" />
        ) : (
          <View style={styles.participantsContainer}>
            {participants.slice(0, 5).map((user) => (
              <Image
                key={user.id}
                source={{ uri: formatImageUrl(user.avatar_url, 'avatar', user.username) }}
                style={styles.avatar}
              />
            ))}
            {participants.length > 5 && (
              <View style={styles.avatarMore}>
                <Text style={styles.avatarMoreText}>+{participants.length - 5}</Text>
              </View>
            )}
            {participants.length === 0 && <Text style={styles.detailText}>No one has joined yet.</Text>}
          </View>
        )}
      </View>

      {challenge.restriction && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Rules & Restrictions</Text>
          <Text style={styles.detailText}>{challenge.restriction}</Text>
        </View>
      )}

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Challenge Details</Text>
        <View style={styles.grid}>
          <TouchableOpacity style={styles.gridItem} onPress={() => handleIconPress('repetition')}>
            <Ionicons name="repeat-outline" size={24} color="#5858E8" />
            <Text style={styles.gridLabel}>Repetition</Text>
            <Text style={styles.gridValue}>
              {challenge.repetition === 'once' ? 'Once' : `${challenge.repetition_frequency || 1}x ${challenge.repetition}`}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.gridItem} onPress={() => handleIconPress('time_window')}>
            <Ionicons name="hourglass-outline" size={24} color="#5858E8" />
            <Text style={styles.gridLabel}>Time Window</Text>
            <Text style={styles.gridValue}>
              {challenge.time_window ? `${Math.floor(challenge.time_window / 60)} min` : 'None'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.gridItem} onPress={() => handleIconPress('visibility')}>
            <Ionicons name={challenge.is_private ? "lock-closed-outline" : "lock-open-outline"} size={24} color="#5858E8" />
            <Text style={styles.gridLabel}>Visibility</Text>
            <Text style={styles.gridValue}>{challenge.is_private ? 'Private' : 'Public'}</Text>
          </TouchableOpacity>
        </View>
      </View>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },
  contentContainer: {
    padding: 20,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1A1A1A',
    textAlign: 'center',
  },
  section: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  icon: {
    marginRight: 12,
  },
  detailText: {
    fontSize: 16,
    color: '#555',
  },
  descriptionText: {
    fontSize: 16,
    color: '#555',
    lineHeight: 24,
  },
  readMore: {
    color: '#5858E8',
    fontWeight: '600',
    marginTop: 8,
  },
  participantsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: -10,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  avatarMore: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E9E9E9',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  avatarMoreText: {
    color: '#555',
    fontWeight: 'bold',
    fontSize: 14,
  },
  grid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 8,
  },
  gridItem: {
    alignItems: 'center',
    width: '30%',
  },
  gridLabel: {
    fontSize: 14,
    color: '#777',
    marginTop: 6,
    textAlign: 'center',
  },
  gridValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginTop: 2,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: '#777',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 20,
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 24,
  },
  buttonClose: {
    backgroundColor: '#5858E8',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    elevation: 2,
  },
  buttonCloseText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default DetailsScreen;