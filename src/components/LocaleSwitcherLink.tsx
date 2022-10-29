import { t } from "@lingui/macro";
import { CSSProperties } from "react";
import { useLocale } from "src/locale";

const LocaleSwitcherLink: React.FC<{
  style?: CSSProperties;
}> = ({ style }) => {
  const { locale, setLocale } = useLocale();

  return (
    <a
      onClick={() => setLocale(locale === 'en' ? 'fr' : 'en')}
      style={{
        ...style,
        cursor: 'pointer',
        textDecoration: 'underline',
      }}>
      {locale === 'fr' ? t`English` : t`French`}
    </a>


  );
};

export default LocaleSwitcherLink;