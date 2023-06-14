import { Box, styled } from '@mui/material';

export const ModalContainer = styled(Box)(() => ({
  backgroundColor: '#fff',
  minWidth: 400,
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  textAlign: 'center',
  padding: 4,
}));
