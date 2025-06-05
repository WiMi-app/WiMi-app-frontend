import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Plus } from 'react-native-feather';
import { useNavigation } from "@react-navigation/native"
import { HeaderProps } from '../../interfaces/challenge';

const { width, height } = Dimensions.get('window');

const Header: React.FC<HeaderProps> = ({title, onNotificationPress }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}> {title}</Text>

        <View style={styles.subcontainer}>
          <TouchableOpacity 
            style={styles.iconContainer} 
            onPress={()=>{navigation.navigate('(createchallenge)' as never)}}
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
    paddingLeft: width * 0.05, // Dynamic left padding (5% of screen width, much smaller)
    paddingRight: width * 0.12, // Dynamic right padding (12% of screen width)
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
