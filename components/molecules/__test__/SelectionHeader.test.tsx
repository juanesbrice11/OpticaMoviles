import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { render, fireEvent } from '@testing-library/react-native';

// Mock expo-modules-core to prevent import errors
jest.mock('expo-modules-core', () => ({
  EventEmitter: class {},
}));

// Mock Ionicons
jest.mock('@expo/vector-icons', () => ({
  Ionicons: jest.fn().mockImplementation(() => null)
}));

import SelectionHeader from '../selectionheader';

describe('SelectionHeader', () => {
  const onDelete = jest.fn();
  const onCancel = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('does not render when isSelectionMode is false', () => {
    const { queryByText } = render(
      <SelectionHeader isSelectionMode={false} selectedCount={0} onDelete={onDelete} onCancel={onCancel} />
    );
    expect(queryByText('Cancelar')).toBeNull();
  });

  it('renders delete and cancel when selection mode is true', () => {
    const { getByText, getByTestId } = render(
      <SelectionHeader isSelectionMode={true} selectedCount={0} onDelete={onDelete} onCancel={onCancel} />
    );
    expect(getByText('Cancelar')).toBeTruthy();
    expect(getByTestId('delete-button')).toBeTruthy();
    expect(getByTestId('cancel-button')).toBeTruthy();
  });

  it('delete button disabled when selectedCount is 0', () => {
    const { getByTestId } = render(
      <SelectionHeader isSelectionMode={true} selectedCount={0} onDelete={onDelete} onCancel={onCancel} />
    );
    const deleteBtn = getByTestId('delete-button');
    fireEvent.press(deleteBtn);
    expect(onDelete).not.toHaveBeenCalled();
  });

  it('delete button enabled when selectedCount > 0', () => {
    const { getByTestId } = render(
      <SelectionHeader isSelectionMode={true} selectedCount={5} onDelete={onDelete} onCancel={onCancel} />
    );
    const deleteBtn = getByTestId('delete-button');
    fireEvent.press(deleteBtn);
    expect(onDelete).toHaveBeenCalledTimes(1);
  });

  it('calls onCancel when Cancel pressed', () => {
    const { getByTestId } = render(
      <SelectionHeader isSelectionMode={true} selectedCount={2} onDelete={onDelete} onCancel={onCancel} />
    );
    const cancelBtn = getByTestId('cancel-button');
    fireEvent.press(cancelBtn);
    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  it('passes correct color prop to Ionicons based on selectedCount', () => {
    const { Ionicons } = require('@expo/vector-icons');
    
    render(
      <SelectionHeader isSelectionMode={true} selectedCount={0} onDelete={onDelete} onCancel={onCancel} />
    );
    expect(Ionicons).toHaveBeenLastCalledWith(expect.objectContaining({ color: '#999' }), {});

    render(
      <SelectionHeader isSelectionMode={true} selectedCount={3} onDelete={onDelete} onCancel={onCancel} />
    );
    expect(Ionicons).toHaveBeenLastCalledWith(expect.objectContaining({ color: '#FF0000' }), {});
  });
});
