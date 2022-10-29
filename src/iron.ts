import { User } from "@prisma/client";
import { assert } from "console";
import { IncomingMessage } from "http";
import { IronSessionOptions } from "iron-session";
import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult, PreviewData } from "next";
import { UserDto } from "pages/api/users/[id]";
import { env } from "process";
import { ParsedUrlQuery } from "querystring";

if (!process.env.IRON_PASSWORD) throw new Error("Error: could not find IRON_PASSWORD in the environment!");

export const GetIronSessionUserResult: (req: IncomingMessage) => GetServerSidePropsResult<{}> = (req) => {
  const user = req.session.user;

  if (!user) {
    return {
      redirect: {
        destination: '/login'
      },
      props: {}
    };
  }

  const props = {
    user
  };

  return {
    props
  };
};

export const ironOptions: IronSessionOptions = {
  password: process.env.IRON_PASSWORD,
  cookieName: 'sealdo-iron-session',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production'
  }
};

declare module 'iron-session' {
  interface IronSessionData {
    user?: UserDto;
  }
}