import React from 'react';
import { render } from '@testing-library/react-native';
import { MenuTrigger } from '../MenuTrigger';
import { Text } from 'react-native';

describe('MenuTrigger', () => {
    it('debería renderizar los children correctamente', () => {
        const { getByText } = render(
            <MenuTrigger>
                <Text>Texto de prueba</Text>
            </MenuTrigger>
        );

        expect(getByText('Texto de prueba')).toBeTruthy();
    });
});