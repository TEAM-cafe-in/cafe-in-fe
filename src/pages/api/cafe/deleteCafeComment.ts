/**
 * @createdBy 한수민
 * @description 카페 댓글 삭제하는 api 함수
 */

interface CafeComment {
  token: string;
  cafeId: string;
  commentId: string;
}

const deleteCafeComment = async (body: CafeComment) => {
  const { token, cafeId, commentId } = body;

  const url = `http://52.78.196.20:8080/api/cafe/${cafeId}/comment/${commentId}`;

  await fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      accept: '*/*',
      Authorization: `Bearer ${token}`,
    },
    credentials: 'include',
  });
};
export default deleteCafeComment;
