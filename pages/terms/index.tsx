import Layout from '@/components/Layout/Layout';
import { Add } from '@carbon/icons-react';
import { Term } from '@prisma/client';
import { Button, Link as CarbonLink, TextInput, ToastNotification } from 'carbon-components-react';
import { withIronSessionSsr } from 'iron-session/next';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { GetIronSessionUserResult as getIronSessionUserResult, ironOptions } from 'src/iron';
import { UserDto } from '../api/users/[id]';
import { NextPageWithLayout } from '../_app';

interface Props {
  user: UserDto;
}

const TermsPage: NextPageWithLayout<Props> = ({ user }) => {
  const [terms, setTerms] = useState<Term[]>();

  useEffect(() => {
    const fetcher = async () => {
      const termsFetched = await (await fetch("/api/terms")).json();

      setTerms(termsFetched);
    };
    fetcher();
  }, []);

  return (
    <div>
      {terms === undefined && (
        "Loading!!..."
      )}
      <Link href='/terms/add'>
        <Button renderIcon={Add}>
          Add Term
        </Button>
      </Link>
    </div>
  );
};

TermsPage.getLayout = (page) => {
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

export default TermsPage;
