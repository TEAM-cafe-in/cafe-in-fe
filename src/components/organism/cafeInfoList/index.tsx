/**
 * @createBy 한수민
 * @description 카페 정보 리스트
 */
import { useQuery } from '@tanstack/react-query';

import { List, Typography, useTheme } from '@mui/material';

import { CafeData } from '~/db/data';
import { useAccessTokenSelector } from '~/store/reducers/authSlice';

import { CafesInfo } from '~/types/cafeInfo';
import getAllCafeInfo from '~/pages/api/home/getAllCafeInfo';
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

  const datas = CafeData;
  const token = useAccessTokenSelector();
  console.log('카페 데이터에서', token);

  const { data } = useQuery(['allCafeInfo'], () => getAllCafeInfo(token));
  // const data = getAllCafeInfo(token);
  console.log(data);

  return (
    <List>
      <Typography ml="30px" color={grayColor}>
        총 {datas.cafeCount}
      </Typography>

      {datas?.cafes?.map((cafe: CafesInfo) => (
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
