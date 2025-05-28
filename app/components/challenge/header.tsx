import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Camera, Plus } from 'react-native-feather';
import { useNavigation } from "@react-navigation/native"

interface HeaderProps {
    title? : String,
    onNotificationPress?: () => void;
}

const { width, height } = Dimensions.get('window');

const Header: React.FC<HeaderProps> = ({title, onNotificationPress }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}> {title}</Text>

        <View style={styles.subcontainer}>
          <TouchableOpacity 
            style={styles.iconContainer} 
            onPress={()=>{navigation.navigate('(camera)')}}
            activeOpacity={0.7}
          >
          <Camera width={20} height={20} color="#f2f2f2" />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.iconContainer} 
            onPress={onNotificationPress}
            activeOpacity={0.7}
          >
            <Plus width={20} height={20} color="#f2f2f2" />
          </TouchableOpacity>
      </View>
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
  subcontainer: {
    flexDirection: 'row',
    justifyContent: 'space-between', // <-- push items to edges
    alignItems: 'center',            // <-- vertically center them
    gap: 6
       // optional: add vertical padding
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
