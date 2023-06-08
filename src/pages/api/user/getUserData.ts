// jwt 토큰과 role을 넣어 get 통신을 하면 user 정보를 반환하는 api 함수
// async function getUserData(token: string | undefined, role: string) {
//  try {
//    const res = await axios.get(
//      `http://52.78.196.20:8080/api/member/info?role=${role}`,
//      {
//        headers: {
//          'Content-Type': 'application/json',
//          accept: '*/*',
//          Authorization: `Bearer ${token}`,
//          withCredentials: true,
//        },
//      }
//    );
//    return res;
//  } catch (error) {
//    return error;
//  }
// }
async function getUserData(token: string | undefined, role: string) {
  try {
    const url = `http://52.78.196.20:8080/api/member/info?role=${role}`;

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
}
export default getUserData;
