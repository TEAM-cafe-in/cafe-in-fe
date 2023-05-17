import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';
import { ServerStyleSheets } from '@mui/styles';

// 여기 파일에 css를 미리 적용하면 css 로딩이 늦어 깜빡이는 현상을 방지
// styled-components랑 mui가 nextjs에서 서버렌더링 작동하도록 설정

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
MyDocument.getInitialProps = async (ctx) => {
  // ServerStyleSheet을 이용하여 인스턴스 생성
  const sheet = new ServerStyleSheet();
  // ServerStyleSheets을 이용하여 인스턴스 생성
  const materialSheets = new ServerStyleSheets();
  const originalRenderPage = ctx.renderPage;
  try {
    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App) => (props) =>
          // 지정한 컴포넌트 <App />의 스타일 요소를 검색하고 그 스타일을 <style /> 태그로 추출
          // sheet.collectStyles(<App {...props} />),
          sheet.collectStyles(materialSheets.collect(<App {...props} />)),
      });
    // 추출한 결과물은 Document에 전달
    const initialProps = await Document.getInitialProps(ctx);
    return {
      ...initialProps,
      styles: (
        <>
          {initialProps.styles}
          {sheet.getStyleElement()}
        </>
      ),
    };
  } finally {
    sheet.seal();
  }
};
