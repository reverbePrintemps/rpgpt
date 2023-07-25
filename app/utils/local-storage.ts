"use client";
import "client-only";
import { Theme } from "../constants/theme";
import { TokenUsage } from "../types";

export enum LocalStorageItems {
  TokenUsage = "token-usage",
  Theme = "theme",
}

type LocalStorageItemsType =
  | {
      kind: LocalStorageItems.TokenUsage;
      value: TokenUsage;
    }
  | {
      kind: LocalStorageItems.Theme;
      value: Theme;
    };

type ReturnType<T extends LocalStorageItemsType["kind"]> =
  T extends LocalStorageItems.TokenUsage
    ? TokenUsage
    : T extends LocalStorageItems.Theme
    ? Theme
    : never;

export const getFromLocalStorage = <T extends LocalStorageItemsType["kind"]>(
  item: T
): ReturnType<T> | null => {
  const storedValue = localStorage.getItem(item);
  return storedValue ? (JSON.parse(storedValue) as ReturnType<T>) : null;
};

export const setToLocalStorage = (item: LocalStorageItemsType) => {
  localStorage.setItem(item.kind, JSON.stringify(item.value));
};

// * Leaving this here for now as it might be useful when tackling issue with window being undefined.

// export const useLocalStorage = <T extends LocalStorageItemsType["kind"]>(
//   item: T,
//   fallbackValue: ReturnType<T>
// ): [ReturnType<T>, Dispatch<SetStateAction<ReturnType<T>>>] => {
//   const [value, setValue] = useState<ReturnType<T>>(fallbackValue);

//   useEffect(() => {
//     if (window.localStorage) setValue(getFromLocalStorage(item));
//   }, [window]);

//   useEffect(() => {
//     const stored = getFromLocalStorage(item);
//     setValue(stored ? JSON.parse(stored) : fallbackValue);
//   }, [item, fallbackValue]);

//   useEffect(() => {
//     setToLocalStorage({ kind: item, value: JSON.stringify(value) });
//   }, [item, value]);

//   return [value, setValue];
// };
