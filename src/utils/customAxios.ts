import axios from 'axios';
import { getCookie } from '~/helpers/cookie';
import { getAccessToken } from '~/pages/api/user';

export const customAxios = axios.create({
  baseURL: 'http://52.78.196.20:8080',
});

// Request 인터셉터: 요청을 보내기 전에 실행됩니다.
customAxios.interceptors.request.use(
  async (config) => {
    if (!config.headers.Authorization) {
      const cookie = getCookie('refreshToken');
      const { accessToken } = await getAccessToken(cookie);
      // eslint-disable-next-line no-param-reassign
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
