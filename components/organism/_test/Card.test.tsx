import React from 'react';
import { render } from '@testing-library/react-native';
import Card from '../Card';

jest.mock('@expo/vector-icons', () => ({
  Ionicons: () => null,
}));

jest.mock('expo-router', () => ({
  router: {
    push: jest.fn(),
  },
}));

describe('Card component', () => {
  const defaultProps = {
    id: 1,
    name: 'Gafas Modernas',
    imageUri: 'https://example.com/image.jpg',
    price: 100000,
    material: 'Metal',
    stock: 5,
  };

  it('Debe renderizar la carta con el nombre y el precio correcto', () => {
    const { getByText } = render(<Card {...defaultProps} />);

    expect(getByText('Gafas Modernas')).toBeTruthy();
    expect(getByText('$100000')).toBeTruthy();
  });
});
