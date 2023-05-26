import React, { useEffect } from 'react';

import type { AppProps } from 'next/app';

import { Provider } from 'react-redux';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import GlobalStyle from '~/styles/global-styles';

import wrapper from '~/store';
import queryClient from '~/helpers/QueryClient';

declare global {
  // window 안에 Kakao라는 객체가 있다고 미리 알려주는 것
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Kakao: any;
  }
}
export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // 카카오 로그인 할 때 Javascript SDK 초기화 함수 추가
    //  app 최상단에 useEffext 로 init
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_KEY);
    }
  }, []);

  const { store, props } = wrapper.useWrappedStore(pageProps);

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <GlobalStyle />
        <Component {...props} />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </Provider>
  );
}
