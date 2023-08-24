/**
 * @createBy 한수민
 * @description 카페 검색 컴포넌트
 */

import { ChangeEvent, useState } from 'react';

import { Typography, InputBase, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';

import { StyledBox, StyledSearchBox, StyledWrapper } from './search.styled';

interface SearchCafeData {
  cafeId: string;
  name: string;
}
interface SearchCafeProp {
  cafeList: SearchCafeData[];
}
const SearchCafe = ({ cafeList }: SearchCafeProp) => {
  const [searchInput, setSearchInput] = useState<string>('');
  const [filterCafe, setFilterCafe] = useState<SearchCafeData[]>([]);

  // 검색 입력하는 함수
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setSearchInput(input);

    const regex = /^[a-zA-Z0-9가-힣]+$/;
    setFilterCafe(
      cafeList.filter((cafe) => {
        return (
          regex.test(input) &&
          cafe.name.toLowerCase().includes(input.toLowerCase())
        );
      })
    );
  };

  // 검색 취소하기
  const handleSearchCancel = () => {
    setSearchInput('');
    setFilterCafe([]);
  };

  return (
    <StyledWrapper>
      <StyledBox>
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="카페 바로 검색"
          inputProps={{ 'aria-label': '카페 바로 검색' }}
          onChange={handleSearchChange}
          value={searchInput}
        />
        <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
          {searchInput !== '' && (
            <CancelRoundedIcon fontSize="small" onClick={handleSearchCancel} />
          )}
        </IconButton>
        <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
          <SearchIcon />
        </IconButton>
      </StyledBox>
      {filterCafe?.length > 0 && (
        <StyledSearchBox>
          {filterCafe?.map((cafe) => (
            <Typography key={cafe.cafeId} mt="10px">
              {cafe.name.toLowerCase().includes(searchInput.toLowerCase()) ? (
                <span>
                  {cafe.name.split(searchInput).map((part, index) =>
                    index > 0 ? (
                      <span key={part}>
                        <span style={{ color: 'orange' }}>{searchInput}</span>
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
    </StyledWrapper>
  );
};
export default SearchCafe;
