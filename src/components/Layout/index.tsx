import { Box } from '@chakra-ui/react';
import Head from 'next/head';
import Footer from './Footer';
import Header from './Header';

export default function Layout({ children }: { children: JSX.Element }) {
  return (
    <Box>
      <Head>
        <title>Report and Share Electoral Violence Incidents</title>
        <meta
          name="description"
          content="Report and Share voilence incidence."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box>
        <Header />
        <Box height={`120px`} />
        {children}
        <Footer />
      </Box>
    </Box>
  );
}
