import { Typography, useTheme } from '@mui/material';

import { UnderlineButton } from '~/components/atom/buttons';
import CafeCommunityComment from './CafeCommunityComment';
import { CafeCommunityContainer } from './cafeDetailInfo.styled';

interface CommunityProp {
  comment: string;
}
const CafeCommunity = ({ comment }: CommunityProp) => {
  const theme = useTheme();
  const grayColor = theme.palette.grey[100];

  const content = `${comment}개 댓글보기`;

  return (
    <>
      <CafeCommunityContainer color={grayColor}>
        <Typography variant="h4" mt="20px" mb="15px">
          커뮤니티
        </Typography>
        <CafeCommunityComment />
        <CafeCommunityComment />
      </CafeCommunityContainer>
      <UnderlineButton text={content} onClick={() => {}} />
    </>
  );
};
export default CafeCommunity;
