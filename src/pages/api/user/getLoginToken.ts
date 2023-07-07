/**
 * @createdBy 한수민
 * @description access 토큰을 header로 전달하면 jwt토큰 반환하는 api 함수
 */

import axios from 'axios';
import { LoginResponse } from '~/types/auth';

const getLoginToken = async (token: string, type: string) => {
  try {
    const res: LoginResponse = await axios.post(
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
    return { ...res, success: true };
  } catch (error) {
    return { success: false };
  }
};
export default getLoginToken;
