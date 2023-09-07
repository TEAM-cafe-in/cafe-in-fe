import { Box, styled } from '@mui/material';

export const StyledWrapper = styled(Box)(() => ({
  width: '90%',
  position: 'relative',

  marginTop: '15px',
  '@media (max-width: 660px)': {
    position: 'inherit',
  },
}));

export const StyledInput = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

export const StyledBox = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  backgroundColor: '#F8F8F8',
  width: '90%',
  borderRadius: '4px',
}));

export const StyledSearchBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  backgroundColor: '#F8F8F8',
  zIndex: 1,
  position: 'absolute',
  width: '90%',
  top: 'calc(100%)',
  padding: '0px 15px 10px 15px',
  borderTop: `1px solid ${theme.palette.grey[100]}`,
  cursor: 'pointer',
  marginLeft: '16px',

  '@media (max-width: 600px)': {
    width: '100%',
    backgroundColor: 'white',
    marginLeft: '0px',
    borderTop: 'none',
    position: 'inherit',
  },
}));
