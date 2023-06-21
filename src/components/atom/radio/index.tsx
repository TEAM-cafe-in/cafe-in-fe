/**
 * @createBy 한수민
 * @description 라디오 버튼 작업 (1: 여유, 2: 보통, 3: 혼잡, 0: 모름)
 */

import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import HelpIcon from '@mui/icons-material/Help';
import { Wrapper } from './radio.styled';

interface Props {
  status: '1' | '2' | '3' | '0';
}

const Radio = ({ status }: Props) => {
  return (
    <Wrapper status={status}>
      {status !== '0' && <RadioButtonCheckedIcon className="mui-icon" />}
      {status === '0' && <HelpIcon className="mui-icon" />}
    </Wrapper>
  );
};
export default Radio;
