import React from 'react';

import '~/styles/globals.css';
import type { AppProps } from 'next/app';

import { Provider } from 'react-redux';
import {
  QueryClient,
  QueryClientProvider,
  Hydrate,
} from '@tanstack/react-query';

import wrapper from '~/store';

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = React.useState(() => new QueryClient());
  const { store, props } = wrapper.useWrappedStore(pageProps);

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedProps}>
        <Provider store={store}>
          <Component {...props} />
        </Provider>
      </Hydrate>
    </QueryClientProvider>
  );
}
