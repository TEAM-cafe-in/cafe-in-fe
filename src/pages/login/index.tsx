/**
 * @createdBy 한수민
 * @description 카카오톡 로그인 기능과 로그인 페이지 구성
 */

import Image from 'next/image';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

import { useDispatch } from 'react-redux';
import { setToken } from '~/store/reducers/authSlice';
import { setCookie } from '~/helpers/Cookie';
import { GoogleButton, KakaoButton } from '../../components/atom/buttons';
import { getLoginToken } from '../api/user';
import image from './img/cafe-in-logo.png';

const MyArrowBackIosNewIcon = styled(ArrowBackIosNewIcon)`
  margin-left: 20%;
  margin-top: 15px;
  @media (max-width: 768px) {
    margin: 5px;
  }
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 150px;
`;

const LoginPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const kakaoLoginHandler = async () => {
    window.Kakao.Auth.login({
      success: async (kakao_data: any) => {
        // 카카오톡 서버로 부터 access token 받기
        let accessToken = kakao_data.access_token;

        // api 통신으로 jwt 토큰 access token, refresh token 받기
        const response = getLoginToken(accessToken, 'KAKAO');

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
      },
    });
  };

  // 구글 로그인하기 위한 url로 이동
  const googleLoginHandler = () => {
    window.location.href =
      'https://accounts.google.com/o/oauth2/v2/auth?' +
      `client_id=${process.env.NEXT_PUBLIC_GOOGLE_KEY}&` +
      `redirect_uri=http://localhost:3000/google&` +
      'response_type=token&' +
      'scope=https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile';
  };
  const backClickHandler = () => {
    router.push('/');
  };

  return (
    <>
      <MyArrowBackIosNewIcon onClick={backClickHandler} />
      <Wrapper>
        <h5>핫한 카페, 내 자리가 있을까 궁금할 때?</h5>
        <Image src={image} alt="logo" />
        <KakaoButton onClick={kakaoLoginHandler} />
        <GoogleButton onClick={googleLoginHandler} />
      </Wrapper>
    </>
  );
};
export default LoginPage;
