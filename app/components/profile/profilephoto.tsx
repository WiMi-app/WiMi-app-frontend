import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  ImageSourcePropType,
} from 'react-native';

interface Photo {
  photo?: ImageSourcePropType | string;
  Status?: number;
  width?: number;
  height?: number;
}

const ProfilePhoto: React.FC<Photo> = ({
  photo = "https://via.placeholder.com/150",
  Status = 0,
  size = 50,
}) => {
  const getBorderColor = () => {
    switch (Status) {
      case 1:
        return "#6C5CE7"; // Purple
      case 2:
        return "#FF6B6B"; // Red
      case 3:
        return "#00B894"; // Green
      case 4:
        return "#FDCB6E"; // Yellow
      default:
        return "#CCCCCC"; // Default gray
    }
  };

  return (
    <View style={[styles.profileContainer, { borderColor: getBorderColor() }, { width: size, height: size, borderRadius: Math.min(size, size) / 2 }]}>
      <Image
        source={typeof photo === 'string' ? { uri: photo } : photo}
        style={styles.profileImage}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    borderRadius: 15,
    overflow: "hidden",
    borderWidth: 2,
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
});

export default ProfilePhoto;
