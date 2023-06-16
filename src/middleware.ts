import { NextRequest } from 'next/server';
import { withAuth } from './helpers/withAuth';
import { withoutAuth } from './helpers/withoutAuth';

// eslint-disable-next-line consistent-return, import/prefer-default-export
export async function middleware(req: NextRequest) {
  // 로그인 페이지에서 미들웨어 처리
  if (req.nextUrl.pathname.startsWith('/login')) {
    return withoutAuth(req);
  }
  // 메인페이지에서 미들웨어 처리
  if (req.nextUrl.pathname.startsWith('/')) {
    return withAuth(req);
  }
}

export const config = {
  matcher: '/',
};
