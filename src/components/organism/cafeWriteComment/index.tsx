/**
 * @createBy 한수민
 * @description 카페 댓글 작성 페이지
 */

import { Box } from '@mui/material';
import CafeWriteCommentTitle from './CafeWriteCommentTitle';

interface WriteProp {
  name: string;
}
const CafeWriteComment = ({ name }: WriteProp) => {
  return (
    <Box>
      <CafeWriteCommentTitle name={name} />
    </Box>
  );
};
export default CafeWriteComment;
