import { useState, useEffect, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * Hook for managing state synchronized with AsyncStorage
 * @param key Storage key
 * @param initialValue Initial state value
 * @returns [state, setState, loading, error]
 */
export function useStorageState<T>(
  key: string,
  initialValue: T
): [
  T,
  (value: T | ((prevState: T) => T)) => Promise<void>,
  boolean,
  Error | null
] {
  const [state, setState] = useState<T>(initialValue);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  // Load initial value from storage
  useEffect(() => {
    const loadStoredValue = async () => {
      try {
        setLoading(true);
        const storedValue = await AsyncStorage.getItem(key);

        if (storedValue !== null) {
          setState(JSON.parse(storedValue));
        }
        setError(null);
      } catch (e) {
        setError(
          e instanceof Error
            ? e
            : new Error("Unknown error loading from storage")
        );
        console.error("Error loading from AsyncStorage:", e);
      } finally {
        setLoading(false);
      }
    };

    loadStoredValue();
  }, [key]);

  // Update state and storage
  const updateState = useCallback(
    async (value: T | ((prevState: T) => T)) => {
      try {
        setLoading(true);

        // Update state first (optimistic update)
        const newState = value instanceof Function ? value(state) : value;
        setState(newState);

        // Then update storage
        await AsyncStorage.setItem(key, JSON.stringify(newState));
        setError(null);
      } catch (e) {
        setError(
          e instanceof Error ? e : new Error("Unknown error saving to storage")
        );
        console.error("Error saving to AsyncStorage:", e);
      } finally {
        setLoading(false);
      }
    },
    [key, state]
  );

  return [state, updateState, loading, error];
}
