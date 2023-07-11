import { Box } from '@mui/material';
import styled, { css } from 'styled-components';

interface RadioBorderProps {
  borderColor: string;
  backgroundColor: string;
  isBorder: boolean;
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
  background-color: ${(props) => props.backgroundColor};
  width: 100%;
  padding: 20px 0px;
  cursor: pointer;

  ${(props) =>
    props.isBorder &&
    css`
      border: 1px solid ${props.borderColor};
      flex-direction: column;
      padding: 10px 0px;
    `}
`;
