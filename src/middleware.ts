import { NextRequest } from 'next/server';
import { withAuth } from './utils/withAuth';
import { withoutAuth } from './utils/withoutAuth';

// eslint-disable-next-line consistent-return, import/prefer-default-export
export async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  url.pathname = '/login';
  if (req.nextUrl.pathname.startsWith('/login')) {
    return withoutAuth(req);
  }
  if (req.nextUrl.pathname.startsWith('/')) {
    return withAuth(req);
  }
}

export const config = {
  matcher: '/',
};
