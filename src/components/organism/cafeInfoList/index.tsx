/**
 * @createBy 한수민
 * @description 카페 정보 리스트
 */
import { useCallback, useState } from 'react';
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

import CafeInfo from './CafeInfo';
import NoCafeComment from './NoCafeComment';

interface CafeInfoListProps {
  setOpenDepth2: (openDpth2: boolean) => void;
}

const CafeInfoListPage = ({ setOpenDepth2 }: CafeInfoListProps) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const grayColor = theme.palette.grey[400];
  const navigate = useNavigationSelector();

  // 검색 결과 입력
  const [searchInput, setSearchInput] = useState('');
  const [filterCafe, setFilterCafe] = useState<CafesInfo[]>([]);

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
        data?.cafes?.filter((cafe: CafesInfo) => {
          // cafe.name과 검색어를 모두 소문자로 변환하여 비교
          const cafeNameLower = cafe.name.toLowerCase().replace(/\s/g, '');
          const searchInputLower = s.toLowerCase().replace(/\s/g, ''); // 공백 제거

          // cafeNameLower에서 검색어를 포함하는지 검사
          return cafeNameLower.includes(searchInputLower);
        }) || [];
      setFilterCafe(filteredCafes);
    },
    [data]
  );

  // 카페 아이템을 클릭했을 때 실행
  const cafeClickHandler = useCallback(
    (id: string) => {
      setOpenDepth2(true);
      dispatch(setCafeId({ cafeId: id, commentId: '' }));
      if (navigate === 'cafelist' || navigate === 'search') {
        // 디테일 정보가 보여지게 set
        dispatch(setNavigationContent('content'));
      }
      if (navigate === 'search-list') {
        dispatch(setNavigationContent('search-detail'));
      }
    },
    [setOpenDepth2, dispatch, navigate]
  );

  return (
    <Box>
      {!isMobile && (
        <SearchCafe
          searchInput={searchInput}
          setSearchInput={searchInputSetHandler}
          filterCafe={filterCafe}
        />
      )}

      {/* 카페 전체 정보 리스트 */}
      <List>
        {data &&
          (navigate === 'cafelist' ||
            navigate === 'search' ||
            navigate === 'content' ||
            navigate === 'comment' ||
            navigate === 're-comment' ||
            navigate === 'write' ||
            searchInput === '') && (
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

        {/* 검색 후 카페 리스트가 없을 때 */}
        {(navigate === 'search-list' || navigate === 'search-detail') &&
          filterCafe.length === 0 && (
            <NoCafeComment searchInput={searchInput} />
          )}

        {/* 검색 후 카페 리스트 1개 이상 일 때 */}
        {(navigate === 'search-list' ||
          navigate === 'search-detail' ||
          navigate === 'search-write' ||
          navigate === 'search-re-comment' ||
          navigate === 'search-comment') &&
          filterCafe.length > 0 && (
            <>
              {filterCafe.map((filter: CafesInfo, index: number) => (
                <CafeInfo
                  // key={cafe.cafeId}
                  // 백엔드 아이디 처리 전까지
                  // eslint-disable-next-line react/no-array-index-key
                  key={index}
                  cafeClickHandler={() => cafeClickHandler(filter.cafeId)}
                  cafes={filter}
                />
              ))}
            </>
          )}
      </List>
    </Box>
  );
};
export default CafeInfoListPage;
