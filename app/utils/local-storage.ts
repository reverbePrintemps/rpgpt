"use client";
import "client-only";
import { Dispatch, SetStateAction, useState, useEffect } from "react";
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

export const setToLocalStorage = <T extends LocalStorageItemsType["kind"]>({
  kind,
  value,
}: {
  kind: T;
  value: ReturnType<T>;
}): void => {
  localStorage.setItem(kind, JSON.stringify(value));
};

export const useLocalStorage = <T extends LocalStorageItemsType["kind"]>(
  kind: T,
  fallbackValue: ReturnType<T>
) => {
  const [value, setValue] = useState<ReturnType<T>>();

  useEffect(() => {
    setValue(getFromLocalStorage(kind, fallbackValue));
  }, [kind, fallbackValue]);

  return {
    value,
    setValue: (newValue: ReturnType<T>) => {
      setValue(newValue);
      setToLocalStorage({ kind, value: newValue });
    },
  };
};
