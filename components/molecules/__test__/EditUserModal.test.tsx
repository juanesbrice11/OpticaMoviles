import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react-native';
import EditUserModal from '../EditUserModal';
import { updateUser } from '@/services/usersService';
import { Alert, Keyboard } from 'react-native';

jest.mock('@/services/usersService', () => ({
  updateUser: jest.fn(),
}));

const alertSpy = jest.spyOn(Alert, 'alert');
const keyboardDismissSpy = jest.spyOn(Keyboard, 'dismiss');

describe('EditUserModal', () => {
  const userData = { id: '1', name: 'John Doe', email: 'john@example.com', role: 'admin' };
  const onClose = jest.fn();
  const onSuccess = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders initial name, email and role when visible', () => {
    const { getByDisplayValue, getByText } = render(
      <EditUserModal
        visible={true}
        userData={userData}
        onClose={onClose}
        onSuccess={onSuccess}
      />
    );
    expect(getByDisplayValue('John Doe')).toBeTruthy();
    expect(getByDisplayValue('john@example.com')).toBeTruthy();
    expect(getByText('admin')).toBeTruthy();
  });

  it('does not render modal content when visible is false', () => {
    const { queryByText } = render(
      <EditUserModal
        visible={false}
        userData={userData}
        onClose={onClose}
        onSuccess={onSuccess}
      />
    );
    expect(queryByText('Editar Usuario')).toBeNull();
  });

  it('calls onClose and dismisses keyboard when pressing Cancel', () => {
    const { getByText } = render(
      <EditUserModal
        visible={true}
        userData={userData}
        onClose={onClose}
        onSuccess={onSuccess}
      />
    );
    fireEvent.press(getByText('Cancelar'));
    expect(keyboardDismissSpy).toHaveBeenCalled();
    expect(onClose).toHaveBeenCalled();
  });

  it('updates name and email inputs on change', () => {
    const { getByDisplayValue } = render(
      <EditUserModal
        visible={true}
        userData={userData}
        onClose={onClose}
        onSuccess={onSuccess}
      />
    );
    const nameInput = getByDisplayValue('John Doe');
    fireEvent.changeText(nameInput, 'Jane Smith');
    expect(getByDisplayValue('Jane Smith')).toBeTruthy();

    const emailInput = getByDisplayValue('john@example.com');
    fireEvent.changeText(emailInput, 'jane@example.com');
    expect(getByDisplayValue('jane@example.com')).toBeTruthy();
  });

  it('opens dropdown and selects a new role', () => {
    const { getByText, queryByText } = render(
      <EditUserModal
        visible={true}
        userData={userData}
        onClose={onClose}
        onSuccess={onSuccess}
      />
    );
    fireEvent.press(getByText('admin'));
    expect(getByText('Admin')).toBeTruthy();
    expect(getByText('Secretary')).toBeTruthy();
    fireEvent.press(getByText('Secretary'));
    expect(queryByText('admin')).toBeNull();
    expect(getByText('secretary')).toBeTruthy();
  });

  it('calls updateUser and onSuccess on successful save', async () => {
    (updateUser as jest.Mock).mockResolvedValueOnce(undefined);
    const { getByText } = render(
      <EditUserModal
        visible={true}
        userData={userData}
        onClose={onClose}
        onSuccess={onSuccess}
      />
    );

    await act(async () => {
      fireEvent.press(getByText('Guardar'));
    });

    await waitFor(() => {
      expect(updateUser).toHaveBeenCalledWith('1', {
        ...userData,
        name: 'John Doe',
        email: 'john@example.com',
        role: 'admin',
      });
      expect(alertSpy).toHaveBeenCalledWith('Éxito', 'Usuario actualizado correctamente');
      expect(onSuccess).toHaveBeenCalled();
    });
  });

  it('shows error alert and does not call onSuccess on save failure', async () => {
    (updateUser as jest.Mock).mockRejectedValueOnce(new Error('fail'));
    const { getByText } = render(
      <EditUserModal
        visible={true}
        userData={userData}
        onClose={onClose}
        onSuccess={onSuccess}
      />
    );

    await act(async () => {
      fireEvent.press(getByText('Guardar'));
    });

    await waitFor(() => {
      expect(alertSpy).toHaveBeenCalledWith('Error', 'No se pudo actualizar el usuario');
      expect(onSuccess).not.toHaveBeenCalled();
    });
  });

  it('disables inputs and shows loading state during save', async () => {
    let resolve: () => void;
    const pending = new Promise<void>(res => { resolve = res; });
    (updateUser as jest.Mock).mockReturnValue(pending);
    const { getByText, getByDisplayValue } = render(
      <EditUserModal
        visible={true}
        userData={userData}
        onClose={onClose}
        onSuccess={onSuccess}
      />
    );

    const nameInput = getByDisplayValue('John Doe');
    await act(async () => {
      fireEvent.press(getByText('Guardar'));
    });
    expect(nameInput.props.editable).toBe(false);
    expect(getByText('Guardando...')).toBeTruthy();

    await act(async () => resolve!());
  });
});
