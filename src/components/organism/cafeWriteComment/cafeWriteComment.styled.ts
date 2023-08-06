import { Box, TextField } from '@mui/material';
import styled from 'styled-components';

export const WriteTitle = styled(Box)`
  .mui-icon {
    margin-left: 20px;
    cursor: pointer;
  }
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const StyledTextField = styled(TextField)`
  display: flex;
  justify-content: center;
  margin: 15px 10px;

  & .MuiOutlinedInput-root {
    border: none;
    &:hover .MuiOutlinedInput-notchedOutline {
      border: none;
    }
    &.Mui-focused .MuiOutlinedInput-notchedOutline {
      border: none;
    }
  }
`;
