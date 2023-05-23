import '~/static/font-styles.css';

import React from 'react';

import type { AppProps } from 'next/app';

import { Provider } from 'react-redux';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import GlobalStyle from '~/styles/global-styles';

import wrapper from '~/store';
import queryClient from '~/helpers/QueryClient';
import { ConfigProvider } from '~/helpers/themeConfig';
import ThemeCustomization from '~/themes';

export default function App({ Component, pageProps }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(pageProps);

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ConfigProvider>
          <ThemeCustomization>
            <GlobalStyle />
            <Component {...props} />
            <ReactQueryDevtools initialIsOpen={false} />
          </ThemeCustomization>
        </ConfigProvider>
      </QueryClientProvider>
    </Provider>
  );
}
