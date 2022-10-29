import { InlineTextInput } from '@/components/InlineTextInput/InlineTextInput';
import { Button, ButtonSet, Checkbox, Column, Content, Form, Grid, InlineLoading, InlineNotification, Link as CarbonLink, PasswordInput, Row, TextInput, Tile } from 'carbon-components-react';
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
import { regexEscape } from '@/utils/regexEscape';
import { useRouter } from 'next/router';
import { useLocale } from 'src/locale';
import { passwordRegex, passwordRegexDescription, usernameRegex, usernameRegexDescription } from 'src/validations';
import LocaleSwitcherLink from '@/components/LocaleSwitcherLink';

const RegisterPage: NextPage = () => {
  const Divider = (props: { style?: CSSProperties; }) => (
    <div style={{ width: '100%', height: '1px', backgroundColor: 'var(--cds-border-strong-01)', ...props.style }} />
  );

  const router = useRouter();

  const sideAreaWidth = '30rem';
  const imageWidth = `calc(600px + ${sideAreaWidth})`;

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');


  const [loadingStatus, setLoadingStatus] = useState<'active' | 'finished' | 'error'>();
  const disabled = Boolean(loadingStatus) && loadingStatus !== 'error';

  const onRegister = async () => {
    setLoadingStatus('active');

    const res = await fetch('/api/register', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: {
        'Content-Type': "application/json"
      }
    });

    if (!res.ok) {
      setLoadingStatus('error');
      return;
    };

    setLoadingStatus('finished');

    setTimeout(() => router.push('/login'), 2000);
  };

  return (
    <div className='grid'>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          onRegister();
        }}
      >
        <Content className='content'>
          <h1><Trans>Register for Sealdo</Trans></h1>

          <p style={{ marginTop: 'var(--cds-spacing-02)' }}>
            <Trans>
              {`Your online university planner. Already have an account?`} <Link href='/login' passHref>Log in</Link>
            </Trans>
          </p>

          <Divider style={{ marginTop: 'var(--cds-spacing-07)' }} />

          <div style={{ marginTop: 'var(--cds-spacing-05)' }}>
            <TextInput
              disabled={disabled}
              id={'username'}
              labelText={t`Input your Username`}
              pattern={usernameRegex.source}
              placeholder={t`Username`}
              helperText={usernameRegexDescription}
              title={usernameRegexDescription}
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
            />
          </div>

          <div style={{ marginTop: 'var(--cds-spacing-06)' }}>
            <PasswordInput
              disabled={disabled}
              id={'password'}
              labelText={t`Password`}
              placeholder={t`Password`}
              type='password'
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              pattern={passwordRegex.source}
              title={passwordRegexDescription}
              helperText={passwordRegexDescription}
            />
          </div>

          <div style={{ marginTop: 'var(--cds-spacing-03)' }}>
            <PasswordInput
              disabled={disabled}
              id={'password-repeat'}
              labelText={t`Repeat Password`}
              title={t`Passwords have to match`}
              placeholder={t`Password`}
              type='password'
              required
              pattern={regexEscape(password)}
            />
          </div>


          <div style={{ marginTop: 'var(--cds-spacing-06)' }}>
            {(loadingStatus && loadingStatus !== 'error') ? (
              <InlineLoading
                description={
                  loadingStatus === 'active' ? t`Registering...` :
                    loadingStatus === 'finished' ? t`Registerd succesfully! Redirecting you to login...` :
                      t`Error registering`
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
                <Trans>Sign up</Trans>
              </Button>
            )}
          </div>

          {loadingStatus === 'error' && <>
            <Divider style={{ marginTop: 'var(--cds-spacing-07)' }} />

            <InlineNotification
              kind={'error'}
              title={t`That username is already in use`}
              onCloseButtonClick={() => setLoadingStatus(undefined)}
              style={{ marginTop: 'var(--cds-spacing-05)' }}
            />
          </>}

          <Divider style={{ marginTop: 'var(--cds-spacing-07)' }} />

          <LocaleSwitcherLink style={{
            display: 'block',
            textAlign: 'right',
            cursor: 'pointer',
            textDecoration: 'underline',
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

export default RegisterPage;
