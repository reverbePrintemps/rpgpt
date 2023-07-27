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
  item: T,
  fallbackValue: ReturnType<T>
): ReturnType<T> => {
  const storedValue = localStorage.getItem(item);
  return storedValue ? JSON.parse(storedValue) : fallbackValue;
};

export const setToLocalStorage = (item: LocalStorageItemsType) => {
  localStorage.setItem(item.kind, JSON.stringify(item.value));
};

// * Been going back and forth between using this custom function and https://usehooks-ts.com/react-hook/use-local-storage

// export const useLocalStorage = <T extends LocalStorageItemsType["kind"]>(
//   item: T,
//   fallbackValue: ReturnType<T>
// ): [ReturnType<T>, Dispatch<SetStateAction<ReturnType<T>>>] => {
//   const [value, setValue] = useState<ReturnType<T>>(fallbackValue);

//   useEffect(() => {
//     if (typeof window === "undefined") return;
//     getFromLocalStorage(item, fallbackValue);
//   }, [item, fallbackValue]);

//   useEffect(() => {
//     if (typeof window === "undefined") return;
//     setToLocalStorage({ kind: item, value } as LocalStorageItemsType);
//   }, [item, value]);

//   return [value, setValue];
// };
