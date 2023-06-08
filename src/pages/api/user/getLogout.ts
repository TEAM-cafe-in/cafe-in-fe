/**
 * @createdBy 한수민
 * @description access token을 header에 보내면 refresh token을 만료시켜 로그아웃시켜주는 api 함수
 */

// eslint-disable-next-line import/no-extraneous-dependencies, @typescript-eslint/no-var-requires
import axios from 'axios';
import { removeCookie } from '~/helpers/Cookie';

async function getLogout(token: string) {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const res = await axios.post('http://52.78.196.20:8080/api/logout', null, {
      headers: {
        'Content-Type': 'application/json',
        accept: '*/*',
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });
    removeCookie('refreshToken');
    return true;
  } catch (error) {
    return false;
  }
}
export default getLogout;
