import Head from 'next/head';
import Image from 'next/image';

import styles from '@/styles/Home.module.css';
import { Box, Text } from '@chakra-ui/react';

export default function Home() {
  return (
    <Box>
      <Head>
        <title>Report and Share voilence incidence.</title>
        <meta
          name="description"
          content="Report and Share voilence incidence."
        />
        <link rel="icon" href="/favicon.ico" />
        <link rel="fonts" href="/src/styles/globals.css" />
      </Head>

      <Text>Landing Page</Text>
    </Box>
  );
}
