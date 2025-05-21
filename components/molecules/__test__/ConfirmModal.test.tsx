import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import FloatingMenu, { Route } from '../ConfirmModal';

describe('FloatingMenu', () => {
    const mockRoutes: Route[] = [
        { url: '/home', text: 'Home' },
        { url: '/profile', text: 'Profile' },
    ];

    const mockOnClose = jest.fn();

    it('debería renderizarse correctamente cuando visible es true', () => {
        const { getByText } = render(
            <FloatingMenu visible={true} onClose={mockOnClose} routes={mockRoutes} />
        );

        expect(getByText('Home')).toBeTruthy();
        expect(getByText('Profile')).toBeTruthy();
    });

    it('no debería renderizarse cuando visible es false', () => {
        const { queryByText } = render(
            <FloatingMenu visible={false} onClose={mockOnClose} routes={mockRoutes} />
        );

        expect(queryByText('Home')).toBeNull();
        expect(queryByText('Profile')).toBeNull();
    });

    it('debería llamar a onClose al presionar fuera del menú', async () => {
        const { getByTestId } = render(
            <FloatingMenu visible={true} onClose={mockOnClose} routes={mockRoutes} />
        );

        const overlay = await waitFor(() => getByTestId('overlay'));
        fireEvent.press(overlay);

        expect(mockOnClose).toHaveBeenCalled();
    });

    it('debería renderizar correctamente las rutas', () => {
        const { getByText } = render(
            <FloatingMenu visible={true} onClose={mockOnClose} routes={mockRoutes} />
        );

        mockRoutes.forEach((route) => {
            expect(getByText(route.text)).toBeTruthy();
        });
    });
});