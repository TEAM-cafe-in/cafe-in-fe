/**
 * @createdBy 한수민
 * @description 카페 혼잡도 확인한 카페 정보 받아오는 api 함수
 */

interface CoffeeBean {
  token: string;
  cafeId: string;
}

const getCoffeeBeanInfo = async (body: CoffeeBean) => {
  const { token, cafeId } = body;

  const url = `http://52.78.196.20:8080/api/cafe/${cafeId}`;

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
};
export default getCoffeeBeanInfo;
