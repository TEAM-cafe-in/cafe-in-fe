import Image from 'next/image';

import { Box, styled } from '@mui/material';

// 프로필 사이즈 목록
const SIZE: { [key: string]: number } = {
  sm: 24,
  md: 32,
  lg: 78,
};

interface StyleProps {
  size: string;
}

export const Background = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'size',
})(({ size }: StyleProps) => ({
  position: 'relative',
  backgroundColor: '#DADADA',
  width: SIZE[size],
  height: SIZE[size],
  borderRadius: 20,
  overflow: 'hidden',
}));

export const ProfileImage = styled(Image, {
  shouldForwardProp: (prop) => prop !== 'size',
})(({ size }: StyleProps) => ({
  position: 'absolute',
  width: SIZE[size] - 10,
  height: SIZE[size],
  color: 'transparent',
  left: 5,
}));
