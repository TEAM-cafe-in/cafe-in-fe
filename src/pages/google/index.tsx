import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUserData } from '~/store/reducers/userSlice';
import { getLoginToken, getUserData } from '../api/user';

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
      const response = getLoginToken(accessToken, 'GOOGLE');
      response.then((res: any) => {
        accessToken = res.data.accessToken;
        const userData = getUserData(accessToken, 'USER');
        window.localStorage.setItem('accessToken', accessToken);
        console.log(userData);
        userData.then((user: any) => {
          dispatch(
            setUserData({
              isLogged: true,
              id: user.data.memberId,
              nickname: user.data.memberName,
              profile_image: user.data.profile,
              email: user.data.email,
            })
          );
        });
        router.push('/');
      });
    }
  }, [router]);
}
export default GooglePage;
