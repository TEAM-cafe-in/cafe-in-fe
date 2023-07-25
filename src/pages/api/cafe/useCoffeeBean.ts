/**
 * @createdBy 한수민
 * @description 카페 혼잡도 확인하는 api 함수
 */

interface CoffeeBean {
  token: string;
  cafeId: string;
}

const useCoffeeBean = async (body: CoffeeBean) => {
  const { token, cafeId } = body;
  try {
    const url = `http://52.78.196.20:8080/api/cafe/${cafeId}`;

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
};
export default useCoffeeBean;
