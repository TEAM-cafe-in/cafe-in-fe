import { GetServerSidePropsContext } from 'next';

import { Box } from '@mui/material';
import Cookies from 'universal-cookie';

import { setToken, useAccessTokenSelector } from '~/store/reducers/authSlice';
import { setUserData, useAccessUserSelector } from '~/store/reducers/userSlice';
// Google Maps 페이지

import GoogleMapComponent from '~/components/organism/googleMap';
import wrapper from '~/store';

import { getAccessToken, getUserData } from './api/user';

const Home = () => {
  const token = useAccessTokenSelector();
  console.log('리덕스 엑세스 토큰', token);
  const user = useAccessUserSelector();
  console.log('리덕스 사용자 정보', user);

  return (
    <Box>
      <GoogleMapComponent />
    </Box>
  );
};

export default Home;

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context: GetServerSidePropsContext) => {
    const { req } = context;

    // 서버에서 쿠키값 접근하기
    const cookies = new Cookies(req.headers.cookie);
    const refreshToken = cookies.get('refreshToken');

    // 쿠키에 있는 refresh 토큰값으로 access 토큰 재발급
    const res = await getAccessToken(refreshToken);
    const { accessToken } = res;

    // access 토큰으로 사용자 정보 받아오기
    const user = await getUserData(res.accessToken, 'USER');

    // store.dispatch를 사용하여 액션을 호출(토큰과 사용자 정보 저장)
    store.dispatch(setToken({ access_token: accessToken }));
    store.dispatch(
      setUserData({
        isLoggedIn: true,
        email: user.email,
        memberId: user.memberId,
        memberName: user.memberName,
        profile: user.profile,
        role: user.role,
      })
    );

    return {
      props: {},
    };
  }
);
