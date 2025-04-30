import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react-native';
import { EditClinicalHistoryModal } from '../EditClinicalHistoryModal';
import { updateClinicalHistory } from '@/services/clinicalHistory';
import { Alert, Keyboard } from 'react-native';

// Mock the service module
jest.mock('../../../services/clinicalHistory', () => ({
  updateClinicalHistory: jest.fn(),
}));

const alertSpy = jest.spyOn(Alert, 'alert');
const keyboardDismissSpy = jest.spyOn(Keyboard, 'dismiss');

describe('EditClinicalHistoryModal', () => {
  const mockData = {
    id: '42',
    sc: ['20/20', '20/30'],
    cc: ['Miopía', 'Astigmatismo'],
    ae: ['Lentes progresivos'],
  };

  const onClose = jest.fn();
  const onSuccess = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders initial values joined by slash', () => {
    const { getByDisplayValue } = render(
      <EditClinicalHistoryModal
        visible={true}
        historyData={mockData as any}
        onClose={onClose}
        onSuccess={onSuccess}
      />
    );

    expect(getByDisplayValue('20/20/ 20/30')).toBeTruthy();
    expect(getByDisplayValue('Miopía/ Astigmatismo')).toBeTruthy();
    expect(getByDisplayValue('Lentes progresivos')).toBeTruthy();
  });

  it('does not render when visible is false', () => {
    const { queryByText } = render(
      <EditClinicalHistoryModal
        visible={false}
        historyData={mockData as any}
        onClose={onClose}
        onSuccess={onSuccess}
      />
    );
    expect(queryByText('Editar Historia Clínica')).toBeNull();
  });

  it('calls onClose and dismisses keyboard on cancel', () => {
    const { getByText } = render(
      <EditClinicalHistoryModal
        visible={true}
        historyData={mockData as any}
        onClose={onClose}
        onSuccess={onSuccess}
      />
    );

    fireEvent.press(getByText('Cancelar'));
    expect(keyboardDismissSpy).toHaveBeenCalled();
    expect(onClose).toHaveBeenCalled();
  });

  it('updates text inputs when typing', () => {
    const { getByDisplayValue } = render(
      <EditClinicalHistoryModal
        visible={true}
        historyData={mockData as any}
        onClose={onClose}
        onSuccess={onSuccess}
      />
    );

    const scInput = getByDisplayValue('20/20/ 20/30');
    fireEvent.changeText(scInput, '15/20, 18/20');
    expect(getByDisplayValue('15/20, 18/20')).toBeTruthy();
  });

  it('calls updateClinicalHistory and onSuccess on successful save', async () => {
    (updateClinicalHistory as jest.Mock).mockResolvedValueOnce({});

    const { getByText } = render(
      <EditClinicalHistoryModal
        visible={true}
        historyData={mockData as any}
        onClose={onClose}
        onSuccess={onSuccess}
      />
    );

    await act(async () => {
      fireEvent.press(getByText('Guardar'));
    });

    await waitFor(() => {
      expect(updateClinicalHistory).toHaveBeenCalledWith('42', {
        ...mockData,
        sc: ['20/20/ 20/30'],
        cc: ['Miopía/ Astigmatismo'],
        ae: ['Lentes progresivos'],
      });
      expect(alertSpy).toHaveBeenCalledWith('Éxito', 'Historia clínica actualizada correctamente');
      expect(onSuccess).toHaveBeenCalled();
    });
  });

  it('shows error alert on save failure', async () => {
    (updateClinicalHistory as jest.Mock).mockRejectedValueOnce(new Error('fail'));

    const { getByText } = render(
      <EditClinicalHistoryModal
        visible={true}
        historyData={mockData as any}
        onClose={onClose}
        onSuccess={onSuccess}
      />
    );

    await act(async () => {
      fireEvent.press(getByText('Guardar'));
    });

    await waitFor(() => {
      expect(alertSpy).toHaveBeenCalledWith('Error', 'No se pudo actualizar la historia clínica');
      expect(onSuccess).not.toHaveBeenCalled();
    });
  });

  it('disables inputs and shows loading state during save', async () => {
    let resolvePromise: () => void;
    const pending = new Promise<void>(res => { resolvePromise = res; });
    (updateClinicalHistory as jest.Mock).mockReturnValue(pending);

    const { getByText, getByDisplayValue } = render(
      <EditClinicalHistoryModal
        visible={true}
        historyData={mockData as any}
        onClose={onClose}
        onSuccess={onSuccess}
      />
    );

    const ccInput = getByDisplayValue('Miopía/ Astigmatismo');

    await act(async () => {
      fireEvent.press(getByText('Guardar'));
    });

    expect(ccInput.props.editable).toBe(false);
    expect(getByText('Guardando...')).toBeTruthy();

    await act(async () => resolvePromise!());
  });
});
