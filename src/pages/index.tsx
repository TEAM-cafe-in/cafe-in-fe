/* eslint-disable react/button-has-type */
import { useRouter } from 'next/router';
import { useAccessTokenSelector } from '~/store/reducers/authSlice';

export default function Home() {
  const accessToken = useAccessTokenSelector();
  console.log(accessToken);
  const router = useRouter();
  const loginClickHandler = (): void => {
    router.push('/login');
  };
  return (
    <div>
      <h1>cafe in</h1>
      <button onClick={loginClickHandler}>로그인</button>
    </div>
  );
}
