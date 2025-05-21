import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
//import MapView, { Marker } from 'react-native-maps';

const TABS = ['Detail', 'Post', 'Ranking'];

const DetailsScreen = () => {
  const [activeTab, setActiveTab] = useState('Detail');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Detail':
        return (
          <>
            <View style={styles.eventHeader}>
              <Text style={styles.eventTitle}>Golf Challenge</Text>
              <View style={styles.locationContainer}>
                <Text style={styles.locationIcon}>📍</Text>
                <Text style={styles.locationText}>349 Lakefair Drive, San Francisco</Text>
              </View>
              <View style={styles.dateContainer}>
                <Text style={styles.dateIcon}>📅</Text>
                <Text style={styles.dateText}>May 2, 2025</Text>
              </View>
              
              <View style={styles.participantsContainer}>
                <View style={styles.avatarsContainer}>
                  <Image 
                    source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg' }} 
                    style={[styles.avatar, { zIndex: 3 }]} 
                  />
                  <Image 
                    source={{ uri: 'https://randomuser.me/api/portraits/women/44.jpg' }} 
                    style={[styles.avatar, { marginLeft: -10, zIndex: 2 }]} 
                  />
                  <Image 
                    source={{ uri: 'https://randomuser.me/api/portraits/men/68.jpg' }} 
                    style={[styles.avatar, { marginLeft: -10, zIndex: 1 }]} 
                  />
                </View>
                <Text style={styles.participantsText}>Mike, Sarah, and Josh joined</Text>
              </View>
            </View>
            
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Description</Text>
              <Text style={styles.descriptionText}>
                Integer id augue iaculis, iaculis orci ut, blandit quam. Donec in elit auctor, finibus quam in, phar. Proin id ligula dictum, covalis enim ut, facilisis massa. Mauris a nisi ut sapien blandit imperdi. Interdum et malesuada fames ac ante ipsum primis in faucibus. Sed posuere egestas nunc ut tempus. Fu ipsum dolor sit amet.
              </Text>
              <TouchableOpacity>
                <Text style={styles.readMoreText}>Read More..</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Location</Text>
              <View style={styles.mapContainer}>
                {/*
                <MapView
                  style={styles.map}
                  initialRegion={{
                    latitude: 37.7749,
                    longitude: -122.4194,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                  }}
                >
                  <Marker
                    coordinate={{ latitude: 37.7749, longitude: -122.4194 }}
                    title="Golf Challenge"
                    description="349 Lakefair Drive, San Francisco"
                  />
                </MapView>
                */}
              </View>
            </View>
          </>
        );
      case 'Post':
        return (
          <View style={styles.emptyTabContent}>
            <Text style={styles.emptyTabText}>Post content goes here</Text>
          </View>
        );
      case 'Ranking':
        return (
          <View style={styles.emptyTabContent}>
            <Text style={styles.emptyTabText}>Ranking content goes here</Text>
          </View>
        );
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
            onPress={() => setActiveTab(tab)}
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
});

export default DetailsScreen;