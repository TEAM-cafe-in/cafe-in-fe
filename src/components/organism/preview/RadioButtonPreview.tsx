import { Box } from '@mui/material';
import {
  RadioCafeButton,
  RadioStatusButton,
} from '~/components/molecule/radioButtons';

const RadioButtonPreview = () => {
  return (
    <Box>
      <RadioStatusButton status="empty" />
      <RadioStatusButton status="full" />
      <RadioStatusButton status="average" />
      <RadioStatusButton status="unknown" />
      <RadioCafeButton status="empty" text="스타벅스 홍대입구역점" />
      <RadioCafeButton status="full" text="스타벅스 홍대입구역점" />
      <RadioCafeButton status="average" text="스타벅스 홍대입구역점" />
      <RadioCafeButton status="unknown" text="스타벅스 홍대입구역점" />
    </Box>
  );
};
export default RadioButtonPreview;
