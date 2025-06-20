import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ImageSourcePropType,
  ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { PlayerAvatar } from '../../interfaces/challenge';

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

export interface ChallengeCardProps {
  title?: string;
  description?: string;
  backgroundImage?: string[] ;
  playerAvatars?: PlayerAvatar[]; // This will be deprecated in favor of real data
  playerCount?: number; // This will be deprecated in favor of real data
  challengeId?: string; // Add challenge ID to fetch participants
  onPress?: () => void;
  onPressCamera?: () => void;
}

const ChallengeCard: React.FC<ChallengeCardProps> = ({
  title = 'Challenge',
  description = 'Test your focus and see how many strokes it takes to sink the ball!',
  backgroundImage = ["challenges", "default_challenge_bg.jpg"],
  playerAvatars = [], // Fallback for backward compatibility
  playerCount = 0, // Fallback for backward compatibility
  challengeId,
  onPress = () => {},
  onPressCamera,
}) => {
  const [participants, setParticipants] = useState<User[]>([]);
  const [totalParticipants, setTotalParticipants] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (challengeId) {
      fetchParticipants();
    }
  }, [challengeId]);

  const formatImageUrl = (urlParts: string[] | null, defaultType: 'avatar' | 'background' = 'background', username?: string) => {
    if (urlParts && urlParts.length === 2) {
      const [bucketName, fileName] = urlParts;
      if (bucketName && fileName) {
        return `https://vnxbcytjkzpmcdjkmkba.supabase.co/storage/v1/object/public/${bucketName}//${fileName}`;
      }
    }
    if (defaultType === 'avatar' && username) {
      return `https://ui-avatars.com/api/?name=${username}&background=random`;
    }
    return 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?q=80&w=2070'; // Generic placeholder
  };

  const fetchParticipants = async () => {
    if (!challengeId) return;
    
    setLoading(true);
    try {
      const participantsResponse = await fetch(
        `https://wimi-app-backend-999646107030.us-east5.run.app/api/v0/challenges/${challengeId}/participants`
      );
      const participantsData: Participant[] = await participantsResponse.json();
      setTotalParticipants(participantsData.length);

      const userPromises = participantsData.slice(0, 4).map(async (participant) => {
        const userResponse = await fetch(
          `https://wimi-app-backend-999646107030.us-east5.run.app/api/v0/users/${participant.user_id}`
        );
        return userResponse.json();
      });

      const usersData: User[] = await Promise.all(userPromises);
      setParticipants(usersData);
    } catch (error) {
      console.error('Failed to fetch participants for card:', error);
      setParticipants([]);
      setTotalParticipants(playerCount);
    } finally {
      setLoading(false);
    }
  };

  const displayedParticipants = participants.slice(0, 4);
  const currentPlayerCount = totalParticipants;
  const remainingPlayers = Math.max(0, currentPlayerCount - displayedParticipants.length);

  const finalBackgroundImageSource: ImageSourcePropType = {
    uri: backgroundImage[0],
  };

  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.9} onPress={onPress}>
      <Image
        source={finalBackgroundImageSource}
        style={styles.backgroundImage}
      />

      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.4)', 'rgba(51, 51, 51, 0.8)']}
        locations={[0.3, 0.6, 1]}
        style={styles.gradient}
      />

      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{description}</Text>
      </View>

      <View style={styles.bottomContainer}>
        <View style={styles.avatarsContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {loading ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <>
                {displayedParticipants.map((user, index) => (
                  <View
                    key={user.id}
                    style={[
                      styles.avatarWrapper,
                      { marginLeft: index > 0 ? -10 : 0 },
                    ]}
                  >
                    <Image 
                      source={{ uri: formatImageUrl(user.avatar_url, 'avatar', user.username) }} 
                      style={styles.avatar} 
                    />
                  </View>
                ))}
                {remainingPlayers > 0 && (
                  <View style={[styles.avatarWrapper, styles.avatarCount, { marginLeft: displayedParticipants.length > 0 ? -10 : 0 }]}>
                    <Text style={styles.avatarCountText}>+{remainingPlayers}</Text>
                  </View>
                )}
              </>
            )}
          </ScrollView>
          <Text style={styles.playersText}>
            {currentPlayerCount} player{currentPlayerCount !== 1 ? 's' : ''} Here
          </Text>
        </View>

        <TouchableOpacity style={styles.cameraButton} onPress={onPressCamera} activeOpacity={0.7}>
          <Ionicons name="camera-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 250,
    height: 350,
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 5,
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '70%',
  },
  textContainer: {
    position: 'absolute',
    bottom: 75,
    left: 20,
    right: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: 'white',
    opacity: 0.8,
    lineHeight: 18,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  avatarsContainer: {
    flexDirection: 'column',
  },
  avatarWrapper: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: 'white',
    overflow: 'hidden',
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  avatarCount: {
    backgroundColor: '#888',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarCountText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  playersText: {
    color: 'white',
    fontSize: 10,
    marginTop: 5,
    opacity: 0.9,
  },
  cameraButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 165, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },
});

export default ChallengeCard;
