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
import LeaderboardScreen from './leaderboard';

export interface PlayerAvatar {
  id: string;
  image: ImageSourcePropType;
}

export interface GolfChallengeCardProps {
  title?: string;
  description?: string;
  backgroundImage?: string | ImageSourcePropType;
  playerAvatars?: PlayerAvatar[];
  playerCount?: number;
  onPress?: () => void;
}

const GolfChallengeCard: React.FC<GolfChallengeCardProps> = ({
  title = 'Challenge',
  description = 'Test your focus and see how many strokes it takes to sink the ball!',
  backgroundImage = 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?q=80&w=2070',
  playerAvatars = [],
  playerCount = 0,
  onPress = () => {},
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
        colors={['transparent', 'rgba(0,0,0,0.3)', 'rgba(0,0,0,0.7)']}
        locations={[0.5, 0.75, 1]}
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

        <TouchableOpacity style={styles.arrowButton}>
          <Text style={styles.arrowIcon}>→</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 300,
    height: 400,
    borderRadius: 30,
    overflow: 'hidden',
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
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
    bottom: 80,
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
    opacity: 0.9,
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
  },
  arrowButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#0000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrowIcon: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default GolfChallengeCard;
