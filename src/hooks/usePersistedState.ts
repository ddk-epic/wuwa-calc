import { useEffect, useState } from "react";
import { getItem, setItem } from "@/lib/utils";

export function usePersistedState<T>(key: string, initialValue: T) {
  const [value, setValue] = useState(initialValue);

  // on mount
  useEffect(() => {
    const saved = getItem(key, initialValue);
    if (saved) setValue(saved);
  }, [initialValue, key]);

  useEffect(() => {
    setItem(key, value);
  }, [key, value]);

  return [value, setValue] as const;
}
