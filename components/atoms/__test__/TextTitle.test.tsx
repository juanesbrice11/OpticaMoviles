import React from 'react';
import { render } from '@testing-library/react-native';
import TitleText from '../TextTitle';

describe('TitleText', () => {
    it('debería renderizar los children correctamente', () => {
        const { getByText } = render(
            <TitleText>Texto de prueba</TitleText>
        );

        expect(getByText('Texto de prueba')).toBeTruthy();
    });

    it('debería aplicar las clases correctamente', () => {
        const { getByText } = render(
            <TitleText>Texto de prueba</TitleText>
        );

        const textElement = getByText('Texto de prueba');
        expect(textElement.props.className).toContain('text-center');
    });
});