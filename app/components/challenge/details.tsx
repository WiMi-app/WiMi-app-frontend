import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator
} from 'react-native';

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
      const userPromises = participantsData.slice(0, 3).map(async (participant) => {
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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  if (!challenge) {
    return (
      <View style={styles.emptyState}>
        <Text style={styles.emptyText}>Select a challenge to view details</Text>
      </View>
    );
  }

  return (
    <>
      <View style={styles.eventHeader}>
        <Text style={styles.eventTitle}>{challenge.title}</Text>
        
        {challenge.location && (
          <View style={styles.locationContainer}>
            <Text style={styles.locationIcon}>📍</Text>
            <Text style={styles.locationText}>{challenge.location}</Text>
          </View>
        )}
        
        <View style={styles.dateContainer}>
          <Text style={styles.dateIcon}>📅</Text>
          <Text style={styles.dateText}>{formatDate(challenge.due_date)}</Text>
        </View>
        
        {challenge.check_in_time && (
          <View style={styles.dateContainer}>
            <Text style={styles.dateIcon}>⏰</Text>
            <Text style={styles.dateText}>Check-in at {challenge.check_in_time}</Text>
          </View>
        )}
        
        <View style={styles.participantsContainer}>
          <View style={styles.avatarsContainer}>
            {loading ? (
              <ActivityIndicator size="small" color="#666" />
            ) : (
              participants.map((user, index) => (
                <Image 
                  key={user.id}
                  source={{ 
                    uri: formatImageUrl(user.avatar_url, 'avatar', user.username)
                  }} 
                  style={[styles.avatar, { zIndex: 3 - index, marginLeft: index > 0 ? -10 : 0 }]} 
                />
              ))
            )}
          </View>
          <Text style={styles.participantsText}>
            {participants.length > 0 
              ? `${participants.map(p => p.username).join(', ')} ${participants.length > 1 ? 'have' : 'has'} joined`
              : 'No participants yet'
            }
          </Text>
        </View>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Description</Text>
        <Text style={styles.descriptionText}>
          {showFullDescription 
            ? challenge.description 
            : challenge.description.length > 150 
              ? `${challenge.description.substring(0, 150)}...`
              : challenge.description
          }
        </Text>
        {challenge.description.length > 150 && (
          <TouchableOpacity onPress={() => setShowFullDescription(!showFullDescription)}>
            <Text style={styles.readMoreText}>
              {showFullDescription ? 'Show Less' : 'Read More..'}
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {challenge.restriction && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Rules & Restrictions</Text>
          <Text style={styles.descriptionText}>{challenge.restriction}</Text>
        </View>
      )}

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Challenge Details</Text>
        <View style={styles.iconDetailsContainer}>
          {/* Repetition Icon */}
          <View style={styles.iconDetail}>
            <Text style={styles.icon}>🔄</Text>
            <Text style={styles.iconLabel}>
              {challenge.repetition_frequency && challenge.repetition_frequency > 1 
                ? `${challenge.repetition_frequency}x ${challenge.repetition}`
                : challenge.repetition === 'daily' 
                  ? 'Daily'
                  : challenge.repetition === 'weekly'
                    ? 'Weekly'
                    : challenge.repetition === 'once'
                      ? 'Once'
                      : challenge.repetition
              }
            </Text>
          </View>

          {/* Timer Icon */}
          <View style={styles.iconDetail}>
            <Text style={styles.icon}>⏱️</Text>
            <Text style={styles.iconLabel}>
              {challenge.time_window 
                ? `${Math.floor(challenge.time_window / 60)} min`
                : 'No limit'
              }
            </Text>
          </View>

          {/* Lock Icon */}
          <View style={styles.iconDetail}>
            <Text style={styles.icon}>{challenge.is_private ? '🔒' : '🔓'}</Text>
            <Text style={styles.iconLabel}>
              {challenge.is_private ? 'Private' : 'Public'}
            </Text>
          </View>
        </View>
      </View>
      
      {challenge.location && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Location</Text>
          {challenge.location.toLowerCase() === 'home' ? (
            // Show simple text for "Home"
            <Text style={styles.homeLocationText}>🏠 Home</Text>
          ) : (
            // Show map container for actual locations
            <View style={styles.mapContainer}>
              <View style={styles.mapPlaceholder}>
                <Text style={styles.mapPlaceholderText}>📍 {challenge.location}</Text>
              </View>
            </View>
          )}
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  tabContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    backgroundColor: '#fff',
  },
  tab: {
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
    position: 'relative',
  },
  activeTab: {
    borderBottomColor: '#000',
  },
  tabText: {
    fontSize: 16,
    color: '#ccc',
    fontWeight: '500',
  },
  activeTabText: {
    color: '#000',
    fontWeight: '600',
  },
  activeTabIndicator: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: '#000',
  },
  content: {
    flex: 1,
  },
  eventHeader: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  eventTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  locationIcon: {
    marginRight: 8,
    fontSize: 16,
  },
  locationText: {
    fontSize: 14,
    color: '#666',
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  dateIcon: {
    marginRight: 8,
    fontSize: 16,
  },
  dateText: {
    fontSize: 14,
    color: '#666',
  },
  participantsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  avatarsContainer: {
    flexDirection: 'row',
    marginRight: 8,
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#fff',
  },
  participantsText: {
    fontSize: 14,
    color: '#333',
  },
  section: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  descriptionText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  readMoreText: {
    color: '#3498db',
    marginTop: 8,
    fontSize: 14,
  },
  mapContainer: {
    height: 250,
    borderRadius: 8,
    overflow: 'hidden',
    marginTop: 8,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  emptyTabContent: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    height: 300,
  },
  emptyTabText: {
    fontSize: 16,
    color: '#999',
  },
  divider: {
    borderStyle: "solid",
    borderColor: "#e5e7eb",
    borderTopWidth: 1,
    height: 1,
    alignSelf: "stretch",
  },
  emptyState: {
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
  },
  iconDetailsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
  iconDetail: {
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 12,
    minWidth: 80,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  icon: {
    fontSize: 20,
    marginBottom: 4,
  },
  iconLabel: {
    fontSize: 14,
    color: '#666',
  },
  mapPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
  },
  mapPlaceholderText: {
    fontSize: 16,
    color: '#666',
  },
  homeLocationText: {
    fontSize: 16,
    color: '#666',
  },
});

export default DetailsScreen;