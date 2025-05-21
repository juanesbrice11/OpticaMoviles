import React from 'react';
import { Text } from 'react-native';
import { texttitle } from '../tokens';

interface TitleTextProps {
  children: React.ReactNode;
}

const TitleText: React.FC<TitleTextProps> = ({ children }) => {
  return (
    <Text className={`${texttitle} text-center`}>
      {children}
    </Text>
  );
};

export default TitleText;