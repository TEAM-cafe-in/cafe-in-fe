/**
 * @createBy 한수민
 * @description 카페 정보 리스트
 */
import { useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';

import { List, Typography, useTheme } from '@mui/material';

import { CafesInfo } from '~/types/cafeInfo';
import { useAccessTokenSelector } from '~/store/reducers/authSlice';
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
  const token = useAccessTokenSelector();
  const theme = useTheme();
  const grayColor = theme.palette.grey[400];

  // 전체 카페 정보 가져오는 react query 문
  const { data } = useQuery(['cafeList'], () => getAllCafeInfo(token), {
    suspense: true,
  });

  // 카페 아이템을 클릭했을 때 실행
  const cafeClickHandler = useCallback(
    (id: string) => {
      setOpenDepth2(true);
      setDepth2DataId(id);
    },
    [setOpenDepth2, setDepth2DataId]
  );

  return (
    <List>
      {data && (
        <>
          <Typography ml="30px" color={grayColor}>
            총 {data?.cafeCount}
          </Typography>
          {data.cafes?.map((cafe: CafesInfo) => (
            <CafeInfo
              key={cafe.cafeId}
              cafeClickHandler={() => cafeClickHandler(cafe.cafeId)}
              cafes={cafe}
            />
          ))}
        </>
      )}
    </List>
  );
};
export default CafeInfoList;
