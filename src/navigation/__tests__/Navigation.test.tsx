import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from '../RootNavigator';

// Mock the screens
jest.mock('../../screens/HomeScreen', () => {
  return {
    __esModule: true,
    default: () => <div>Home Screen</div>,
  };
});

jest.mock('../../screens/CardViewScreen', () => {
  return {
    __esModule: true,
    default: () => <div>Card View Screen</div>,
  };
});

jest.mock('../../screens/SettingsScreen', () => {
  return {
    __esModule: true,
    default: () => <div>Settings Screen</div>,
  };
});

jest.mock('../../screens/ImportModal', () => {
  return {
    __esModule: true,
    default: () => <div>Import Modal</div>,
  };
});

describe('Navigation', () => {
  const renderNavigator = () =>
    render(
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    );

  it('renders home screen by default', () => {
    const { getByText } = renderNavigator();
    expect(getByText('Home Screen')).toBeTruthy();
  });

  it('navigates to card view screen', async () => {
    const { getByText, findByText } = renderNavigator();

    // Mock navigation to CardView
    fireEvent.press(getByText('View Set')); // This button will be in HomeScreen

    expect(await findByText('Card View Screen')).toBeTruthy();
  });

  it('navigates to settings screen', async () => {
    const { getByText, findByText } = renderNavigator();

    // Mock navigation to Settings
    fireEvent.press(getByText('Settings')); // This button will be in HomeScreen

    expect(await findByText('Settings Screen')).toBeTruthy();
  });

  it('opens import modal', async () => {
    const { getByText, findByText } = renderNavigator();

    // Mock opening ImportModal
    fireEvent.press(getByText('Import')); // This button will be in HomeScreen

    expect(await findByText('Import Modal')).toBeTruthy();
  });

  it('passes correct params to card view screen', async () => {
    const { getByTestId } = renderNavigator();

    // Mock navigation with params
    fireEvent.press(getByTestId('card-set-1'));

    // This will be implemented in CardViewScreen
    expect(getByTestId('set-id')).toHaveTextContent('test-set-1');
  });
});
