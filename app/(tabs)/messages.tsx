import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  TouchableOpacity, 
  TextInput, 
  FlatList, 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import renderMessageItem from '../components/notifications/notifcard';

// Sample data
const messages = [
  {
    id: '1',
    name: 'Darrell Steward',
    username: 'darrtel_number1',
    time: '11:03 AM',
    notificationCount: 9,
    avatar: 'https://i.pravatar.cc/100?img=1',
  },
  {
    id: '2',
    name: 'Theresa Webb',
    username: 'theresa_webb',
    time: '11:03 AM',
    notificationCount: 2,
    avatar: 'https://i.pravatar.cc/100?img=2',
  },
  {
    id: '3',
    name: 'Arlene McCoy',
    username: 'arlene_MC',
    time: '11:03 AM',
    notificationCount: 2,
    avatar: 'https://i.pravatar.cc/100?img=3',
  },
  {
    id: '4',
    name: 'Darlene Robertson',
    username: 'robertson123',
    time: '11:03 AM',
    notificationCount: 2,
    avatar: 'https://i.pravatar.cc/100?img=4',
  },
  {
    id: '5',
    name: 'Kristin Watson',
    username: 'kristin_watson',
    time: '11:03 AM',
    notificationCount: 2,
    avatar: 'https://i.pravatar.cc/100?img=5',
  },
  {
    id: '6',
    name: 'Jacob Jones',
    username: 'jacob_jones',
    time: '11:03 AM',
    notificationCount: 2,
    avatar: 'https://i.pravatar.cc/100?img=6',
  },
  {
    id: '7',
    name: 'Guy Hawkins',
    username: 'hawkins',
    time: '11:03 AM',
    notificationCount: 2,
    avatar: 'https://i.pravatar.cc/100?img=7',
  },
  {
    id: '8',
    name: 'Albert Flores',
    username: 'albert_flores',
    time: '11:03 AM',
    notificationCount: 0,
    avatar: 'https://i.pravatar.cc/100?img=8',
  },
];

const InboxScreen = () => {
  const [activeTab, setActiveTab] = React.useState('Notifications');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Inbox</Text>
      </View>

      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'Notifications' && styles.activeTab]}
          onPress={() => setActiveTab('Notifications')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'Notifications' && styles.activeTabText,
            ]}
          >
            Notifications
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'Invites' && styles.activeTab]}
          onPress={() => setActiveTab('Invites')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'Invites' && styles.activeTabText,
            ]}
          >
            Invites
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search here..."
            placeholderTextColor="#999"
          />
          <TouchableOpacity style={styles.filterButton}>
            <Ionicons name="options-outline" size={20} color="#333" />
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={messages}
        renderItem={renderMessageItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.messagesList}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    borderBottomWidth: 2,
    borderBottomColor: '#333'
  },
  messageIcon: {
    padding: 4,
  },
  purpleBox: {
    backgroundColor: '#8B5CF6',
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  tab: {
    marginRight: 24,
    paddingBottom: 8,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#8B5CF6',
  },
  tabText: {
    fontSize: 16,
    color: '#999',
  },
  activeTabText: {
    color: '#8B5CF6',
    fontWeight: '500',
  },
  searchContainer: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 30,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#333',
  },
  filterButton: {
    padding: 4,
  },
  messagesList: {
    paddingHorizontal: 16,
  },
  messageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#F0F0F0',
  },
  messageContent: {
    flex: 1,
    marginLeft: 12,
  },
  messageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  time: {
    fontSize: 12,
    color: '#999',
  },
  username: {
    fontSize: 14,
    color: '#999',
  },
  badge: {
    backgroundColor: '#8B5CF6',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
});

export default InboxScreen;