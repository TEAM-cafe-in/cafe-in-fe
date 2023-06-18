import styled, { css } from 'styled-components';

interface WrapperProps {
  status: string;
}

export const Wrapper = styled.div<WrapperProps>`
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
