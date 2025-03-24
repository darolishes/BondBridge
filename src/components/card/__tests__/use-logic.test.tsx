import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import { useLogic } from '../use-logic';
import { ConfigProvider } from '@contexts/ConfigContext';
import { Config } from '@contexts/ConfigContext/types';

const mockConfig = {
  app: {
    NAME: 'BondBridge',
    SLUG: 'bondbridge',
    VERSION: '1.0.0',
    SCHEME: 'bondbridge',
  },
  components: {
    card: {
      dimensions: {
        width: '100%',
        margin: 8,
      },
      animation: {
        flipDuration: 300,
        swipeThreshold: 0.25,
        rotationFactor: 1.5,
      },
      style: {
        borderRadius: 16,
        elevation: 4,
        shadow: {
          color: '#000',
          offset: { width: 0, height: 2 },
          opacity: 0.1,
          radius: 4,
        },
        content: {
          padding: 20,
        },
        loading: {
          height: 100,
          backgroundColor: '#f0f0f0',
        },
      },
    },
  },
} as const;

const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <ConfigProvider config={mockConfig}>{children}</ConfigProvider>;
};

describe('useLogic Hook', () => {
  it('initializes with default values', () => {
    const { result } = renderHook(() => useLogic({ title: 'Test Card' }), {
      wrapper: Wrapper,
    });

    expect(result.current.isFlipped).toBe(false);
    expect(result.current.frontStyle).toBeDefined();
    expect(result.current.backStyle).toBeDefined();
    expect(result.current.cardStyle).toBeDefined();
    expect(result.current.panHandlers).toBeDefined();
    expect(result.current.a11yProps).toBeDefined();
    expect(result.current.titleA11yProps).toBeDefined();
  });

  it('handles flip animation', () => {
    const { result } = renderHook(() => useLogic({ title: 'Test Card', enableFlip: true }), {
      wrapper: Wrapper,
    });

    act(() => {
      result.current.handlePress();
    });

    expect(result.current.isFlipped).toBe(true);

    act(() => {
      result.current.handlePress();
    });

    expect(result.current.isFlipped).toBe(false);
  });

  it('handles loading state', () => {
    const { result } = renderHook(() => useLogic({ title: 'Test Card', isLoading: true }), {
      wrapper: Wrapper,
    });

    expect(result.current.cardStyle).toMatchObject({
      height: mockConfig.components.card.style.loading.height,
      backgroundColor: mockConfig.components.card.style.loading.backgroundColor,
    });
  });

  it('applies custom styles', () => {
    const customStyle = { backgroundColor: 'red' };
    const { result } = renderHook(() => useLogic({ title: 'Test Card', style: customStyle }), {
      wrapper: Wrapper,
    });

    expect(result.current.cardStyle).toMatchObject(customStyle);
  });

  it('handles swipe gestures', () => {
    const onSwipeLeft = jest.fn();
    const onSwipeRight = jest.fn();
    const { result } = renderHook(
      () =>
        useLogic({
          title: 'Test Card',
          enableSwipe: true,
          onSwipeLeft,
          onSwipeRight,
        }),
      { wrapper: Wrapper }
    );

    expect(result.current.panHandlers).toBeDefined();
  });
});
