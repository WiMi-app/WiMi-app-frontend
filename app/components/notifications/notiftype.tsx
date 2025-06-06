import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Path, Defs, LinearGradient, Stop } from 'react-native-svg';

type RenderNotifTypeProps = {
  type: number; // 0: Like, 1: Follow, 2: Comment
};

export const RenderNotifType: React.FC<RenderNotifTypeProps> = ({ type }) => {
  const getIcon = () => {
    switch (type) {
      case 0:
        return (
          <Svg width="24" height="24" viewBox="0 0 24 24">
            <Defs>
              <LinearGradient id="heartGradient" x1="0" y1="0" x2="0" y2="1">
                <Stop offset="0" stopColor="#FF7854" />
                <Stop offset="1" stopColor="#FD267D" />
              </LinearGradient>
            </Defs>
            <Path
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
              fill="url(#heartGradient)"
            />
          </Svg>
        ); // Like
      case 1:
        return (
          <Svg width="24" height="24" viewBox="0 0 24 24">
            <Defs>
              <LinearGradient id="followGradient" x1="0" y1="0" x2="0" y2="1">
                <Stop offset="0" stopColor="#5858E8" />
                <Stop offset="1" stopColor="#9B5EFC" />
              </LinearGradient>
            </Defs>
            <Path
              d="M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm-9-2V7H4v3H1v2h3v3h2v-3h3v-2H6zm9 4c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
              fill="url(#followGradient)"
            />
          </Svg>
        ); // Follow
      case 2:
        return (
          <Svg width="24" height="24" viewBox="0 0 24 24">
            <Defs>
              <LinearGradient id="commentGradient" x1="0" y1="0" x2="0" y2="1">
                <Stop offset="0" stopColor="#FFC166" />
                <Stop offset="1" stopColor="#FF9966" />
              </LinearGradient>
            </Defs>
            <Path
              d="M12 2C6.48 2 2 5.51 2 10c0 2.9 1.76 5.47 4.5 6.98V20l3.77-2.51c.55.1 1.12.15 1.73.15 5.52 0 10-3.51 10-8S17.52 2 12 2z"
              fill="url(#commentGradient)"
            />
          </Svg>
        ); // Comment
      default:
        return null; // Default
    }
  };
  return getIcon();
};

export default RenderNotifType;
