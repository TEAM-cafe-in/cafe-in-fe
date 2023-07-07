import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { Box } from '@mui/material';
import Cookies from 'universal-cookie';

import { setToken, useAccessTokenSelector } from '~/store/reducers/authSlice';
import { setUserData, useAccessUserSelector } from '~/store/reducers/userSlice';
// Google Maps 페이지

import GoogleMapComponent from '~/components/organism/googleMap';
import { setCookie } from '~/helpers/Cookie';
import wrapper, { AppStore } from '~/store';
import { getAccessToken, getUserData } from './api/user';
import getAllCafeInfo from './api/home/getAllCafeInfo';

const Home = (props: any) => {
  const { accessToken, userData, cafeInfos } = props;
  const user = useAccessUserSelector();
  const token = useAccessTokenSelector();
  const dispatch = useDispatch();
  console.log(cafeInfos);

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
    localStorage.setItem('accessToken', accessToken);
    setCookie('accessToken', accessToken, {});
  }, [accessToken, userData]);

  console.log(user);
  console.log(token);

  return (
    <Box>
      <GoogleMapComponent />
    </Box>
  );
};

export default Home;

export const getServerSideProps = wrapper.getServerSideProps(
  (store: AppStore) => async (context: any) => {
    console.log(store);
    const { req } = context;
    // 서버에서 쿠키값 접근하기
    const cookies = new Cookies(req.headers.cookie);
    const refreshToken = cookies.get('refreshToken');
    // 쿠키에 있는 refresh 토큰값으로 access 토큰 재발급
    const res = await getAccessToken(refreshToken);
    // access 토큰으로 사용자 정보 받아오기
    const user = await getUserData(res.accessToken, 'USER');
    const cafeInfo = await getAllCafeInfo(res.accessToken);
    store.dispatch(cafeInfo);
    return {
      props: {
        accessToken: res.accessToken,
        userData: user,
        cafeInfos: cafeInfo,
      },
    };
  }
);
