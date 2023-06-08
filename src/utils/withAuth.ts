import { NextRequest, NextResponse } from 'next/server';

// 메인 페이지에서 처리하는 미들웨어 함수
// eslint-disable-next-line import/prefer-default-export, consistent-return
export async function withAuth(req: NextRequest) {
  try {
    const url = req.nextUrl.clone();
    url.pathname = '/login';
    // 토큰이 쿠키에 있는 경우
    if (req.cookies.get('refreshToken')) {
      return NextResponse.next();
      // const refreshToken = req.cookies.get('refreshToken');

      // 쿠키에서 refresh token 값 가져와서 access token 받기
      // const token = await getAccessToken(refreshToken?.value);
      // const { accessToken } = token;
      // console.log(accessToken.accessToken);
      // console.log(store.getState().auth);

      // 리덕스에 access_token 값 저장
      // store.dispatch(setToken({ access_token: accessToken }));

      // 사용자 정보 저장 api 통신
      // const user = await getUserData(accessToken, 'USER');
      // console.log(user);

      // 리덕스에 사용자 정보 저장
      // store.dispatch(
      //  setUserData({
      //    isLogged: true,
      //    id: user.memberId,
      //    nickname: user.memberName,
      //    profile_image: user.profile,
      //    email: user.email,
      //  })
      // );
    }
    // 토큰이 쿠키에 없는 경우
    return NextResponse.rewrite(url);
  } catch (err) {
    throw new Error('could not authenticate');
  }
}
