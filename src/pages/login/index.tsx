import { useAccessTokenSelector } from '~/store/reducers/authSlice';

function LoginPage() {
  const accessToken = useAccessTokenSelector();

  return <div>{accessToken}</div>;
}

export default LoginPage;
