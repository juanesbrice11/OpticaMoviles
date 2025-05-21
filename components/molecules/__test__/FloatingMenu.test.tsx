import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import FloatingMenu from '../FloatingMenu';

jest.mock('expo-router', () => ({
  Link: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

describe('FloatingMenu', () => {
  const routes = [
    { url: '/home', text: 'Home' },
    { url: '/settings', text: 'Settings' },
  ];
  const onClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('does not render anything when visible is false', () => {
    const { queryByText } = render(
      <FloatingMenu visible={false} onClose={onClose} routes={routes} />
    );
    expect(queryByText('Home')).toBeNull();
    expect(queryByText('Settings')).toBeNull();
  });

  it('renders all route items when visible is true', () => {
    const { getByText } = render(
      <FloatingMenu visible={true} onClose={onClose} routes={routes} />
    );
    expect(getByText('Home')).toBeTruthy();
    expect(getByText('Settings')).toBeTruthy();
  });

  it('calls onClose when a route is pressed', () => {
    const { getByText } = render(
      <FloatingMenu visible={true} onClose={onClose} routes={routes} />
    );
    fireEvent.press(getByText('Home'));
    expect(onClose).toHaveBeenCalledTimes(1);
    fireEvent.press(getByText('Settings'));
    expect(onClose).toHaveBeenCalledTimes(2);
  });
});
