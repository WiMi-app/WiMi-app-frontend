import { ImageSourcePropType } from 'react-native';

export interface HeaderProps {
    title? : String,
    onNotificationPress?: () => void;
} 


export type ChallengePush = {
  "title": String,
  "description": String,
  "due_date": Date,
  "location": String,
  "restriction": String,
  "repetition": String,
  "repetition_frequency": 0,
  "check_in_time": String,
  "is_private": Boolean,
  "time_window": number,
  "background_photo": String[]
}
export type UserPostData = {
  id: string;
  username: string;
  profile_pic: string;
  elapsed_post_time: string;
  challenge: string;
  post_photo: string;
  description: string;
  likes: string[];
  comments: number;
}

export type UserPostProps = {
  postItem: UserPostData;
}; 

export interface PlayerAvatar {
  id: string;
  image: ImageSourcePropType;
}
