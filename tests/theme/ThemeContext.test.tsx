import { renderHook, act } from '@testing-library/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme, ThemeProvider } from '../ThemeContext';
import { lightTheme, darkTheme } from '../constants';

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(() => Promise.resolve(null)),
  setItem: jest.fn(() => Promise.resolve()),
}));

describe('ThemeContext', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('provides light theme by default', () => {
    const { result } = renderHook(() => useTheme(), {
      wrapper: ThemeProvider,
    });

    expect(result.current.themeMode).toBe('light');
    expect(result.current.theme).toEqual(lightTheme);
  });

  it('toggles theme correctly', async () => {
    const { result } = renderHook(() => useTheme(), {
      wrapper: ThemeProvider,
    });

    await act(async () => {
      result.current.toggleTheme();
      await Promise.resolve(); // Flush promises
    });

    expect(result.current.themeMode).toBe('dark');
    expect(result.current.theme).toEqual(darkTheme);
    expect(AsyncStorage.setItem).toHaveBeenCalledWith('bondbridge:theme_mode', 'dark');

    await act(async () => {
      result.current.toggleTheme();
      await Promise.resolve(); // Flush promises
    });

    expect(result.current.themeMode).toBe('light');
    expect(result.current.theme).toEqual(lightTheme);
    expect(AsyncStorage.setItem).toHaveBeenCalledWith('bondbridge:theme_mode', 'light');
  });

  it('sets theme mode directly', async () => {
    const { result } = renderHook(() => useTheme(), {
      wrapper: ThemeProvider,
    });

    await act(async () => {
      result.current.setThemeMode('dark');
      await Promise.resolve(); // Flush promises
    });

    expect(result.current.themeMode).toBe('dark');
    expect(result.current.theme).toEqual(darkTheme);
    expect(AsyncStorage.setItem).toHaveBeenCalledWith('bondbridge:theme_mode', 'dark');
  });

  it('loads saved theme from storage', async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce('dark');

    const { result } = renderHook(() => useTheme(), {
      wrapper: ThemeProvider,
    });

    // Wait for the effect to run
    await act(async () => {
      await Promise.resolve();
    });

    expect(result.current.themeMode).toBe('dark');
    expect(result.current.theme).toEqual(darkTheme);
  });

  it('handles storage errors gracefully', async () => {
    (AsyncStorage.getItem as jest.Mock).mockRejectedValueOnce(new Error('Storage error'));

    const { result } = renderHook(() => useTheme(), {
      wrapper: ThemeProvider,
    });

    // Wait for the effect to run
    await act(async () => {
      await Promise.resolve();
    });

    // Should fall back to light theme
    expect(result.current.themeMode).toBe('light');
    expect(result.current.theme).toEqual(lightTheme);
  });
});
