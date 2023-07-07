import { Typography, useTheme } from '@mui/material';
import Image from 'next/image';
import logo from '~/static/images/Profile_01.png';
import { CommentBox } from './cafeDetailInfo.styled';

const CafeCommunityComment = () => {
  const theme = useTheme();
  const grayColor = theme.palette.grey[100];
  return (
    <CommentBox grayColor={grayColor}>
      <Image src={logo} alt="프로필 이미지" width={45} height={45} />
      <Typography ml="10px" className="arrow" variant="body2">
        엄청 맛이 있어요~~
      </Typography>
    </CommentBox>
  );
};

export default CafeCommunityComment;
