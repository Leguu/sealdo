import { AvailableThemes, defaultTheme } from "@/utils/useInitialiseTheme";
import { Logout, Sun, Moon, User } from "@carbon/icons-react";
import { t, Trans } from "@lingui/macro";
import { HeaderPanel, Button, TileGroup, RadioTile } from "carbon-components-react";
import { useRouter } from "next/router";
import { UserDto } from "pages/api/users/[id]";
import React, { useRef } from "react";
import { themeAtom, useClientSideAtom } from "src/atoms";
import { useLocale } from "src/locale";
import { useOnClickOutside } from "usehooks-ts";
import { AvailableLocales } from "../TranslationProvider";

const UserHeaderPanel: React.FC<{
  user: UserDto;
  open: boolean;
  onClose: () => void;
}> = ({ user, open, onClose }) => {
  const router = useRouter();
  const onLogout = async () => {
    await fetch('/api/logout');

    router.push('/login');
  };

  const [theme, setTheme] = useClientSideAtom(themeAtom, defaultTheme);

  const ref = useRef(null);

  useOnClickOutside(ref, onClose);

  const { locale, setLocale } = useLocale();

  return (
    <HeaderPanel ref={ref} expanded={open} aria-label='UserHeaderPanel'>
      <div style={{
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        rowGap: "1rem",
        paddingTop: '2rem',
        paddingBottom: '1rem'
      }}>
        <User height='100px' style={{ width: '100%' }} />

        <h1 style={{ textAlign: 'center' }}>
          {user.name || user.username}
        </h1>

        <div style={{ borderTop: '1px solid', borderBottom: '1px solid', borderColor: 'var(--cds-border-strong-01)' }}>
          <TileGroup
            name="Theme"
            valueSelected={theme}
            onChange={(value) => setTheme(value as AvailableThemes)}
          >
            <RadioTile value='g10'>
              <Sun /> {t`Light Mode`}
            </RadioTile>
            <RadioTile value='g100'>
              <Moon /> {t`Dark Mode`}
            </RadioTile>
          </TileGroup>
        </div>

        <div style={{ borderTop: '1px solid', borderBottom: '1px solid', borderColor: 'var(--cds-border-strong-01)' }}>
          <TileGroup name='Language' valueSelected={locale} onChange={value => setLocale(value as AvailableLocales)}>
            <RadioTile value='en' style={{ display: 'inline-block', width: '50%', minWidth: 'unset' }}>
              EN
            </RadioTile>
            <RadioTile value='fr' style={{ display: 'inline-block', width: '50%', minWidth: 'unset' }}>
              FR
            </RadioTile>
          </TileGroup>
        </div>

        <div style={{ height: '100%' }} />

        <div style={{ marginRight: '0.5rem', marginLeft: '0.5rem' }}>
          <Button style={{ width: '100%' }} renderIcon={Logout} onClick={onLogout}>
            <Trans>
              Sign out
            </Trans>
          </Button>
        </div>
      </div>
    </HeaderPanel>
  );
};

export default UserHeaderPanel;