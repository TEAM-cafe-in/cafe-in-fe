/**
 * @createdBy 한수민
 * @description 카페 상세 댓글 페이지 depth2 컴포넌트
 */
import { useDispatch } from 'react-redux';

import { Typography } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

import { Comment } from '~/types/cafeInfo';
import { setDepth2Content } from '~/store/reducers/depth2ContentSlice';
import CafeSingleComment from './CafeSingleComment';
import CafeCommentWrite from './CafeCommentWrite';
import {
  CommentContent,
  CommentTitle,
  CommentWrapper,
  FooterContainer,
  Wrapper,
} from './cafeDetailComment.styled';

interface CommentProps {
  name: string;
  comments: Comment[] | [];
}

const CafeDetailComment = ({ name, comments }: CommentProps) => {
  const dispatch = useDispatch();

  // 뒤로 가기 버튼 클릭
  const handleBackArrowClick = () => {
    dispatch(setDepth2Content('content'));
  };

  return (
    <Wrapper>
      {/* 헤더 */}
      <CommentWrapper>
        <CommentTitle>
          <ArrowBackIosNewIcon
            className="mui-icon"
            onClick={handleBackArrowClick}
          />
          <Typography variant="h4" className="title" mr="20px">
            {name}
          </Typography>
        </CommentTitle>

        {/* 내용 */}
        <CommentContent>
          {comments &&
            comments?.map((comment: Comment) => (
              <CafeSingleComment key={comment.commentId} comment={comment} />
            ))}
        </CommentContent>

        {/* 댓글 달기 */}
        <FooterContainer>
          <CafeCommentWrite />
        </FooterContainer>
      </CommentWrapper>
    </Wrapper>
  );
};
export default CafeDetailComment;
