/**
 * @createBy 한수민
 * @description 카페 디테일 장소 컴포넌트
 */

import { Box, Typography, useTheme } from '@mui/material';
import PlaceIcon from '@mui/icons-material/Place';
import CallIcon from '@mui/icons-material/Call';

import { UnderlineButton } from '~/components/atom/buttons';
import LabelItems from '~/components/molecule/label/LabelItems';
import {
  CafePlaceContainer,
  CongestionBox,
  CongestionItem,
} from './cafeDetailInfo.styled';

interface CafePlaceInfoProps {
  address: string;
  phoneNumber: string;
  isCongestion: boolean;
  hasPlugCount: string;
  isCleanCount: string;
}

const CafePlaceInfo = ({
  address,
  phoneNumber,
  isCongestion,
  hasPlugCount,
  isCleanCount,
}: CafePlaceInfoProps) => {
  const theme = useTheme();
  const grayColor = theme.palette.grey[100];
  const iconColor = theme.palette.grey[300];
  const infoColor = theme.palette.grey[400];
  const mainColor = theme.palette.primary.main;

  return (
    <CafePlaceContainer color={grayColor} icon={iconColor}>
      <Typography variant="h4" mt="20px" mb="15px">
        매장 정보
      </Typography>
      <Box className="cafe-info">
        <PlaceIcon />
        <Typography variant="body2">{address}</Typography>
      </Box>

      <Box className="cafe-info">
        <CallIcon />
        <Typography variant="body2">{phoneNumber}</Typography>
      </Box>

      {isCongestion ? (
        <CongestionBox>
          <CongestionItem>
            <LabelItems hasPlug isClean={false} />
            <Typography color={mainColor}>{hasPlugCount}</Typography>
          </CongestionItem>
          <CongestionItem>
            <LabelItems isClean hasPlug={false} />
            <Typography color={mainColor}>{isCleanCount}</Typography>
          </CongestionItem>
        </CongestionBox>
      ) : (
        <Box className="cafe-plus">
          <Typography variant="caption" color={infoColor} mt="15px">
            실시간 호잡도를 조회하면 추가 정보를 확인할 수 있어요!
          </Typography>
          <UnderlineButton text="지금 알아보기" />
        </Box>
      )}
    </CafePlaceContainer>
  );
};
export default CafePlaceInfo;
