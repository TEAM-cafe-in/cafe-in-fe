/**
 * @createBy 한수민
 * @description 카페 상태 표시  (status : full, empty, average, unknown)
 */

import { Typography } from '@mui/material';
import Radio from '~/components/atom/radio';
import { Wrapper } from './radioButton.styled';

interface Props {
  status: 'empty' | 'full' | 'average' | 'unknown';
}

const RadioStatusButton = ({ status }: Props) => {
  return (
    <Wrapper>
      <Radio status={status} />
      {status === 'empty' && (
        <Typography ml="4px" color="#1eda00">
          여유
        </Typography>
      )}
      {status === 'full' && (
        <Typography ml="4px" color="#ff4545">
          혼잡
        </Typography>
      )}
      {status === 'average' && (
        <Typography ml="4px" color="#ffa011">
          보통
        </Typography>
      )}
      {status === 'unknown' && (
        <Typography ml="4px" color="#949494">
          실시간 혼잡도 알아보기
        </Typography>
      )}
    </Wrapper>
  );
};
export default RadioStatusButton;
