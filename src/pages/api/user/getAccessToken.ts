/**
 * @createdBy 한수민
 * @description refresh token으로 access token 재발급 받는 api 함수
 */

async function getAccessToken(token: string) {
  try {
    const url = 'http://52.78.196.20:8080/api/access-token/issue';

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        accept: '*/*',
        Authorization: `Bearer ${token}`,
      },
      credentials: 'include',
    });

    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
}
export default getAccessToken;
