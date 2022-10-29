import type { AppProps } from 'next/app';
import useInitialiseTheme from 'src/utils/useInitialiseTheme';
import TranslationProvider from '@/components/TranslationProvider';
import Layout from '@/components/Layout/Layout';
import { NextPage } from 'next';
import { ReactElement, ReactNode } from 'react';
import { ToastContainer } from 'react-toastify';

// import 'react-toastify/dist/ReactToastify.css';
import '../styles/globals.scss';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};


type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  useInitialiseTheme();

  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <TranslationProvider>
      {getLayout(<Component {...pageProps} />)}

      {/* <ToastContainer closeButton={false} position='bottom-right' /> */}
    </TranslationProvider>
  );
}

export default MyApp;
