/**
 * @createdBy 한수민
 * @description 구글 로그인 구현
 */

import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { setCookie } from '~/helpers/cookie';
import { setToken } from '~/store/reducers/authSlice';
import { getLoginToken } from '../api/user';

function GooglePage() {
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    const url = new URL(window.location.href);
    // url에서 access_token 값 변수에 저장
    let accessToken = url.hash.substring(
      url.hash.indexOf('=') + 1,
      url.hash.indexOf('&token_type')
    );

    if (accessToken) {
      // 구글 서버로부터 받은 access token으로 jwt 토큰 access token, refresh token 받기
      const response = getLoginToken(accessToken, 'GOOGLE');

      // promise 객체값 접근
      response.then((res: any) => {
        // jwt access token 리덕스에 저장
        accessToken = res.data.accessToken;
        dispatch(setToken({ access_token: accessToken }));

        // refresh 토큰값과 토큰의 만료시간 쿠키에 저장
        const expire = new Date(res.data.refreshTokenExpireTime).getTime();
        setCookie('refreshToken', res.data.refreshToken, {
          maxAge: expire,
          expire: 0,
        });
        // 로그인이 완료되면 메인으로 라우트
        router.push('/');
      });
    }
  }, [router]);
}
export default GooglePage;
