/**
 * @createdBy 한수민
 * @description 홈화면에 필요한 모든 카페 정보 받아오는 api 함수
 */

const getAllCafeInfo = async (token: string) => {
  try {
    const url = `http://52.78.196.20:8080/api/home`;

    const response = await fetch(url, {
      method: 'GET',
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
};
export default getAllCafeInfo;
