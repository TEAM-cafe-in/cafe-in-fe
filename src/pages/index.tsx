/* eslint-disable react/button-has-type */
import { useRouter } from 'next/router';
import { useAccessUserSelector } from '~/store/reducers/userSlice';

export default function Home() {
  const user = useAccessUserSelector();
  console.log(user);
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
