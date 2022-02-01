import { useState } from 'react';
import { LocalStoreKey } from '../types';

type TTLValue<T> = {
  value: T;
  expiry: number;
}

/**
 * A hook to use localstorage value with expiry time
 *
 * @param key - a key of type LocalStoreKey
 * @param initialValue - initial value to put in the localstorage
 */
function useLocalStorageTTL<T> (key: LocalStoreKey, initialValue: T, expiry: number) {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState<TTLValue<T> | null>(() => {
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      if (!item) {
        return null;
      }

      const parsed = JSON.parse(item);
      if (parsed && Date.now() > parsed.expiry) {
        localStorage.removeItem(key);
        return null;
      }

      // Parse stored json or if none return initialValue
      return parsed;
    } catch (error) {
      // If error also return initialValue
      console.log(error);
      return {
        value: initialValue,
        expiry: Date.now() + expiry
      };
    }
  });

  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = (value: T) => {
    try {
      const valueToStore: TTLValue<T> = {
        value,
        expiry: Date.now() + expiry
      };

      // Save state
      setStoredValue(valueToStore);
      // Save to local storage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.log(error);
    }
  };

  return [storedValue, setValue] as const;
}

export { useLocalStorageTTL };
