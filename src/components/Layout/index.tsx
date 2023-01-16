import { Box } from '@chakra-ui/react';
import Header from './Header';
import Footer from './Footer';
import Head from 'next/head';
import MarqueeHeader from './MarqueeHeader';

export default function Layout({ children }: { children: JSX.Element }) {
  return (
    <Box>
      <Head>
        <title>Report and Share voilence incidence.</title>
        <meta
          name="description"
          content="Report and Share voilence incidence."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box>
        <Header />
        <Box height={`169px`} />
        {children}
        <Footer />
      </Box>
    </Box>
  );
}
