import { QueryClient, dehydrate } from '@tanstack/react-query';
import { GetServerSidePropsContext } from 'next';
import Cookies from 'universal-cookie';

import { Box } from '@mui/material';

import { setToken } from '~/store/reducers/authSlice';
// Google Maps 페이지
import wrapper from '~/store';
import GoogleMapComponent from '~/components/organism/googleMap';
import { setCookie } from '~/helpers/cookie';
import { getAccessToken } from './api/user';
import getAllCafeInfo from './api/home/getAllCafeInfo';

const Home = () => {
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

    /// / store.dispatch를 사용하여 액션을 호출(토큰 정보 저장)
    if (accessToken) {
      store.dispatch(setToken({ access_token: accessToken }));
      setCookie('accessToken', accessToken, {});
      // cookies.set('accessToken', accessToken);
    }

    // 카페정보 SSR로 미리 캐시해두기
    await queryClient.prefetchQuery(['cafeList'], () => getAllCafeInfo());

    return {
      props: {
        dehydratedProps: dehydrate(queryClient),
      },
    };
  }
);
