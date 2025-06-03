import React from 'react';
import { Ionicons } from '@expo/vector-icons';

type RenderNotifTypeProps = {
  type: number; // 0: Like, 1: Follow, 2: Comment
};

const RenderNotifType: React.FC<RenderNotifTypeProps> = ({ type }) => {
  const getIcon = () => {
    switch (type) {
      case 0:
        return <Ionicons name="heart" size={24} color="#FF6B6B" />; // Like
      case 1:
        return <Ionicons name="person-add" size={24} color="#A29BFE" />; // Follow
      case 2:
        return <Ionicons name="chatbubble" size={24} color="#00B894" />; // Comment
      default:
        return <Ionicons name="notifications" size={24} color="#CCCCCC" />; // Default
    }
  };

  return getIcon();
};

export default RenderNotifType;
