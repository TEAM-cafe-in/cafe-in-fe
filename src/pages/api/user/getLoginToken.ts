/**
 * @createdBy 한수민
 * @description access 토큰을 header로 전달하면 jwt토큰 반환하는 api 함수
 */

// eslint-disable-next-line import/no-extraneous-dependencies, @typescript-eslint/no-var-requires
import axios from 'axios';

async function getLoginToken(token: string, type: string) {
  try {
    const res = await axios.post(
      'http://52.78.196.20:8080/api/oauth/login',
      {
        memberType: `${type}`,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          // accept: '*/*',
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }
    );
    return res;
  } catch (error) {
    return error;
  }
}
export default getLoginToken;
