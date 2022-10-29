import Layout from '@/components/Layout/Layout';
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

const AddTermPage: NextPageWithLayout<Props> = ({ user }) => {
  return (
    <div>
      <TextInput
        id="name"
        labelText="Name"
      />

      <TextInput
        id="from"
        labelText="From"
        type='date'
      />

      <TextInput
        id="to"
        labelText="To"
        type='date'
      />
    </div>
  );
};

AddTermPage.getLayout = (page) => {
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

export default AddTermPage;
