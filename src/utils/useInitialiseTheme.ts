import { useAtom } from "jotai";
import { useEffect } from "react";
import { themeAtom } from "../atoms";

export const availableThemes = ['g10', 'g100'] as const;
export type AvailableThemes = typeof availableThemes[number];
export const defaultTheme: AvailableThemes = 'g10';

export default function useInitialiseTheme() {
  const [theme] = useAtom(themeAtom);

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);
}