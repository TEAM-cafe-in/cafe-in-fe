/**
 * @createBy 한수민
 * @description 카페 정보 리스트
 */
import { List, Typography, useTheme } from '@mui/material';

import { CafesInfo } from '~/types/cafeInfo';
import { useCafeInfoSelector } from '~/store/reducers/cafeInfoSlice';
import CafeInfo from './CafeInfo';

interface CafeInfoListProps {
  setOpenDepth2: (openDpth2: boolean) => void;
  setDepth2DataId: (depth2DataId: string) => void;
}

const CafeInfoList = ({
  setOpenDepth2,
  setDepth2DataId,
}: CafeInfoListProps) => {
  const theme = useTheme();
  const grayColor = theme.palette.grey[400];

  const cafeInfo = useCafeInfoSelector();

  return (
    <List>
      {cafeInfo && (
        <>
          <Typography ml="30px" color={grayColor}>
            총 {cafeInfo.cafeCount}
          </Typography>
          {cafeInfo.cafes?.map((cafe: CafesInfo) => (
            <CafeInfo
              key={cafe.cafeId}
              onClick={() => {
                setOpenDepth2(true);
                setDepth2DataId(cafe.cafeId);
              }}
              cafes={cafe}
            />
          ))}
        </>
      )}
    </List>
  );
};
export default CafeInfoList;
