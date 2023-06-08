import '~/static/font-styles.css';

import React from 'react';

import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';

import { Provider } from 'react-redux';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import GlobalStyle from '~/styles/global-styles';

import wrapper from '~/store';
import queryClient from '~/helpers/QueryClient';
import { ConfigProvider } from '~/helpers/themeConfig';
import ThemeCustomization from '~/themes';
import EmptyLayout from '~/components/templates/EmptyLayout';
import MainLayout from '~/components/templates/MainLayout';

const App = ({ Component, pageProps }: AppProps) => {
  const { store, props } = wrapper.useWrappedStore(pageProps);
  const router = useRouter();

  // 권한 체크 후 동적 layout 적용
  const DynamicLayout = router.pathname === '/login' ? EmptyLayout : MainLayout;

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ConfigProvider>
          <ThemeCustomization>
            <GlobalStyle />
            <DynamicLayout>
              <Component {...props} />
            </DynamicLayout>
            <ReactQueryDevtools initialIsOpen={false} />
          </ThemeCustomization>
        </ConfigProvider>
      </QueryClientProvider>
    </Provider>
  );
};

export default App;
