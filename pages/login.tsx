import { InlineTextInput } from '@/components/InlineTextInput/InlineTextInput';
import { Button, ButtonSet, Checkbox, Column, Content, Form, Grid, InlineLoading, InlineNotification, Link as CarbonLink, Loading, PasswordInput, Row, TextInput, Tile, ToastNotification } from 'carbon-components-react';
import type { NextPage } from 'next';
import Link from 'next/link';
import React, { CSSProperties, PropsWithoutRef, useEffect, useMemo, useState } from 'react';

import ThoughtProcess from "@/assets/thought_process.svg";
import Image from 'next/image';
import { ArrowRight, Json, UserData } from '@carbon/icons-react';
import { useMediaQuery } from 'usehooks-ts';
import { t, Trans } from '@lingui/macro';
import { UserDto } from './api/users/[id]';
import { AvailableLocales, defaultLocale } from '@/components/TranslationProvider';
import { useAtom } from 'jotai';
import { HtmlProps } from 'next/dist/shared/lib/html-context';
import { useLocale } from 'src/locale';
import { useRouter } from 'next/router';
import { StatusCodes } from 'http-status-codes';
import { setTimeout } from 'timers';
import { withIronSessionSsr } from 'iron-session/next';
import { ironOptions } from 'src/iron';
import LocaleSwitcherLink from '@/components/LocaleSwitcherLink';

const LoginPage: NextPage = () => {
  const router = useRouter();

  const Divider = (props: { style?: CSSProperties; }) => (
    <div style={{ width: '100%', height: '1px', backgroundColor: 'var(--cds-border-strong-01)', ...props.style }} />
  );

  const sideAreaWidth = '30rem';
  const imageWidth = `calc(600px + ${sideAreaWidth})`;

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [credentialPresent, setCredentialPresent] = useState(false);

  const [loadingStatus, setLoadingStatus] = useState<'active' | 'finished' | 'error'>();
  const disabled = Boolean(loadingStatus) && loadingStatus !== 'error';

  const onLogin = async () => {
    setLoadingStatus('active');

    const res = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: {
        'Content-Type': "application/json"
      }
    });


    if (res.status === StatusCodes.UNAUTHORIZED || res.status === StatusCodes.NOT_FOUND) {
      setLoadingStatus('error');
      return;
    };

    setLoadingStatus('finished');

    setTimeout(() => router.push('/'), 3000);
  };

  const Credentials = <>
    <p style={{ marginTop: 'var(--cds-spacing-02)' }}>
      <Trans>
        {`Your online university planner. Don't have an account?`} <Link href='/register'>Register</Link>
      </Trans>
    </p>

    <Divider style={{ marginTop: 'var(--cds-spacing-08)' }} />

    <div style={{ marginTop: 'var(--cds-spacing-05)' }}>
      <TextInput
        id={'username'}
        labelText={t`Continue with credentials`}
        placeholder={t`Username`}
        autoFocus
        value={username}
        onChange={e => setUsername(e.target.value)}
        disabled={disabled}
        required
      />
    </div>

    <Button
      renderIcon={ArrowRight}
      style={{ width: '100%', maxWidth: 'unset', marginTop: 'var(--cds-spacing-04)' }}
      type='submit'
      disabled={disabled}
    >
      <Trans>Continue</Trans>
    </Button>
  </>;


  const Password = <>
    <p style={{ marginTop: 'var(--cds-spacing-02)' }}>
      <Trans>
        Logging in as {username}. <a onClick={() => setCredentialPresent(false)} style={{ textDecoration: 'underline', cursor: 'pointer' }}>Not you?</a>
      </Trans>
    </p>

    <Divider style={{ marginTop: 'var(--cds-spacing-07)' }} />

    <div style={{ marginTop: 'var(--cds-spacing-05)' }}>
      <PasswordInput
        disabled={disabled}
        id={'password'}
        labelText={t`Password`}
        placeholder={t`Password`}
        type='password'
        required
        autoFocus
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
    </div>

    <div style={{ marginTop: 'var(--cds-spacing-04)' }}>
      {(loadingStatus && loadingStatus !== 'error') ? (
        <InlineLoading
          description={
            loadingStatus === 'active' ? t`Logging you in...` :
              loadingStatus === 'finished' ? t`Logged in! Redirecting you to dashboard` :
                t`Error logging you in`
          }
          status={loadingStatus}
        />
      ) : (
        <Button
          disabled={disabled}
          renderIcon={ArrowRight}
          style={{ width: '100%', maxWidth: 'unset' }}
          type='submit'
        >
          <Trans>Log in</Trans>
        </Button>
      )}
    </div>
  </>;

  return (
    <div className='grid'>
      <Form
        onSubmit={(e) => {
          e.preventDefault();

          if (!credentialPresent) {
            setCredentialPresent(true);
          } else {
            onLogin();
          }
        }}
      >
        <Content className='content' style={{
        }}>
          <h1><Trans>Log in to Sealdo</Trans></h1>

          {!credentialPresent ? Credentials : Password}

          {loadingStatus === 'error' && <>
            <Divider style={{ marginTop: 'var(--cds-spacing-07)' }} />

            <InlineNotification
              kind={'error'}
              title={t`Incorrect username and / or password`}
              onCloseButtonClick={() => setLoadingStatus(undefined)}
              style={{ marginTop: 'var(--cds-spacing-05)' }}
            />
          </>}

          <Divider style={{ marginTop: 'var(--cds-spacing-07)' }} />

          <LocaleSwitcherLink style={{
            display: 'block',
            textAlign: 'right',
            width: '100%',
            marginTop: 'var(--cds-spacing-05)'
          }} />
        </Content>
      </Form>

      <div className='image' style={{
        alignItems: 'end',
        justifyContent: 'right',
        paddingRight: '1rem',
        paddingBottom: '1rem',
        overflow: 'hidden'
      }}>
        <Image priority src={ThoughtProcess} alt={t`Login image`} />
      </div>

      <style jsx>{`
      .grid {
        display: grid;
        grid-template-columns: ${sideAreaWidth} 1fr;
        height: 100%;
      }

      .image {
        display: flex;
      }
      
      .content {
        min-width: ${sideAreaWidth};
      }

      @media (max-width: ${imageWidth}) {
        .grid {
          grid-template-columns: auto;
        }
        
        .image {
          display: none;
        }
      }
      `}</style>
    </div >

  );
};

export const getServerSideProps = withIronSessionSsr(({ req }) => {
  const user = req.session.user;


  if (user !== undefined) {
    return {
      redirect: {
        destination: '/'
      },
      props: {}
    };
  }

  return {
    props: {}
  };
}, ironOptions);

export default LoginPage;
