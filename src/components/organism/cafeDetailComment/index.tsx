/**
 * @createdBy 한수민
 * @description 카페 상세 댓글 페이지 depth2 컴포넌트
 */

import {
  CafeCommentLayout,
  CafeSingleComment,
} from '~/components/molecule/cafeCommentLayout';
import { Comment } from '~/types/cafeInfo';

interface CommentProps {
  name: string;
  comments: Comment[] | [];
  cafeId: string;
}

const CafeDetailComment = ({ name, comments, cafeId }: CommentProps) => {
  return (
    <CafeCommentLayout name={name} type="comment">
      {comments &&
        comments?.map((comment: Comment) => (
          <CafeSingleComment
            key={comment.commentId}
            comment={comment}
            cafeId={cafeId}
            type="comment"
          />
        ))}
    </CafeCommentLayout>
  );
};
export default CafeDetailComment;
