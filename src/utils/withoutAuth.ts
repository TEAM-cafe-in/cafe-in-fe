import { NextRequest, NextResponse } from 'next/server';

// 로그인 페이지에서 처리하는 미들웨어 함수
// eslint-disable-next-line import/prefer-default-export
export async function withoutAuth(req: NextRequest) {
  try {
    const url = req.nextUrl.clone();
    url.pathname = '/';
    // 토큰이 있는 경우 => 이미 로그인이 되어있는 경우
    if (req.cookies.get('refreshToken')) {
      return NextResponse.rewrite(url);
    }
    // 토큰이 없는 경우 => 딱히 처리할 필요 x
    return NextResponse.next();
  } catch (err) {
    throw new Error('could not authenticate');
  }
}
