import Image from 'next/image';
import { useRouter } from 'next/router';

// import { useMutation } from '@tanstack/react-query';

import styled from 'styled-components';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

import { KakaoButton, GoogleButton } from '../../sections/login';
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

  const kakaoLoginHandler = async () => {
    window.Kakao.Auth.login({
      success: async (kakao_data: any) => {
        // 카카오톡 서버로 부터 refresh token, access token 받기
        const refreshToken = kakao_data.refresh_token;
        let accessToken = kakao_data.access_token;
        // api 통신으로 jwt 토큰 access token 받기
        const response = getLoginToken(accessToken, 'KAKAO');
        // promise 객체값 접근
        response.then((res: any) => {
          // 리덕스에 access token과 refresh token 값 저장
          accessToken = res.data.accessToken; // jwt access token 저장
          window.localStorage.setItem('accessToken', accessToken);
          window.localStorage.setItem('refreshToken', refreshToken);
        });
        const user = getUserData(accessToken, 'USER');
        console.log(user);
      },
    });
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
        <GoogleButton />
      </Wrapper>
    </>
  );
}

export default LoginPage;
