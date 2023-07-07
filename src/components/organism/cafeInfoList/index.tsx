import { List, Typography, useTheme } from '@mui/material';
import { CafeData } from '~/db/data';
import CafeInfo from './CafeInfo';

interface CafeInfoListProps {
  setOpenDepth2: (openDpth2: boolean) => void;
  setDepth2DataId: (depth2DataId: string) => void;
}

const CafeInfoList = ({
  setOpenDepth2,
  setDepth2DataId,
}: CafeInfoListProps) => {
  const data = CafeData;
  const theme = useTheme();
  const grayColor = theme.palette.grey[400];
  return (
    <List>
      <Typography ml="30px" color={grayColor}>
        총 {data.cafeCount}
      </Typography>
      {data?.cafes.map((cafe) => (
        <CafeInfo
          key={cafe.cafeId}
          onClick={() => {
            setOpenDepth2(true);
            setDepth2DataId(cafe.cafeId);
          }}
          cafes={cafe}
        />
      ))}
    </List>
  );
};
export default CafeInfoList;
