// https://gist.github.com/Mon4ik/2636100f5b74ee14e35cf283700616fe
import { useEffect, useState } from "react";

export default function useLocalStorage<T>(
  key: string,
  defaultValue?: T
): [T | undefined, (value: T) => void] {
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    if (!defaultValue) {
      return;
    }
    const item = localStorage.getItem(key);

    if (!item) {
      localStorage.setItem(key, JSON.stringify(defaultValue));
    }

    setValue(item ? JSON.parse(item) : defaultValue);

    function handler(e: StorageEvent) {
      if (e.key !== key) return;

      const lsi = localStorage.getItem(key);
      setValue(JSON.parse(lsi ?? ""));
    }

    window.addEventListener("storage", handler);

    return () => {
      window.removeEventListener("storage", handler);
    };
  }, [defaultValue, key]);

  const setValueWrap = (value: T) => {
    try {
      setValue(value);

      localStorage.setItem(key, JSON.stringify(value));
      if (typeof window !== "undefined") {
        window.dispatchEvent(new StorageEvent("storage", { key }));
      }
    } catch (e) {
      console.error(e);
    }
  };

  return [value, setValueWrap];
}
