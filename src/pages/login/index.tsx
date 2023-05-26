import { useAccessTokenSelector } from '~/store/reducers/authSlice';

const LoginPage = () => {
  const accessToken = useAccessTokenSelector();

  return <div>{accessToken}</div>;
};

export default LoginPage;
