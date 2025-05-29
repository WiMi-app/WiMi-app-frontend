import { ImageSourcePropType } from 'react-native';

export interface Photo {
  photo?: ImageSourcePropType | string;
  Status?: number;
  width?: number;
  height?: number;
} 