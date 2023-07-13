import { Box } from '@mui/material';
import styled, { css } from 'styled-components';

interface RadioBorderProps {
  bordercolor: string;
  background: string;
  isborder: string;
}
export const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const CafeStatusSearch = styled(Box)<RadioBorderProps>`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 15px 0px;
  background-color: ${(props) => props.background};
  width: 100%;
  padding: 20px 0px;
  cursor: pointer;

  ${(props) =>
    props.isborder === 'true' &&
    css`
      border: 1px solid ${props.bordercolor};
      flex-direction: column;
      padding: 10px 0px;
    `}
`;
