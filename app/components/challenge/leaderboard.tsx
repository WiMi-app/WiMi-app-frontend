import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import BoardCard from './usercard';

const LeaderboardScreen = () => {
  const [timeFilter, setTimeFilter] = useState('weekly'); // 'weekly' or 'allTime'
  
  const leaderboardData = [
    { id: 1, name: 'Madelyn D', points: 590, avatar: require('../../../assets/test/profile.png'), flag: '🇳🇴' },
    { id: 2, name: 'ZV', points: 448, avatar: require('../../../assets/test/profile.png') ,flag: '🇳🇴'},
    { id: 3, name: 'Sarah', points: 448, avatar: require('../../../assets/test/profile.png'), flag: '🇳🇴'},
    { id: 4, name: 'Daniel', points: 448, avatar: require('../../../assets/test/profile.png'), flag: '🇳🇴' },
  ];

  // Get top 3 for podium
  const podiumUsers = leaderboardData.slice(0, 3);
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[styles.filterButton, timeFilter === 'weekly' && styles.activeFilter]}
          onPress={() => setTimeFilter('weekly')}
        >
          <Text style={[styles.filterText, timeFilter === 'weekly' && styles.activeFilterText]}>Weekly</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, timeFilter === 'allTime' && styles.activeFilter]}
          onPress={() => setTimeFilter('allTime')}
        >
          <Text style={[styles.filterText, timeFilter === 'allTime' && styles.activeFilterText]}>All Time</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.notificationBanner}>
        <Text style={styles.notificationNumber}>#4</Text>
        <Text style={styles.notificationText}>You are doing better than 60% of other players!</Text>
      </View>
      

      <View style={styles.podiumContainer}>
        {/* Second Place */}
        <View style={styles.podiumItemContainer}>
          <View style={styles.xpChip}>
            <Text style={styles.xpText}>{podiumUsers[1]?.points} Points</Text>
          </View>
          <Image source={podiumUsers[1]?.avatar } style={styles.podiumAvatar} />
          <View style={[styles.podiumPillar, styles.secondPlace]}>
            <Text style={styles.podiumNumber}>2</Text>
          </View>
        </View>
        {/* First Place */}
        <View style={styles.podiumItemContainer}>
          <View style={styles.xpChip}>
            <Text style={styles.xpText}>{podiumUsers[0]?.points} Points</Text>
          </View>
          <Image source={podiumUsers[0]?.avatar} style={styles.podiumAvatar} />
          <View style={[styles.podiumPillar, styles.firstPlace]}>
            <Text style={styles.podiumNumber}>1</Text>
          </View>
        </View>
        {/* Third Place */}
        <View style={styles.podiumItemContainer}>
          <View style={styles.xpChip}>
            <Text style={styles.xpText}>{podiumUsers[2]?.points} Points</Text>
          </View>
          <Image source={podiumUsers[2]?.avatar} style={styles.podiumAvatar} />
          <View style={[styles.podiumPillar, styles.thirdPlace]}>
            <Text style={styles.podiumNumber}>3</Text>
          </View>
        </View>
      </View>
      
      <ScrollView style={styles.leaderboardList}>
        {leaderboardData.map((user_) => (
            <BoardCard user={user_} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 10,
    backgroundColor: '#f5f5f5',
  },
  filterButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    marginHorizontal: 5,
  },
  activeFilter: {
    backgroundColor: '#333',
  },
  filterText: {
    color: '#666',
    fontWeight: '500',
  },
  activeFilterText: {
    color: '#fff',
  },
  notificationBanner: {
    backgroundColor: '#FFA07A',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 15,
    marginTop: 10,
  },
  notificationNumber: {
    fontWeight: 'bold',
    color: '#fff',
    marginRight: 10,
    fontSize: 16,
  },
  notificationText: {
    color: '#fff',
    fontWeight: '500',
    flex: 1,
  },
  timeContainer: {
    alignItems: 'center',
    marginTop: 15,
  },
  crownContainer: {
    alignItems: 'center',
  },
  crownAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#FFD700',
  },
  timeChip: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    position: 'absolute',
    right: -30,
    top: 0,
  },
  timeText: {
    fontSize: 12,
    color: '#666',
  },
  podiumContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginTop: 20,
    paddingBottom: 20,
  },
  podiumItemContainer: {
    alignItems: 'center',
    marginHorizontal: 5,
  },
  podiumAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginBottom: 5,
    zIndex: 1,
  },
  podiumPillar: {
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  firstPlace: {
    backgroundColor: '#f9ad0e',
    height: 80,
  },
  secondPlace: {
    backgroundColor: '#d1d7da',
    height: 60,
  },
  thirdPlace: {
    backgroundColor: '#df7e08',
    height: 40,
  },
  podiumNumber: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 24,
  },
  xpChip: {
    backgroundColor: '#a29bfe',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 15,
    marginBottom: 5,
  },
  xpText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },
  leaderboardList: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 10,
  },
  leaderboardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  rankContainer: {
    width: 25,
    alignItems: 'center',
  },
  rankText: {
    fontWeight: '500',
    color: '#666',
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginHorizontal: 10,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontWeight: '600',
    fontSize: 16,
  },
  userPoints: {
    color: '#666',
    fontSize: 14,
  },
  flagIcon: {
    fontSize: 16,
    marginRight: 10,
  },
  challengeButton: {
    backgroundColor: '#a29bfe',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  challengeButtonText: {
    color: '#fff',
    fontWeight: '500',
    fontSize: 12,
  },
});

export default LeaderboardScreen;