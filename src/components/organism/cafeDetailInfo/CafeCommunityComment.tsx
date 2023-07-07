import { Typography, useTheme } from '@mui/material';

import Profile from '~/components/atom/profile';
import { CommentBox } from './cafeDetailInfo.styled';

const CafeCommunityComment = () => {
  const theme = useTheme();
  const grayColor = theme.palette.grey[100];
  return (
    <CommentBox grayColor={grayColor}>
      <Profile size="sm" />
      <Typography ml="10px" className="arrow" variant="body2">
        엄청 맛이 있어요~~
      </Typography>
    </CommentBox>
  );
};

export default CafeCommunityComment;
