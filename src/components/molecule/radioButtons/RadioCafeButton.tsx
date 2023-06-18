import { Typography } from '@mui/material';
import Radio from '~/components/atom/radio';
import { Wrapper } from './radioButton.styled';

interface Props {
  status: 'empty' | 'full' | 'average' | 'unknown';
  text: string;
}

const RadioCofeButton = ({ status, text }: Props) => {
  return (
    <Wrapper>
      <Radio status={status} />
      <Typography ml="4px">{text}</Typography>
    </Wrapper>
  );
};
export default RadioCofeButton;
