// src/components/atoms/IconButton.tsx
import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface IconButtonProps {
  onPress: () => void;
  iconName: keyof typeof Ionicons.glyphMap;
  iconSize?: number;
  iconColor?: string;
  text?: string;
  disabled?: boolean;
  containerClassName?: string;
}

const IconButton: React.FC<IconButtonProps> = ({
  onPress,
  iconName,
  iconSize = 24,
  iconColor = '#000',
  text,
  disabled,
  containerClassName,
}) => {
  return (
    <TouchableOpacity onPress={onPress} disabled={disabled} className={containerClassName}>
      <Ionicons name={iconName} size={iconSize} color={iconColor} />
      {text && <Text>{text}</Text>}
    </TouchableOpacity>
  );
};

export default IconButton;
