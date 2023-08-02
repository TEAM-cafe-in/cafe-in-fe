import CafeCommentLayout from '~/components/molecule/cafeCommentLayout';
import CafeSingleComment from '~/components/molecule/cafeCommentLayout/CafeSingleComment';

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
