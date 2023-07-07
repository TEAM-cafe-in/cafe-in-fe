/**
 * @createBy 한수민
 * @description 카페 상태 표시 (1: 여유, 2: 보통, 3: 혼잡, 0: 모름)
 */

import { Typography } from '@mui/material';
import Radio from '~/components/atom/radio';
import { Wrapper } from './radioButton.styled';

interface Props {
  status: '1' | '2' | '3' | '0';
}

const RadioStatusButton = ({ status }: Props) => {
  return (
    <Wrapper>
      <Radio status={status} />
      {status === '1' && (
        <Typography variant="caption" ml="1px" color="#1eda00">
          여유
        </Typography>
      )}
      {status === '3' && (
        <Typography variant="caption" ml="1px" color="#ff4545">
          혼잡
        </Typography>
      )}
      {status === '2' && (
        <Typography variant="caption" ml="1px" color="#ffa011">
          보통
        </Typography>
      )}
      {status === '0' && (
        <Typography variant="caption" ml="1px" color="#949494">
          실시간 혼잡도 알아보기
        </Typography>
      )}
    </Wrapper>
  );
};
export default RadioStatusButton;
