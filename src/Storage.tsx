import { useEffect, useState } from "react";

export const Storage = <T,>(key: string): ReturnType<any> => {
  // initialize the value from localStorage
  const [currentValue, setCurrentValue] = useState<any>(() =>
    {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value):undefined;
    }
  );

  // on every render, re-subscribe to the storage event
  useEffect(() => {
    const handler = (e: StorageEvent) => {
      if (e.storageArea === localStorage && e.key === key) {
        setCurrentValue(e.newValue);
      }
    };
    window.addEventListener('storage', handler);
    return () => {
      window.removeEventListener('storage', handler);
    };
  });

  // update localStorage when the currentValue changes via setCurrentValue
  useEffect(() => {
    if (currentValue) {
      localStorage.setItem(key, JSON.stringify(currentValue));
    }
  }, [key, currentValue]);

  // use as const to tell TypeScript this is a tuple
  return [currentValue, setCurrentValue] as const;
};