/**
 * @createdBy 한수민
 * @description 카페 상세 댓글 작성 input 컴포넌트
 */

import { useDispatch } from 'react-redux';

import { useTheme } from '@mui/material';

import Profile from '~/components/atom/profile';
import { setDepth2Content } from '~/store/reducers/depth2ContentSlice';
import { WriteContainer } from './cafeCommentLayout.styled';

interface WriteCommentProp {
  type: 'comment' | 're-comment';
}

const CafeCommentWrite = ({ type }: WriteCommentProp) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const borderColor = theme.palette.grey[200];
  const inputColor = theme.palette.grey[100];

  // 댓글 작성 페이지로 이동
  const handleWriteCommentClick = () => {
    if (type === 'comment') {
      dispatch(setDepth2Content('write'));
    }
  };
  return (
    <WriteContainer color1={borderColor} color2={inputColor}>
      <Profile size="md" />
      <input
        type="text"
        placeholder="댓글을 입력하세요"
        onClick={handleWriteCommentClick}
      />
    </WriteContainer>
  );
};
export default CafeCommentWrite;
