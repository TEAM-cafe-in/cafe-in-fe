import { QueryClient } from '@tanstack/react-query';
import { GetServerSidePropsContext } from 'next';
import Cookies from 'universal-cookie';

import { Box } from '@mui/material';

import { setToken } from '~/store/reducers/authSlice';
// Google Maps 페이지

import wrapper from '~/store';
import GoogleMapComponent from '~/components/organism/googleMap';
import { CafeInfo } from '~/types/cafeInfo';
import { useDispatch } from 'react-redux';
import { setCafeInfo } from '~/store/reducers/cafeInfoSlice';
import { getAccessToken } from './api/user';
import getAllCafeInfo from './api/home/getAllCafeInfo';

interface HomeProp {
  cafe: CafeInfo;
}
const Home = ({ cafe }: HomeProp) => {
  // 카페 정보 리덕스에 저장
  const dispatch = useDispatch();
  dispatch(setCafeInfo(cafe));
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

    // 쿠키에 있는 refresh 토큰값으로 access 토큰 발급
    const queryClient = new QueryClient();

    const accessTokenResponse = await queryClient.fetchQuery(
      ['accessToken'],
      () => getAccessToken(refreshToken)
    );

    const { accessToken } = accessTokenResponse;

    // store.dispatch를 사용하여 액션을 호출(토큰 정보 저장)
    store.dispatch(setToken({ access_token: accessToken }));

    // 카페정보 SSR로 미리 캐시해두기
    // await queryClient.prefetchQuery(['allCafeIn'], () =>
    //  getAllCafeInfo(accessToken)
    // );
    const cafeInfoResponse = await queryClient.fetchQuery(['allCafeIn'], () =>
      getAllCafeInfo(accessToken)
    );
    return {
      props: {
        cafe: cafeInfoResponse,
      },
    };
  }
);
