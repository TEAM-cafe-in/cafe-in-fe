/**
 * @createdBy 한수민
 * @description 카페 대댓글 컴포넌트
 */

import {
  CafeCommentLayout,
  CafeSingleComment,
} from '~/components/molecule/cafeCommentLayout';

const CafeReComment = () => {
  // 더미 댓글 데이터
  const data = {
    commentId: '1',
    memberName: 'member',
    createdTime: '10분전',
    content: '커피 있나요',
    keywords: [],
  };
  return (
    <CafeCommentLayout name="cafe" type="re-comment">
      <CafeSingleComment comment={data} type="top-comment" />
      <CafeSingleComment comment={data} type="re-comment" />
    </CafeCommentLayout>
  );
};
export default CafeReComment;
