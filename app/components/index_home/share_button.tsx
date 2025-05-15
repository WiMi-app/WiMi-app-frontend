import React from 'react';
import { View, Button, Share as reactShare, Alert, StyleSheet, Pressable } from 'react-native';
import ShareIcon from '../icons/share_icon';

interface Share {
    message?: string,
    title?: string
}

const ShareButton = ({ 
    message = "", 
}) => {
  const handleShare = async () => {
    try {
      const result = await reactShare.share({
        message: message,
      });

      if (result.action === reactShare.sharedAction) {
        console.log('Shared successfully');
      } else if (result.action === reactShare.dismissedAction) {
        console.log('Sharing dismissed');
      }
    } catch (error:any) {
      console.error('Error sharing:', error.message);
      Alert.alert(error.message)
    }
  };

  return (
    <Pressable onPress={handleShare}>
        <ShareIcon/>
        {/* <Button title="Share" onPress={handleShare} /> */}
    </Pressable>
  );
};

const styles = StyleSheet.create({
    shareButtonIcon: {

    },
});

export default ShareButton;