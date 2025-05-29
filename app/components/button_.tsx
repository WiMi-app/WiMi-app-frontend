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
import { ButtonProps } from '../interfaces/components';

const Button = ({
  title,
  onPress,
  variant = 'primary',
  loading = false,
  disabled = false,
  style,
  textStyle,
  gradientColors = ['#667eea', '#764ba2'],
  borderColor,
  customTextColor,
  backgroundColor,
}: ButtonProps) => {
  const getTextStyle = () => {
    const baseTextStyle =
      variant === 'outline' ? styles.outlineButtonText : styles.buttonText;

    return [
      baseTextStyle,
      customTextColor && { color: customTextColor },
      textStyle,
    ];
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

  const content = loading ? (
    <ActivityIndicator
      color={customTextColor || (variant === 'outline' ? '#000000' : '#FFFFFF')}
    />
  ) : (
    <Text style={getTextStyle()}>{title}</Text>
  );

  const buttonStyles = [
    styles.button,
    variant !== 'gradient' && getButtonStyle(),
    backgroundColor && { backgroundColor },
    borderColor && { borderColor, borderWidth: 1 },
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
    <TouchableOpacity
      style={buttonStyles}
      onPress={onPress}
      disabled={disabled || loading}
    >
      {content}
    </TouchableOpacity>
  );
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
