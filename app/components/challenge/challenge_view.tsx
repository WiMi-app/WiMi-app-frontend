import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView
} from 'react-native';
import Post from "../index_home/post"
import LeaderboardScreen from './leaderboard';
import DetailsScreen from './details';
//import MapView, { Marker } from 'react-native-maps';
import { UserPostData } from '../../interfaces/post';

const TABS = ['Detail', 'Post', 'Ranking'];

// Define the Challenge interface (should be consistent with API response and parent component)
interface Challenge {
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
  background_photo: string;
  id: string;
  creator_id: string;
  created_at: string;
  updated_at: string;
}

interface ChallengeViewProps {
  allChallenges: Challenge[];
  selectedChallengeFromScreen: Challenge | null;
}

const ChallengeView: React.FC<ChallengeViewProps> = ({ 
  allChallenges, 
  selectedChallengeFromScreen 
}) => {
  const [activeTab, setActiveTab] = useState('Detail');
  const [currentChallengeDetail, setCurrentChallengeDetail] = useState<Challenge | null>(null);

  useEffect(() => {
    // When the selected challenge from the parent screen (carousel) changes
    setCurrentChallengeDetail(selectedChallengeFromScreen);
    // If a challenge is selected from parent, and we are not on Detail tab, switch to Detail tab
    if (selectedChallengeFromScreen && activeTab !== 'Detail') {
      setActiveTab('Detail');
    }
    // If no challenge is selected from parent (e.g., initial load before carousel interaction)
    // and we have challenges, and current tab is Detail, set first challenge as default for Detail tab.
    else if (!selectedChallengeFromScreen && activeTab === 'Detail' && allChallenges && allChallenges.length > 0) {
      setCurrentChallengeDetail(allChallenges[0]);
    }
  }, [selectedChallengeFromScreen, allChallenges]); // Removed activeTab from deps to avoid loop on setActiveTab

  useEffect(() => {
    // When the active tab changes, ensure the Detail tab has the correct content.
    if (activeTab === 'Detail') {
      if (selectedChallengeFromScreen) {
        setCurrentChallengeDetail(selectedChallengeFromScreen);
      } else if (allChallenges && allChallenges.length > 0) {
        setCurrentChallengeDetail(allChallenges[0]); // Default to first if no specific selection
      } else {
        setCurrentChallengeDetail(null); // No challenges to show
      }
    }
  }, [activeTab, selectedChallengeFromScreen, allChallenges]);

  const handleTabPress = (tab: string) => {
    setActiveTab(tab);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Detail':
        return <DetailsScreen challenge={currentChallengeDetail} />;
      case 'Post':
        return (
          <SafeAreaView style={styles.emptyTabContent}>
            <Text style={styles.emptyTabText}>
              No posts available for this challenge yet.
            </Text>
          </SafeAreaView>
        );
      case 'Ranking':
        return <LeaderboardScreen />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        {TABS.map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[
              styles.tab,
              activeTab === tab && styles.activeTab,
            ]}
            onPress={() => handleTabPress(tab)}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab && styles.activeTabText,
              ]}
            >
              {tab}
            </Text>
            {activeTab === tab && <View style={styles.activeTabIndicator} />}
          </TouchableOpacity>
        ))}
      </View>

      {/* Scrollable Content */}
      <ScrollView style={styles.content}>
        {renderTabContent()}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  tabContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  tab: {
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
    position: 'relative',
  },
  activeTab: {
  },
  tabText: {
    fontSize: 16,
    color: '#999',
    fontWeight: '500',
  },
  activeTabText: {
    color: '#333',
    fontWeight: '600',
  },
  activeTabIndicator: {
    position: 'absolute',
    bottom: -1,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: '#333',
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyTabText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  divider: {
    borderStyle: "solid",
    borderColor: "#e5e7eb",
    borderTopWidth: 1,
    height: 1,
    alignSelf: "stretch",
  },
});

export default ChallengeView;