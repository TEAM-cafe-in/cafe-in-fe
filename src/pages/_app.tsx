import type { AppProps } from 'next/app';
import GlobalStyle from '~/styles/globalStyle';
import CssBaseline from '@mui/material/CssBaseline';

// 글로벌 스타일을 넣어줌
export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyle />
      <CssBaseline />
      <Component {...pageProps} />
    </>
  );
}
