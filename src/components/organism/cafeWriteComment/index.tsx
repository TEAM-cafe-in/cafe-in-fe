/**
 * @createBy 한수민
 * @description 카페 댓글 작성 페이지
 */

import { useState, useCallback } from 'react';

import { Box } from '@mui/material';

import LabelButtons from '~/components/molecule/labelButtons/LabelButtons';
import CafeWriteCommentTitle from './CafeWriteCommentTitle';

interface WriteProp {
  name: string;
}
const CafeWriteComment = ({ name }: WriteProp) => {
  const [options, setOptions] = useState<string[]>([]);

  const setOptionsHandler = useCallback(
    (data: string[]) => {
      setOptions(data);
    },
    [setOptions]
  );

  return (
    <Box>
      <CafeWriteCommentTitle name={name} />
      <LabelButtons options={options} setOptions={setOptionsHandler} />
    </Box>
  );
};
export default CafeWriteComment;
