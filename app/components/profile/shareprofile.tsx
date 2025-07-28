import { Share, Alert } from "react-native"

const handleShareProfile = async () => {
    try {
      const result = await Share.share({
        message: "IGNORE THIS TEST FOR PROFILE SHARE BUTTON",
      });

      if (result.action === Share.sharedAction) {
        console.log('Shared successfully');
      } else if (result.action === Share.dismissedAction) {
        console.log('Sharing dismissed');
      }
    } catch (error:any) {
      console.error('Error sharing:', error.message);
      Alert.alert(error.message)
    }
}

export default handleShareProfile;