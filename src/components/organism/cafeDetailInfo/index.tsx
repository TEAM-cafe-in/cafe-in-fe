/**
 * @createBy 한수민
 * @description 카페 디테일 컴포넌트
 */

import { ListItem, Typography, Box, useTheme } from '@mui/material';

import { WriteButton } from '~/components/atom/buttons';
import { CafeData } from '~/db/data';
import { RadioStatusBoxButton } from '~/components/molecule/radioButtons';
import CafePlaceInfo from './CafePlaceInfo';
import CafeCommunity from './CafeCommunity';
import {
  CafeContentContainer,
  CafeDetailContainer,
  CafeStatusTypography,
  CafeTitle,
} from './cafeDetailInfo.styled';

interface DetailProps {
  cafeId: string;
}

const CafeDetailInfo = ({ cafeId }: DetailProps) => {
  const theme = useTheme();
  const grayColor = theme.palette.grey[100];
  const data1 = CafeData.cafes.filter((cafe) => cafe.cafeId === cafeId);
  const data = data1[0];

  return (
    <ListItem>
      <CafeDetailContainer>
        <CafeContentContainer grayColor={grayColor}>
          <CafeTitle>
            <Box>
              <Typography variant="h3" mr="4px" mt="7px">
                {data?.name}
              </Typography>
              <CafeStatusTypography
                variant="subtitle2"
                mt="5px"
                grayColor={grayColor}
              >
                {data?.status}
              </CafeStatusTypography>
            </Box>
            <WriteButton onClick={() => {}} />
          </CafeTitle>
          <RadioStatusBoxButton status={data?.averageCongestion} />
        </CafeContentContainer>
        <CafePlaceInfo
          address={data?.address}
          phoneNumber={data?.phoneNumber}
        />
        <CafeCommunity />
      </CafeDetailContainer>
    </ListItem>
  );
};
export default CafeDetailInfo;
