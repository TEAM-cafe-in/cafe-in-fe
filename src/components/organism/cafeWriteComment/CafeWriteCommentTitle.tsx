/**
 * @createBy 한수민
 * @description 카페 댓글 작성 title 컴포넌트
 */

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { Button, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { setDepth2Content } from '~/store/reducers/depth2ContentSlice';
import { WriteTitle } from './cafeWriteComment.styled';

interface WriteCommentProp {
  name: string;
}
const CafeWriteCommentTitle = ({ name }: WriteCommentProp) => {
  const dispatch = useDispatch();
  // 뒤로 가기 버튼
  const handleBackArrowClick = () => {
    dispatch(setDepth2Content('comment'));
  };

  return (
    <WriteTitle>
      <ArrowBackIosNewIcon
        className="mui-icon"
        onClick={handleBackArrowClick}
      />
      <Typography variant="h4" className="title" mr="20px">
        {name}
      </Typography>
      <Button>등록</Button>
    </WriteTitle>
  );
};
export default CafeWriteCommentTitle;
