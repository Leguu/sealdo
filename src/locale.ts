import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { AvailableLocales, availableLocales, defaultLocale } from "./components/TranslationProvider";

export const useLocale = () => {
  const { replace, pathname, asPath, query, locales, locale: routerLocale } = useRouter();

  const setLocale = (locale: AvailableLocales) => {
    Cookies.set('NEXT_LOCALE', locale, { sameSite: 'Strict' });
    replace({ pathname, query }, asPath, { locale, shallow: true });
  };

  let locale = defaultLocale;

  if (routerLocale) {
    for (const availableLocale of availableLocales) {
      if (routerLocale.includes(availableLocale)) locale = availableLocale;
    }
  }

  return { locale, setLocale };
};