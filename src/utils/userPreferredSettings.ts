import { defaultLocale, availableLocales, AvailableLocales } from "@/components/TranslationProvider";
import { AvailableThemes } from "./useInitialiseTheme";

export const getUserPreferredTheme = (): AvailableThemes => {
  if (typeof window === 'undefined') {
    return 'g100';
  }

  const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;

  return prefersDarkMode ? 'g100' : 'g10';
};