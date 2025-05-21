import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Bell } from 'react-native-feather';

interface HeaderProps {
    title? : String,
    onNotificationPress?: () => void;
}

const { width, height } = Dimensions.get('window');

const Header: React.FC<HeaderProps> = ({title, onNotificationPress }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}> {title}</Text>
      <TouchableOpacity 
        style={styles.iconContainer} 
        onPress={onNotificationPress}
        activeOpacity={0.7}
      >
        <Bell width={20} height={20} color="#f2f2f2" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between', // <-- push items to edges
    alignItems: 'center',            // <-- vertically center them
    paddingHorizontal: 50,
    paddingVertical: 12,    
    marginBottom: (-0.54*height)+width         // optional: add vertical padding
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Header;
