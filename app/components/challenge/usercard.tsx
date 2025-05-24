import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, SafeAreaView, ImageSourcePropType} from 'react-native';

type UserCard = {
 user: {
    id: number;
    name: string;
    points: number;
    avatar: ImageSourcePropType;
    flag: string;
  };
}


const BoardCard = ({user} : UserCard) => {
  
  return ( 
          <View key={user.id} style={styles.leaderboardItem}>
            <View style={styles.rankContainer}>
              <Text style={styles.rankText}>{user.id}</Text>
            </View>
            <Image source={user.avatar } style={styles.userAvatar} />
            <View style={styles.userInfo}>
              <Text style={styles.userName}>{user.name}</Text>
              <Text style={styles.userPoints}>{user.points} points</Text>
            </View>
            {user.flag && <Text style={styles.flagIcon}>{user.flag}</Text>}
          </View>
  );
};

const styles = StyleSheet.create({
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
});

export default BoardCard;