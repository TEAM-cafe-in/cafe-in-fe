import { ListItem, Typography, Box, useTheme } from '@mui/material';

import { WriteButton } from '~/components/atom/buttons';
import Radio from '~/components/atom/radio';
import { CafeData } from '~/db/data';
import CafePlaceInfo from './CafePlaceInfo';
import CafeCommunity from './CafeCommunity';
import {
  CafeContentContainer,
  CafeDetailContainer,
  CafeStatusTypography,
  CafeTitle,
  CafeStatusSearch,
} from './cafeDetailInfo.styled';

interface DetailProps {
  cafeId: string;
}

const CafeDetailInfo = ({ cafeId }: DetailProps) => {
  const theme = useTheme();
  const grayColor = theme.palette.grey[100];
  const borderColor = theme.palette.grey[200];
  const data1 = CafeData.cafes.filter((cafe) => cafe.cafeId === cafeId);
  const data = data1[0];

  return (
    <ListItem>
      <CafeDetailContainer>
        <CafeContentContainer grayColor={grayColor}>
          <img
            src="https://cdn.pixabay.com/photo/2016/11/29/12/54/cafe-1869656_1280.jpg"
            alt="marker"
            width={270}
            height={100}
          />
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
          <CafeStatusSearch grayColor={borderColor}>
            <Radio status="0" />
            <Typography variant="caption" ml="1px">
              실시간 혼잡도 알아보기
            </Typography>
          </CafeStatusSearch>
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
