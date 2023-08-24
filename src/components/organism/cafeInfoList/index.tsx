/**
 * @createBy 한수민
 * @description 카페 정보 리스트
 */
import { useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';

import { Box, List, Typography, useMediaQuery, useTheme } from '@mui/material';

import { CafesInfo } from '~/types/cafeInfo';
import { useAccessTokenSelector } from '~/store/reducers/authSlice';
import getAllCafeInfo from '~/pages/api/home/getAllCafeInfo';
import { setDepth2Content } from '~/store/reducers/depth2ContentSlice';
import SearchCafe from '~/components/molecule/search';
import { query } from '~/helpers/mobileQuery';
import CafeInfo from './CafeInfo';

interface CafeInfoListProps {
  setOpenDepth2: (openDpth2: boolean) => void;
  setDepth2DataId: (depth2DataId: string) => void;
}

const CafeInfoListPage = ({
  setOpenDepth2,
  setDepth2DataId,
}: CafeInfoListProps) => {
  const dispatch = useDispatch();
  const token = useAccessTokenSelector();
  const theme = useTheme();
  const grayColor = theme.palette.grey[400];

  const isMobile = useMediaQuery(query, { noSsr: false });

  // 전체 카페 정보 가져오는 react query 문
  const { data } = useQuery(['cafeList'], () => getAllCafeInfo(token), {
    suspense: true,
  });

  // 카페 아이템을 클릭했을 때 실행
  const cafeClickHandler = useCallback(
    (id: string) => {
      setOpenDepth2(true);
      setDepth2DataId(id);
      // 디테일 정보가 보여지게 set
      dispatch(setDepth2Content('content'));
    },
    [setOpenDepth2, setDepth2DataId, dispatch]
  );

  const cafeData =
    data &&
    data?.cafes.map((cafe: CafesInfo) => ({
      name: cafe.name,
      cafeId: cafe.cafeId,
    }));

  return (
    <Box>
      {!isMobile && <SearchCafe cafeList={cafeData} />}

      <List>
        {data && (
          <>
            <Typography ml="30px" color={grayColor}>
              총 {data?.cafeCount}
            </Typography>
            {data.cafes?.map((cafe: CafesInfo, index: number) => (
              <CafeInfo
                // key={cafe.cafeId}
                // eslint-disable-next-line react/no-array-index-key
                key={index}
                cafeClickHandler={() => cafeClickHandler(cafe.cafeId)}
                cafes={cafe}
              />
            ))}
          </>
        )}
      </List>
    </Box>
  );
};
export default CafeInfoListPage;
