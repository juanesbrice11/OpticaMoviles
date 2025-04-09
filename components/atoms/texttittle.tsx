import React from 'react';
import { Text } from 'react-native';
import { texttitile } from '../tokens';

interface TitleTextProps {
  children: React.ReactNode;
}

const TitleText: React.FC<TitleTextProps> = ({ children }) => {
  return (
    <Text className={`${texttitile} text-center`}>
      {children}
    </Text>
  );
};

export default TitleText;