/**
 * @createdBy 한수민
 * @description 카페 상세 댓글 작성 input 컴포넌트
 */

import { useTheme } from '@mui/material';

import Profile from '~/components/atom/profile';
import { WriteContainer } from './cafeDetailComment.styled';

const CafeCommentWrite = () => {
  const theme = useTheme();
  const borderColor = theme.palette.grey[200];
  const inputColor = theme.palette.grey[100];
  return (
    <WriteContainer color1={borderColor} color2={inputColor}>
      <Profile size="md" />
      <input type="text" placeholder="댓글을 입력하세요" />
    </WriteContainer>
  );
};
export default CafeCommentWrite;
