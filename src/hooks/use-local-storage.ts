
"use client";

import { useState, useEffect } from 'react';

function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((val: T) => T)) => void] {
  const [storedValue, setStoredValue] = useState<T>(initialValue);

  // We need to make sure we're on the client before we try to access localStorage
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      try {
        const item = window.localStorage.getItem(key);
        if (item) {
          setStoredValue(JSON.parse(item));
        } else {
          // If no item exists, set the initial value in localStorage
          window.localStorage.setItem(key, JSON.stringify(initialValue));
        }
      } catch (error) {
        console.error(error);
        setStoredValue(initialValue);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, isClient]); // Only run on mount or when key changes


  const setValue = (value: T | ((val: T) => T)) => {
     if (isClient) {
        try {
            const valueToStore = value instanceof Function ? value(storedValue) : value;
            setStoredValue(valueToStore);
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (error) {
            console.log(error);
        }
     }
  };

  return [storedValue, setValue];
}

export default useLocalStorage;
