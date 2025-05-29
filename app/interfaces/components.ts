import { TextInputProps, ViewStyle, TextStyle } from 'react-native';

export interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  containerStyle?: ViewStyle;
}

export interface PostElements {
    profile_name?: string,
    profile_pic?: string,
    num_likes?: number,
    num_comments?: number,
    post_pic?: string,
    post_description?: string,
    elapsed_post_time?: string,
    challenge?:string
}

export interface Share {
    message?: string,
    title?: string
}

export interface num_likes {
    like_count?: number
}

export interface comment {
    comment_count?: number
}

export interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'gradient';
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  gradientColors?: string[];
  borderColor?: string;
  customTextColor?: string;
  backgroundColor?: string;
} 