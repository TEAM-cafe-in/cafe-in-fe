import axios, {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig,
} from 'axios';

import { getCookie, setCookie } from '~/helpers/cookie';
import { getAccessToken } from '~/pages/api/user';

interface ErrorResponse {
  errorCode: string;
  errorMessage: string;
}

let fetchingToken = false;

const setInterceptors = (instance: AxiosInstance) => {
  instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = getCookie('accessToken');

      // eslint-disable-next-line no-param-reassign
      config.headers.Authorization = `Bearer ${token}`;

      return config;
    },
    (error) => Promise.reject(error)
  );

  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error: AxiosError<ErrorResponse>) => {
      if (
        error?.response?.data.errorCode === 'A-002' ||
        error?.response?.data.errorCode === 'A-001'
      ) {
        if (!fetchingToken) {
          fetchingToken = true;

          try {
            const cookie = getCookie('refreshToken');
            const { accessToken } = await getAccessToken(cookie);
            setCookie('accessToken', accessToken, {});
            console.log('토큰이 성공적으로 재발급 되었습니다.');

            error.response.config.headers.Authorization = `Bearer ${accessToken}`;

            return await instance.request(error.config);
          } catch (refreshError) {
            return await Promise.reject(refreshError);
          } finally {
            fetchingToken = false;
          }
        } else {
          console.log('토큰 발급 및 재시도 중입니다.');
          return Promise.reject(error);
        }
      }

      return Promise.reject(error);
    }
  );
  return instance;
};

const createInstance = () => {
  const instance = axios.create({
    baseURL: 'http://52.78.196.20:8080',
    headers: { 'Content-Type': 'application/json' },
  });
  return setInterceptors(instance);
};

export const customAxios = createInstance();
