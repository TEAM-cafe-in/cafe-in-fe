import Image from 'next/image';
import { useRouter } from 'next/router';

import { useCookies } from 'react-cookie';
import styled from 'styled-components';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

import { useDispatch } from 'react-redux';
import { setToken } from '~/store/reducers/authSlice';
import { store } from '~/store';
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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [cookies, setCookie] = useCookies(['refreshToken']);

  const kakaoLoginHandler = async () => {
    window.Kakao.Auth.login({
      success: async (kakao_data: any) => {
        // 카카오톡 서버로 부터 access token 받기
        let accessToken = kakao_data.access_token;

        // api 통신으로 jwt 토큰 access token 받기
        const response = getLoginToken(accessToken, 'KAKAO');

        // promise 객체값 접근
        response.then((res: any) => {
          // jwt access token 리덕스에 저장
          accessToken = res.data.accessToken;
          dispatch(setToken({ access_token: accessToken }));

          // user data를 받아와서 리덕스에 저장
          const userData = getUserData(accessToken, 'USER');
          userData.then((data: any) => {
            store.dispatch(
              setUserData({
                isLogged: true,
                id: data.memberId,
                nickname: data.memberName,
                profile_image: data.profile,
                email: data.email,
              })
            );
          });

          // refresh token은 쿠키로 보관
          const { refreshToken } = res.data;
          console.log(refreshToken);
          setCookie('refreshToken', refreshToken);

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
}

export default LoginPage;
