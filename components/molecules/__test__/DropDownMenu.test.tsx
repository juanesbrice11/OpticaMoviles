import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { DropdownMenu } from '../DropdownMenu'; 
import { Text } from 'react-native';

describe('DropdownMenu', () => {
  const mockHandleOpen = jest.fn();
  const mockHandleClose = jest.fn();
  const triggerText = 'Abrir menú';

  const renderDropdown = (visible: boolean = false) =>
    render(
      <DropdownMenu
        visible={visible}
        handleOpen={mockHandleOpen}
        handleClose={mockHandleClose}
        trigger={<Text>{triggerText}</Text>}
      >
        <Text>Opción 1</Text>
        <Text>Opción 2</Text>
      </DropdownMenu>
    );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('debería renderizar el trigger siempre', () => {
    const { getByText } = renderDropdown(false);
    expect(getByText(triggerText)).toBeTruthy();
  });

  it('debería llamar a handleOpen al presionar el trigger', () => {
    const { getByText } = renderDropdown(false);
    fireEvent.press(getByText(triggerText));
    expect(mockHandleOpen).toHaveBeenCalled();
  });

  it('no debería mostrar el dropdown cuando visible es false', () => {
    const { queryByText } = renderDropdown(false);
    expect(queryByText('Opción 1')).toBeNull();
    expect(queryByText('Opción 2')).toBeNull();
  });

  it('debería mostrar el dropdown cuando visible es true', () => {
    const { getByText } = renderDropdown(true);
    expect(getByText('Opción 1')).toBeTruthy();
    expect(getByText('Opción 2')).toBeTruthy();
  });

  it('debería llamar a handleClose al presionar fuera del menú', async () => {
    const { getByTestId } = render(
      <DropdownMenu
        visible={true}
        handleOpen={mockHandleOpen}
        handleClose={mockHandleClose}
        trigger={<Text>{triggerText}</Text>}
      >
        <Text>Opción 1</Text>
      </DropdownMenu>
    );

    const overlay = await waitFor(() => getByTestId('modal-root'));
    fireEvent.press(overlay);
    expect(mockHandleClose).toHaveBeenCalled();
  });
});
