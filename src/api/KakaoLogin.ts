// eslint-disable-next-line import/no-extraneous-dependencies
import axios from 'axios';

async function KakaoLogin(token: string): Promise<any> {
  try {
    const res = await axios.post(
      'http://52.78.196.20:8080/api/oauth/login',
      {
        memberType: 'KAKAO',
      },
      {
        headers: {
          'Content-Type': 'application/json',
          accept: '*/*',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res;
  } catch (error) {
    return error;
  }
}
export default KakaoLogin;
