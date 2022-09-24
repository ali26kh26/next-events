import Head from "next/head";
import Layout from "../components/layout/layout";
import NotificationProvider from "../store/NotificationProvider";
import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import ModalProvider from "../store/modalProvider";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <NotificationProvider>
        <ModalProvider>
          <Layout>
            <Head>
              <title>Next Events</title>
              <meta name="description" content="NextJS Events" />
              <meta
                name="viewport"
                content="initial-scale=1.0, width=device-width"
              />
            </Head>
            <Component {...pageProps} />
          </Layout>
        </ModalProvider>
      </NotificationProvider>
    </SessionProvider>
  );
}

export default MyApp;
