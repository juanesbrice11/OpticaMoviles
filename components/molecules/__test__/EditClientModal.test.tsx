import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react-native';
import EditClientModal from '../EditClientModal';
import { updateClient } from '@/services/clientsService';
import { Alert, Keyboard } from 'react-native';

jest.mock('../../../services/clientsService', () => ({
  updateClient: jest.fn(),
}));

const alertSpy = jest.spyOn(Alert, 'alert');
const keyboardDismissSpy = jest.spyOn(Keyboard, 'dismiss');

describe('EditClientModal', () => {
  const mockClientData = {
    id: '1',
    name: 'John',
    lastname: 'Doe',
    phone: '1234567890',
    email: 'john@example.com',
  };

  const mockOnClose = jest.fn();
  const mockOnSuccess = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('debería renderizarse correctamente con los datos del cliente', () => {
    const { getByDisplayValue } = render(
      <EditClientModal
        visible={true}
        clientData={mockClientData}
        onClose={mockOnClose}
        onSuccess={mockOnSuccess}
      />
    );

    expect(getByDisplayValue('John')).toBeTruthy();
    expect(getByDisplayValue('Doe')).toBeTruthy();
    expect(getByDisplayValue('1234567890')).toBeTruthy();
    expect(getByDisplayValue('john@example.com')).toBeTruthy();
  });

  it('no debería renderizarse cuando visible es false', () => {
    const { queryByText } = render(
      <EditClientModal
        visible={false}
        clientData={mockClientData}
        onClose={mockOnClose}
        onSuccess={mockOnSuccess}
      />
    );

    expect(queryByText('Editar Usuario')).toBeNull();
  });

  it('debería llamar a onClose y cerrar teclado al presionar cancelar', () => {
    const { getByText, getByTestId } = render(
      <EditClientModal
        visible={true}
        clientData={mockClientData}
        onClose={mockOnClose}
        onSuccess={mockOnSuccess}
      />
    );

    fireEvent.press(getByText('Cancelar'));
    expect(keyboardDismissSpy).toHaveBeenCalled();
    expect(mockOnClose).toHaveBeenCalled();

    mockOnClose.mockClear();
    fireEvent.press(getByTestId('modal-overlay'));
    expect(mockOnClose).toHaveBeenCalled();
  });

  it('debería actualizar los campos cuando se escriben nuevos valores', () => {
    const { getByDisplayValue } = render(
      <EditClientModal
        visible={true}
        clientData={mockClientData}
        onClose={mockOnClose}
        onSuccess={mockOnSuccess}
      />
    );

    const nameInput = getByDisplayValue('John');
    fireEvent.changeText(nameInput, 'Jane');
    expect(getByDisplayValue('Jane')).toBeTruthy();
  });

  it('debería llamar a updateClient y onSuccess cuando se guarda exitosamente', async () => {
    (updateClient as jest.Mock).mockResolvedValueOnce({});
    const { getByText } = render(
      <EditClientModal
        visible={true}
        clientData={mockClientData}
        onClose={mockOnClose}
        onSuccess={mockOnSuccess}
      />
    );

    await act(async () => {
      fireEvent.press(getByText('Guardar'));
    });

    await waitFor(() => {
      expect(updateClient).toHaveBeenCalledWith('1', {
        ...mockClientData,
        name: 'John',
        lastname: 'Doe',
        email: 'john@example.com',
        phone: '1234567890',
      });
      expect(alertSpy).toHaveBeenCalledWith('Éxito', 'Cliente actualizado correctamente');
      expect(mockOnSuccess).toHaveBeenCalled();
    });
  });

  it('debería mostrar alerta de error cuando falla la actualización', async () => {
    (updateClient as jest.Mock).mockRejectedValueOnce(new Error('Error de actualización'));
    const { getByText } = render(
      <EditClientModal
        visible={true}
        clientData={mockClientData}
        onClose={mockOnClose}
        onSuccess={mockOnSuccess}
      />
    );

    await act(async () => {
      fireEvent.press(getByText('Guardar'));
    });

    await waitFor(() => {
      expect(alertSpy).toHaveBeenCalledWith('Error', 'No se pudo actualizar el cliente');
      expect(mockOnSuccess).not.toHaveBeenCalled();
    });
  });

  it('debería deshabilitar inputs durante la carga y mostrar indicador', async () => {
    let resolvePromise: () => void;
    const promise = new Promise<void>(res => { resolvePromise = res; });
    (updateClient as jest.Mock).mockReturnValue(promise);

    const { getByText, getByDisplayValue } = render(
      <EditClientModal
        visible={true}
        clientData={mockClientData}
        onClose={mockOnClose}
        onSuccess={mockOnSuccess}
      />
    );

    const nameInput = getByDisplayValue('John');

    await act(async () => {
      fireEvent.press(getByText('Guardar'));
    });

    expect(nameInput.props.editable).toBe(false);
    expect(getByText('Guardando...')).toBeTruthy();
    await act(async () => resolvePromise!());
  });
});