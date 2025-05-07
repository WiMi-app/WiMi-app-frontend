import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'gradient';
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  gradientColors?: string[]; // New prop for gradient colors
}

const Button = ({
  title,
  onPress,
  variant = 'primary',
  loading = false,
  disabled = false,
  style,
  textStyle,
  gradientColors = ['#667eea', '#764ba2'], // default gradient
}: ButtonProps) => {
  const getTextStyle = () => {
    switch (variant) {
      case 'outline':
        return styles.outlineButtonText;
      default:
        return styles.buttonText;
    }
  };

  const content = loading ? (
    <ActivityIndicator color={variant === 'outline' ? '#5A67D8' : '#FFFFFF'} />
  ) : (
    <Text style={[getTextStyle(), textStyle]}>{title}</Text>
  );

  const buttonStyles = [
    styles.button,
    variant !== 'gradient' && getButtonStyle(),
    disabled && styles.disabledButton,
    style,
  ];

  return variant === 'gradient' ? (
    <TouchableOpacity onPress={onPress} disabled={disabled || loading}>
      <LinearGradient
        colors={gradientColors}
        style={[styles.button, disabled && styles.disabledButton, style]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        {content}
      </LinearGradient>
    </TouchableOpacity>
  ) : (
    <TouchableOpacity style={buttonStyles} onPress={onPress} disabled={disabled || loading}>
      {content}
    </TouchableOpacity>
  );
};

const getButtonStyle = () => {
  switch (variant) {
    case 'secondary':
      return styles.secondaryButton;
    case 'outline':
      return styles.outlineButton;
    default:
      return styles.primaryButton;
  }
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8,
  },
  primaryButton: {
    backgroundColor: '#5A67D8',
  },
  secondaryButton: {
    backgroundColor: '#E5E7EB',
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#5A67D8',
  },
  disabledButton: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  outlineButtonText: {
    color: '#5A67D8',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default Button;
