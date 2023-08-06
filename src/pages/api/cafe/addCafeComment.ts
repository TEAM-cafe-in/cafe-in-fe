/**
 * @createdBy 한수민
 * @description 카페 댓글 등록하는 api 함수
 */

import { useMutation, useQueryClient } from '@tanstack/react-query';
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

// 카페 댓글 작성하는 mutate
export const useAddCafeCommentMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(addCafeComment, {
    onSuccess: () => {
      queryClient.invalidateQueries(['cafeList']);
      queryClient.invalidateQueries(['comment']);
    },
  });
};
