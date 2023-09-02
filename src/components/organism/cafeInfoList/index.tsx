/**
 * @createBy 한수민
 * @description 카페 정보 리스트
 */
import { useCallback, useState } from 'react';
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';

import { Box, List, Typography, useMediaQuery, useTheme } from '@mui/material';

import { CafesInfo } from '~/types/cafeInfo';
import SearchCafe from '~/components/molecule/search';
import getAllCafeInfo from '~/pages/api/home/getAllCafeInfo';
import {
  setNavigationContent,
  useNavigationSelector,
} from '~/store/reducers/navigateSlice';
import { query } from '~/helpers/mobileQuery';
import { setCafeId } from '~/store/reducers/cafeIdSlice';
import searchLogo from '../../../static/images/not-search-logo.png';
import CafeInfo from './CafeInfo';
import { SearchContainer } from './cafeInfo.styled';

interface CafeInfoListProps {
  setOpenDepth2: (openDpth2: boolean) => void;
  setDepth2DataId: (depth2DataId: string) => void;
}

const CafeInfoListPage = ({
  setOpenDepth2,
  setDepth2DataId,
}: CafeInfoListProps) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const grayColor = theme.palette.grey[400];
  const navigate = useNavigationSelector();

  // 검색 결과 입력
  const [searchInput, setSearchInput] = useState('');
  const [filterCafe, setFilterCafe] = useState([]);

  const isMobile = useMediaQuery(query, { noSsr: false });

  // 전체 카페 정보 가져오는 react query 문
  const { data } = useQuery(['cafeList'], () => getAllCafeInfo(), {
    suspense: true,
  });

  // 검색어 입력하는 값 update 하는 함수
  const searchInputSetHandler = useCallback(
    (s: string) => {
      setSearchInput(s);

      // 검색어가 변경될 때마다 필터링된 카페 목록 업데이트
      const filteredCafes =
        data?.cafes?.filter((cafe: CafesInfo) => cafe.name.includes(s)) || [];
      setFilterCafe(filteredCafes);
    },
    [data]
  );

  // 카페 아이템을 클릭했을 때 실행
  const cafeClickHandler = useCallback(
    (id: string) => {
      setOpenDepth2(true);
      setDepth2DataId(id);

      // 디테일 정보가 보여지게 set
      dispatch(setNavigationContent('content'));
      dispatch(setCafeId({ cafe_id: id, comment_id: '0' }));
    },
    [setOpenDepth2, setDepth2DataId, dispatch]
  );

  console.log(navigate);
  const cafeData =
    data &&
    data?.cafes.map((cafe: CafesInfo) => ({
      name: cafe.name,
      cafeId: cafe.cafeId,
    }));

  return (
    <Box>
      {!isMobile && (
        <SearchCafe
          cafeList={cafeData}
          searchInput={searchInput}
          setSearchInput={searchInputSetHandler}
        />
      )}

      <List>
        {data && (navigate === 'cafelist' || navigate === 'search') && (
          <>
            <Typography ml="30px" color={grayColor}>
              총 {data?.cafeCount}
            </Typography>
            {data.cafes?.map((cafe: CafesInfo, index: number) => (
              <CafeInfo
                // key={cafe.cafeId}
                // 백엔드 아이디 처리 전까지
                // eslint-disable-next-line react/no-array-index-key
                key={index}
                cafeClickHandler={() => cafeClickHandler(cafe.cafeId)}
                cafes={cafe}
              />
            ))}
          </>
        )}
        {navigate === 'search-list' && filterCafe.length === 0 && (
          <SearchContainer>
            <Image src={searchLogo} alt="" />
            <Typography variant="h5" mt="20px">
              {searchInput} 와 일치하는 카페 검색결과가 없습니다.
            </Typography>
          </SearchContainer>
        )}

        {navigate === 'search-list' ||
          ('search-detail' && filterCafe.length > 0 && (
            <>
              {filterCafe.map((filter: CafesInfo, index: number) => (
                <CafeInfo
                  // key={cafe.cafeId}
                  // 백엔드 아이디 처리 전까지
                  // eslint-disable-next-line react/no-array-index-key
                  key={index}
                  cafeClickHandler={() => {
                    cafeClickHandler(filter.cafeId);
                    dispatch(setNavigationContent('search-detail'));
                  }}
                  cafes={filter}
                />
              ))}
            </>
          ))}
      </List>
    </Box>
  );
};
export default CafeInfoListPage;
