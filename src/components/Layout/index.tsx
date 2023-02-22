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
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icon.png"></link>
        <meta name="theme-color" content="#fff" />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:url" content="https://app.violencetrack.ng" />
        <meta name="twitter:title" content="Election Violence Tracker" />
        <meta
          name="twitter:description"
          content="Report and share Violence Incidence directly on this platform."
        />
        <meta
          name="twitter:image"
          content="https://app.violencetrack.ng/icon-512x512.png"
        />
        <meta name="twitter:creator" content="@DavidWShadow" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Election Violence Tracker" />
        <meta
          property="og:description"
          content="Report and share Violence Incidence directly on this platform."
        />
        <meta property="og:site_name" content="Election Violence Tracker" />
        <meta property="og:url" content="https://app.violencetrack.ng" />
        <meta
          property="og:image"
          content="https://app.violencetrack.ng/icon-512x512.png"
        />
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
