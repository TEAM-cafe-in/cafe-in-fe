import { setToken } from '~/store/reducers/authSlice';
import { useDispatch } from 'react-redux';

import Image from 'next/image';
import { useRouter } from 'next/router';

// eslint-disable-next-line import/no-extraneous-dependencies, @typescript-eslint/no-unused-vars
import axios from 'axios';

import { useMutation } from '@tanstack/react-query';
import KakaoLogin from '~/api/KakaoLogin';

import styled from 'styled-components';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { KakaoButton, GoogleButton } from '../../sections/login';
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

  const mutate = useMutation(KakaoLogin);
  const kakaoLoginHandler = async () => {
    window.Kakao.Auth.login({
      success: (res: any) => {
        const accessToken = res.access_token;
        const refreshToken = res.refresh_token;
        dispatch(
          setToken({ access_token: accessToken, refresh_token: refreshToken })
        );
        mutate.mutate(accessToken);
        router.push('/');
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
