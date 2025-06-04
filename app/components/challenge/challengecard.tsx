import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ImageSourcePropType,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import LeaderboardScreen from './leaderboard';
import { PlayerAvatar } from '../../interfaces/challenge';

export interface ChallengeCardProps {
export interface ChallengeCardProps {
  title?: string;
  description?: string;
  backgroundImage?: string | ImageSourcePropType;
  playerAvatars?: PlayerAvatar[];
  playerCount?: number;
  onPress?: () => void;
  onPressCamera?: () => void;
}

const ChallengeCard: React.FC<ChallengeCardProps> = ({
  title = 'Challenge',
  description = 'Test your focus and see how many strokes it takes to sink the ball!',
  backgroundImage = 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?q=80&w=2070',
  playerAvatars = [],
  playerCount = 0,
  onPress = () => {},
  onPressCamera,
}) => {
  const displayedAvatars = playerAvatars.slice(0, 4);
  const remainingPlayers = Math.max(0, playerCount - displayedAvatars.length);

  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.9} onPress={onPress}>
      <Image
        source={
          typeof backgroundImage === 'string'
            ? { uri: backgroundImage }
            : backgroundImage
        }
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
            {displayedAvatars.map((avatar, index) => (
              <View
                key={avatar.id}
                style={[
                  styles.avatarWrapper,
                  { marginLeft: index > 0 ? -10 : 0 },
                ]}
              >
                <Image source={avatar.image} style={styles.avatar} />
              </View>
            ))}
            {remainingPlayers > 0 && (
              <View style={[styles.avatarWrapper, styles.avatarCount]}>
                <Text style={styles.avatarCountText}>+{remainingPlayers}</Text>
              </View>
            )}
          </ScrollView>
          <Text style={styles.playersText}>{playerCount} players Here</Text>
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
