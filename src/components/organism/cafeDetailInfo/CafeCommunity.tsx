import { Typography, useTheme } from '@mui/material';
import CafeCommunityComment from './CafeCommunityComment';
import {
  CafeCommunityContainer,
  CafeCommunityTypography,
} from './cafeDetailInfo.styled';

const CafeCommunity = () => {
  const theme = useTheme();
  const grayColor = theme.palette.grey[100];
  return (
    <>
      <CafeCommunityContainer grayColor={grayColor}>
        <Typography variant="h4" mt="20px" mb="15px">
          커뮤니티
        </Typography>
        <CafeCommunityComment />
        <CafeCommunityComment />
      </CafeCommunityContainer>
      <CafeCommunityTypography variant="caption" mb="15px" mt="5px">
        2021개 댓글 보기
      </CafeCommunityTypography>
    </>
  );
};
export default CafeCommunity;
