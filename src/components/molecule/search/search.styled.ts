import { Box, styled } from '@mui/material';

export const StyledWrapper = styled(Box)(() => ({
  width: '90%',
  position: 'relative',
  marginLeft: '5%',
}));

export const StyledBox = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  backgroundColor: '#F8F8F8',
  width: '100%',
  marginTop: '15px',
  borderRadius: '4px',
}));

export const StyledSearchBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  backgroundColor: '#F8F8F8',
  zIndex: 1,
  position: 'absolute',
  width: '100%',
  top: 'calc(100%)',
  padding: '0px 15px 10px 15px',
  borderTop: `1px solid ${theme.palette.grey[100]}`,
  cursor: 'pointer',
}));
