import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useCookies } from 'react-cookie';

import { getLoginToken } from '../api/user';

function GooglePage() {
  const router = useRouter();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [cookies, setCookie] = useCookies(['refreshToken']);

  useEffect(() => {
    const url = new URL(window.location.href);
    // url에서 access_token 값 변수에 저장
    let accessToken = url.hash.substring(
      url.hash.indexOf('=') + 1,
      url.hash.indexOf('&token_type')
    );
    console.log(accessToken);

    if (accessToken) {
      const response = getLoginToken(accessToken, 'GOOGLE');

      // promise 객체값 접근
      response.then((res: any) => {
        // jwt access token 리덕스에 저장
        accessToken = res.data.accessToken;
        console.log(accessToken);

        // refresh token은 쿠키로 보관
        const { refreshToken } = res.data;
        console.log(refreshToken);
        setCookie('refreshToken', refreshToken);
        router.push('/');
      });
    }
  }, [router]);
}
export default GooglePage;
