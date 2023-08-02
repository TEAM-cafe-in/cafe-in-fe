/**
 * @createdBy 한수민
 * @description 카페 상세 댓글 페이지 depth2 컴포넌트
 */

import { Comment } from '~/types/cafeInfo';
import CafeCommentLayout from '~/components/molecule/cafeCommentLayout';
import CafeSingleComment from '../../molecule/cafeCommentLayout/CafeSingleComment';

interface CommentProps {
  name: string;
  comments: Comment[] | [];
}

const CafeDetailComment = ({ name, comments }: CommentProps) => {
  return (
    <CafeCommentLayout name={name} type="comment">
      {comments &&
        comments?.map((comment: Comment) => (
          <CafeSingleComment
            key={comment.commentId}
            comment={comment}
            type="comment"
          />
        ))}
    </CafeCommentLayout>
  );
};
export default CafeDetailComment;
