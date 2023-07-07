import { Box, Typography, useTheme } from '@mui/material';
import PlaceIcon from '@mui/icons-material/Place';
import CallIcon from '@mui/icons-material/Call';
import { CafePlaceContainer } from './cafeDetailInfo.styled';

interface CafePlaceInfoProps {
  address: string;
  phoneNumber: string;
}

const CafePlaceInfo = ({ address, phoneNumber }: CafePlaceInfoProps) => {
  const theme = useTheme();
  const grayColor = theme.palette.grey[100];
  const iconColor = theme.palette.grey[300];
  const infoColor = theme.palette.grey[400];
  return (
    <CafePlaceContainer grayColor={grayColor} iconColor={iconColor}>
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

      <Box className="cafe-plus">
        <Typography variant="caption" color={infoColor} mt="15px">
          실시간 호잡도를 조회하면 추가 정보를 확인할 수 있어요!
        </Typography>
        <Typography className="plus" variant="caption" mb="15px" mt="5px">
          지금 알아보기
        </Typography>
      </Box>
    </CafePlaceContainer>
  );
};
export default CafePlaceInfo;
