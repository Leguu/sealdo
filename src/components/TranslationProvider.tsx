import { i18n } from '@lingui/core';
import { ReactNode, useEffect } from 'react';
import { I18nProvider } from '@lingui/react';
import { useAtom } from 'jotai';

export const availableLocales = ['en', 'fr'] as const;
export type AvailableLocales = typeof availableLocales[number];
export const defaultLocale: AvailableLocales = 'en';

import { messages as frMessages } from 'locales/fr';
import { messages as enMessages } from 'locales/en';
i18n.load({
  'en': enMessages,
  'fr': frMessages
});
i18n.activate(defaultLocale);

import { en, fr } from "make-plural/plurals";
import { useLocale } from 'src/locale';
i18n.loadLocaleData('en', { plurals: en });
i18n.loadLocaleData('fr', { plurals: fr });

const TranslationProvider: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  const { locale, setLocale } = useLocale();

  useEffect(() => {
    i18n.activate(locale);
  }, [locale]);

  return (
    <I18nProvider i18n={i18n}>
      {children}
    </I18nProvider>
  );
};

export default TranslationProvider;