import Layout from "@/components/Layout/Layout";
import { Button } from "carbon-components-react";
import { withIronSessionSsr } from "iron-session/next";
import Link from "next/link";
import { NextPageWithLayout } from "pages/_app";
import { GetIronSessionUserResult, ironOptions } from "src/iron";

const CalendarPage: NextPageWithLayout = () => {
  return (
    <Link href='/' passHref>
      <Button>
        Hello world
      </Button>
    </Link>
  );
};

CalendarPage.getLayout = (page) => {
  return (
    <Layout user={page.props['user']}>
      {page}
    </Layout>
  );
};

export const getServerSideProps = withIronSessionSsr(({ req }) => {
  const user = GetIronSessionUserResult(req);

  return user;
}, ironOptions);

export default CalendarPage;