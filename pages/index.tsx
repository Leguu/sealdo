import Layout from '@/components/Layout/Layout';
import { Trans } from '@lingui/macro';
import { Button, Link as CarbonLink, TextInput, ToastNotification } from 'carbon-components-react';
import { withIronSessionSsr } from 'iron-session/next';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { GetIronSessionUserResult as getIronSessionUserResult, ironOptions } from 'src/iron';
import { UserDto } from './api/users/[id]';
import { NextPageWithLayout } from './_app';

interface Props {
  user: UserDto;
}

const HomePage: NextPageWithLayout<Props> = ({ user }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', rowGap: '1rem' }}>
      <Button onClick={() => {
        toast(({ closeToast }) => (
          <ToastNotification
            title='Hello world!'
            onCloseButtonClick={closeToast}
          />
        ));
      }}>
        <Trans>Create toast</Trans>
      </Button>

      <Button onClick={() => {
        toast(({ closeToast }) => (
          <ToastNotification
            title='Hello world!'
            onCloseButtonClick={closeToast}
          />
        ));
      }}>
        <Trans>Create toast</Trans>
      </Button>

      <Link href='/calendar' passHref>
        <CarbonLink>
          Test?
        </CarbonLink>
      </Link>

      <TextInput
        id={''}
        labelText={'Some Date!'}
        inline
        type='date'
      />

      <TextInput
        id={''}
        labelText={'Some Time!'}
        inline
        type='time'
      />
    </div>
  );
};

HomePage.getLayout = (page) => {
  return (
    <Layout user={page.props['user']}>
      {page}
    </Layout>
  );
};

export const getServerSideProps = withIronSessionSsr(async ({ req }) => {
  const user = getIronSessionUserResult(req);

  return user;
}, ironOptions);

export default HomePage;
