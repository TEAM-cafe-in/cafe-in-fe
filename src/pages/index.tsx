import Head from 'next/head';

// 기존 프로젝트 생성 시 있는 style 폴더 삭제했기 때문에 import 수정

export default function Home() {
  return (
    <div>
      <Head>
        <title>setting-practice</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>Home</div>
    </div>
  );
}
