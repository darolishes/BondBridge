import React from 'react';
import { render } from '@testing-library/react-native';
import EmptyState from '../EmptyState';

describe('EmptyState', () => {
  it('renders with default props', () => {
    const { getByTestId, getByText } = render(<EmptyState />);

    expect(getByTestId('empty-state')).toBeTruthy();
    expect(getByText('No card sets found')).toBeTruthy();
    expect(getByText('Import a card set to start your relationship journey')).toBeTruthy();
  });

  it('renders with custom props', () => {
    const customTitle = 'Custom Title';
    const customMessage = 'Custom Message';
    const customIcon = 'star-outline';
    const customTestId = 'custom-empty-state';

    const { getByTestId, getByText } = render(
      <EmptyState
        title={customTitle}
        message={customMessage}
        icon={customIcon}
        testID={customTestId}
      />
    );

    expect(getByTestId(customTestId)).toBeTruthy();
    expect(getByText(customTitle)).toBeTruthy();
    expect(getByText(customMessage)).toBeTruthy();
  });
});
