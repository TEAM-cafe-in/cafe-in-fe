/**
 * @createBy 한수민
 * @description 카페 검색 컴포넌트
 */

import { ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';

import {
  Typography,
  InputBase,
  IconButton,
  useMediaQuery,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';

import {
  setNavigationContent,
  useNavigationSelector,
} from '~/store/reducers/navigateSlice';
import { CafesInfo } from '~/types/cafeInfo';
import { query } from '~/helpers/mobileQuery';
import {
  StyledArrowIcon,
  StyledBox,
  StyledInput,
  StyledSearchBox,
  StyledWrapper,
} from './search.styled';

interface SearchCafeProp {
  searchInput: string;
  setSearchInput: (searchInput: string) => void;
  filterCafe: CafesInfo[];
}
const SearchCafe = ({
  searchInput,
  setSearchInput,
  filterCafe,
}: SearchCafeProp) => {
  const dispatch = useDispatch();
  const navigate = useNavigationSelector();
  const isMobile = useMediaQuery(query, { noSsr: false });

  // 검색 입력하는 함수
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setSearchInput(input);
  };

  // 검색 취소하기
  const handleSearchCancel = () => {
    setSearchInput('');
    if (!isMobile) {
      dispatch(setNavigationContent('cafelist'));
    }
  };

  // 연관 검색어 클릭했을 때
  const handleCafeListClick = (cafe: CafesInfo) => {
    setSearchInput(cafe.name);
  };

  // 검색 클릭했을 때
  const handleSearchCafeClick = () => {
    if (searchInput === '') {
      return;
    }
    dispatch(setNavigationContent('search-list'));
  };

  return (
    <StyledWrapper>
      <StyledInput>
        {isMobile && <StyledArrowIcon />}
        <StyledBox>
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="카페 바로 검색"
            inputProps={{ 'aria-label': '카페 바로 검색' }}
            onChange={handleSearchChange}
            value={searchInput}
            onClick={() => dispatch(setNavigationContent('search'))}
          />
          <IconButton
            type="button"
            sx={{ p: '10px' }}
            aria-label="search"
            onClick={handleSearchCancel}
          >
            {searchInput !== '' && <CancelRoundedIcon fontSize="small" />}
          </IconButton>
          <IconButton
            type="button"
            sx={{ p: '10px' }}
            aria-label="search"
            onClick={handleSearchCafeClick}
          >
            <SearchIcon />
          </IconButton>{' '}
        </StyledBox>
      </StyledInput>

      {navigate === 'search' &&
        searchInput !== '' &&
        filterCafe?.length > 0 && (
          <StyledSearchBox>
            {filterCafe?.map((cafe) => (
              <Typography
                key={cafe.cafeId}
                mt="10px"
                onClick={() => handleCafeListClick(cafe)}
              >
                {cafe.name.toLowerCase().includes(searchInput.toLowerCase()) ? (
                  <span>
                    {cafe.name
                      .split(new RegExp(`(${searchInput})`, 'ig'))
                      .map((part) =>
                        part.toLowerCase() === searchInput.toLowerCase() ? (
                          <span key={part} style={{ color: 'orange' }}>
                            {part}
                          </span>
                        ) : (
                          part
                        )
                      )}
                  </span>
                ) : (
                  cafe.name
                )}
              </Typography>
            ))}
          </StyledSearchBox>
        )}

      {navigate === 'search' && searchInput === '' && (
        <StyledSearchBox>
          <Typography mt="10px">검색어를 입력해주세요</Typography>
        </StyledSearchBox>
      )}

      {navigate === 'search' &&
        searchInput !== '' &&
        filterCafe?.length === 0 && (
          <StyledSearchBox>
            <Typography mt="10px">검색 결과가 없습니다</Typography>
          </StyledSearchBox>
        )}
    </StyledWrapper>
  );
};
export default SearchCafe;
