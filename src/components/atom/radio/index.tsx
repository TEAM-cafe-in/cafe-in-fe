/**
 * @createBy 한수민
 * @description 라디오 버튼 작업 (status : full, empty, average, unknown)
 */

import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import HelpIcon from '@mui/icons-material/Help';
import { Wrapper } from './radio.styled';

interface Props {
  status: 'empty' | 'full' | 'average' | 'unknown';
}

const Radio = ({ status }: Props) => {
  return (
    <Wrapper status={status}>
      {status !== 'unknown' && <RadioButtonCheckedIcon className="mui-icon" />}
      {status === 'unknown' && <HelpIcon className="mui-icon" />}
    </Wrapper>
  );
};
export default Radio;
