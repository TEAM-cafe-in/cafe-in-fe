/**
 * @createdBy 한수민
 * @description 카페 댓글 등록하는 api 함수
 */

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Keywords } from '~/types/comment';
import { customAxios } from '~/utils/customAxios';

interface CafeComment {
  cafeId: string;
  content: string;
  keywords: Keywords[];
}
const addCafeComment = async (body: CafeComment) => {
  const { cafeId, ...bodyData } = body;
  const response = await customAxios.post(
    `/api/cafe/${cafeId}/comment`,
    bodyData
  );
  return response.data;
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
