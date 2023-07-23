/**
 * @createdBy 한수민
 * @description 카페 리뷰 등록하는 api 함수
 */

interface CafeReview {
  token: string;
  cafeId: string;
  cafeCongestion: string;
  hasPlug: string;
  isClean: string;
}
const addCafeReview = async (body: CafeReview) => {
  const { token, cafeId, ...bodyData } = body;
  try {
    const url = `http://52.78.196.20:8080/api/cafe/${cafeId}/review`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        accept: '*/*',
        Authorization: `Bearer ${token}`,
      },
      credentials: 'include',
      body: JSON.stringify(bodyData),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};
export default addCafeReview;
