import { useEffect, useState } from "react";
import { getItem, setItem } from "@/lib/utils";

export function usePersistedState<T>(key: string, initialValue: T) {
  const [value, setValue] = useState(initialValue);

  // on mount
  useEffect(() => {
    let saved = getItem(key, initialValue);
    if (saved) setValue(saved);
  }, []);

  useEffect(() => {
    setItem(key, value);
  }, [value]);

  return [value, setValue] as const;
}
