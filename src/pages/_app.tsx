import React from 'react';

import type { AppProps } from 'next/app';

import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import GlobalStyle from '~/styles/global-styles';

import wrapper from '~/store';

export default function App({ Component, pageProps }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(pageProps);
  // 이렇게 해야 서로 다른 사용자와 요청 사이에 데이터가 공유되지 않는다.
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    // react query로는 서버데이터를 관리하므로 redux보다 상위에 위치해 두었습니다
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <GlobalStyle />
        <Component {...props} />
      </Provider>
    </QueryClientProvider>
  );
}
