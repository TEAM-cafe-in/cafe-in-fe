import Image from 'next/image';
import { useRouter } from 'next/router';

// import { useMutation } from '@tanstack/react-query';

// import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';

import styled from 'styled-components';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

import { useDispatch } from 'react-redux';
import { setUserData } from '~/store/reducers/userSlice';
import { GoogleButton, KakaoButton } from '../../sections/login';
import { getLoginToken, getUserData } from '../api/user';
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

function LoginPage() {
  const router = useRouter();
  const dispatch = useDispatch();

  const kakaoLoginHandler = async () => {
    window.Kakao.Auth.login({
      success: async (kakao_data: any) => {
        // 카카오톡 서버로 부터 refresh token, access token 받기
        const refreshToken = kakao_data.refresh_token;
        let accessToken = kakao_data.access_token;
        // api 통신으로 jwt 토큰 access token 받기
        const response = getLoginToken(accessToken, 'KAKAO');
        console.log(response);

        // promise 객체값 접근
        response.then((res: any) => {
          // jwt access token 저장
          accessToken = res.data.accessToken;
          // localstorage에 access token과 refresh token 값 저장
          window.localStorage.setItem('accessToken', accessToken);
          window.localStorage.setItem('refreshToken', refreshToken);
          // jwt 토큰으로 user 정보 받기
          const userData = getUserData(accessToken, 'USER');
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
      },
    });
  };

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

  // const onSuccessHandler = (res: any) => {
  //  console.log(res.credential.accessToken);
  // const googleRes = getLoginToken(googleAccessToken, 'GOOGLE');
  // console.log(googleRes);
  // };

  // const onFailureHandler = (error: any) => {
  //  console.log(error);
  // };
  return (
    <>
      <MyArrowBackIosNewIcon onClick={backClickHandler} />
      <Wrapper>
        <h5>핫한 카페, 내 자리가 있을까 궁금할 때?</h5>
        <Image src={image} alt="logo" />
        <KakaoButton onClick={kakaoLoginHandler} />
        {/* <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_KEY}>
          <GoogleLogin
            onSuccess={onSuccessHandler}
            onError={onFailureHandler}
          />
        </GoogleOAuthProvider> */}
        <GoogleButton onClick={googleLoginHandler} />
      </Wrapper>
    </>
  );
}

export default LoginPage;
