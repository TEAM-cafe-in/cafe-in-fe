/* eslint-disable react/button-has-type */
import Cookies from 'universal-cookie';
import { setToken, useAccessTokenSelector } from '~/store/reducers/authSlice';
import { setUserData, useAccessUserSelector } from '~/store/reducers/userSlice';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { getAccessToken, getUserData, getLogout } from './api/user';

export default function Home(props: any) {
  const { accessToken, userData } = props;
  const user = useAccessUserSelector();
  const token = useAccessTokenSelector();
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    dispatch(setToken({ access_token: accessToken }));
    dispatch(
      setUserData({
        isLoggedIn: true,
        email: userData.email,
        memberId: userData.memberId,
        memberName: userData.memberName,
        profile: userData.profile,
        role: userData.role,
      })
    );
  }, [accessToken, userData]);

  console.log(user);
  console.log(token);

  // 로그아웃 클릭 핸들러
  const logoutClickHandler = async (): Promise<void> => {
    dispatch(
      setUserData({
        isLoggedIn: false,
        email: '',
        memberId: 0,
        memberName: '',
        profile: '',
        role: '',
      })
    );
    const logout = await getLogout(token);
    if (logout) {
      alert('로그아웃되었습니다');
      router.push('/login');
    } else {
      alert('로그아웃 실패하였습니다');
    }
  };
  return (
    <div>
      <h1>cafe in</h1>
      {user.isLoggedIn && (
        <button onClick={logoutClickHandler}>로그아웃</button>
      )}
    </div>
  );
}
export const getServerSideProps = async (context: any) => {
  const { req } = context;
  // 서버에서 쿠키값 접근하기
  const cookies = new Cookies(req.headers.cookie);
  const refreshToken = cookies.get('refreshToken');
  // 쿠키에 있는 refresh 토큰값으로 access 토큰 재발급
  const res = await getAccessToken(refreshToken);
  // access 토큰으로 사용자 정보 받아오기
  const user = await getUserData(res.accessToken, 'USER');

  return {
    props: {
      accessToken: res.accessToken,
      userData: user,
    },
  };
};
