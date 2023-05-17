import { accessTokenSelector } from '~/store/reducers/authSlice';

const LoginPage = () => {
  const accessToken = accessTokenSelector();

  return <div>{accessToken}</div>;
};

export default LoginPage;
