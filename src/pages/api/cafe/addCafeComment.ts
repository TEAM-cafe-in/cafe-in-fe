/**
 * @createdBy 한수민
 * @description 카페 댓글 등록하는 api 함수
 */

import { Keywords } from '~/types/comment';

interface CafeComment {
  token: string;
  cafeId: string;
  content: string;
  keywords: Keywords[];
}
const addCafeComment = async (body: CafeComment) => {
  const { token, cafeId, ...bodyData } = body;
  try {
    const url = `http://52.78.196.20:8080/api/cafe/${cafeId}/comment`;

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
export default addCafeComment;
