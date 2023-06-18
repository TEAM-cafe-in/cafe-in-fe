import styled, { css } from 'styled-components';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import HelpIcon from '@mui/icons-material/Help';
import { Typography } from '@mui/material';

// 오렌지 보통 FFA011
// 연두색 여유 1EDA00
// 빨강색 혼잡 FF4545

interface Props {
  status: string;
  text: string;
}

const Wrapper = styled.div<{ status: string }>`
  .mui-icon {
    width: 17px;
    height: 17px;
    /* status가 혼잡인 경우 */
    ${(props) =>
      props.status === 'full' &&
      css`
        color: #ff4545;
      `}

    /* status가 여유인 경우 */
    ${(props) =>
      props.status === 'empty' &&
      css`
        color: #1eda00;
      `}

    /* status가 보통인 경우 */
    ${(props) =>
      props.status === 'average' &&
      css`
        color: #ffa011;
      `}

      /* status가 unknown인 경우 */
    ${(props) =>
      props.status === 'unknown' &&
      css`
        color: #949494;
      `}
  }
  display: flex;
  align-items: center;
`;

const RadioButton = ({ status, text }: Props) => {
  return (
    <Wrapper status={status}>
      {status !== 'unknown' && <RadioButtonCheckedIcon className="mui-icon" />}
      {status === 'unknown' && <HelpIcon className="mui-icon" />}
      <Typography variant="body2" ml={0.7} mr={0.1}>
        {text}
      </Typography>
    </Wrapper>
  );
};
export default RadioButton;
