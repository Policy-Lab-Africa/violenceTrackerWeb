import type { AppProps } from 'next/app';
import '@/styles/globals.css';
import { ChakraProvider } from '@chakra-ui/react';
import customTheme from '@/themes';
import Layout from '@/components/Layout';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import TagManager from 'react-gtm-module';

import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { AxiosError } from 'axios';
import { useEffect } from 'react';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      useErrorBoundary: (error) => {
        const aError = error as AxiosError;
        if (aError.response) {
          return aError.response?.status >= 500;
        }
        return false;
      },
    },
  },
});

export default function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    TagManager.initialize({ gtmId: `G-XV8HGX4YGD` });
  }, []);

  return (
    <ChakraProvider theme={customTheme}>
      <QueryClientProvider client={queryClient}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ChakraProvider>
  );
}
