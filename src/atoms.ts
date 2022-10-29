import { atom, Atom, SetStateAction, useAtom, WritableAtom } from "jotai";
import { SetAtom } from "jotai/core/atom";
import { atomWithStorage } from "jotai/utils";
import { useEffect, useState } from "react";
import { AvailableThemes } from "./utils/useInitialiseTheme";
import { getUserPreferredTheme } from "./utils/userPreferredSettings";

export const themeAtom = atomWithStorage<AvailableThemes>('theme', getUserPreferredTheme());

export const profileMenuOpenAtom = atom(false);

export const useClientSideAtom = <T>(atom: WritableAtom<T, SetStateAction<T>, void>, defaultValue: T): [T, SetAtom<SetStateAction<T>, void>] => {
  const [atomValue, setAtomValue] = useAtom(atom);

  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    setValue(atomValue);
  }, [atomValue]);

  return [value, setAtomValue];
};