import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Dimensions
} from 'react-native';

// Define the Challenge interface (should match the one in ChallengeView/ChallengeScreen)
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

interface DetailsScreenProps {
  challenge: Challenge | null;
}

const { width } = Dimensions.get('window');

const DetailsScreen: React.FC<DetailsScreenProps> = ({ challenge }) => {
  if (!challenge) {
    return (
      <View style={styles.container}>
        <Text style={styles.emptyText}>Select a challenge to see its details.</Text>
      </View>
    );
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    try {
      return new Date(dateString).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch (e) {
      return dateString; 
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Removed background_photo Image component */}
      
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{challenge.title}</Text>
        
        <Text style={styles.sectionTitle}>Description</Text>
        <Text style={styles.descriptionText}>{challenge.description || 'No description provided.'}</Text>

        <Text style={styles.sectionTitle}>Details</Text>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Due Date:</Text>
          <Text style={styles.detailValue}>{formatDate(challenge.due_date)}</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Location:</Text>
          <Text style={styles.detailValue}>{challenge.location || 'Not specified'}</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Repetition:</Text>
          <Text style={styles.detailValue}>
            {challenge.repetition}
            {challenge.repetition_frequency ? ` (Frequency: ${challenge.repetition_frequency})` : ''}
            {challenge.repetition_days && challenge.repetition_days.length > 0 ? ` on ${challenge.repetition_days.join(', ')}` : ''}
          </Text>
        </View>
        {challenge.check_in_time && (
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Check-in Time:</Text>
            <Text style={styles.detailValue}>{challenge.check_in_time}</Text>
          </View>
        )}
        {challenge.time_window !== null && challenge.time_window !== undefined && (
           <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Time Window:</Text>
            <Text style={styles.detailValue}>{challenge.time_window / 60} minutes</Text>
          </View>
        )}
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Privacy:</Text>
          <Text style={styles.detailValue}>{challenge.is_private ? 'Private' : 'Public'}</Text>
        </View>
        {/* Removed ID, Creator ID, Created At, Updated At for brevity, can be added back if needed
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Challenge ID:</Text>
          <Text style={styles.detailValue}>{challenge.id}</Text>
        </View>
         <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Creator ID:</Text>
          <Text style={styles.detailValue}>{challenge.creator_id}</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Created At:</Text>
          <Text style={styles.detailValue}>{formatDate(challenge.created_at)}</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Last Updated:</Text>
          <Text style={styles.detailValue}>{formatDate(challenge.updated_at)}</Text>
        </View>
        */}
        {challenge.restriction && (
            <View style={styles.restrictionSection}>
                <Text style={styles.sectionTitle}>Restrictions</Text>
                <Text style={styles.descriptionText}>{challenge.restriction}</Text>
            </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  contentContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 24,
    marginBottom: 12,
    color: '#444',
    paddingBottom: 5,
  },
  descriptionText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#555',
    marginBottom: 10,
  },
  detailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  detailLabel: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
    marginRight: 10,
  },
  detailValue: {
    fontSize: 16,
    color: '#555',
    textAlign: 'right',
    flexShrink: 1,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 18,
    color: '#777',
  },
  restrictionSection: {
    marginTop: 10,
  }
});

export default DetailsScreen;