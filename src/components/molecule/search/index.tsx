/**
 * @createBy 한수민
 * @description 카페 검색 컴포넌트
 */

import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { StyledBox } from './search.styled';

const SearchCafe = () => {
  return (
    <StyledBox>
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="카페 바로 검색"
        inputProps={{ 'aria-label': '카페 바로 검색' }}
      />
      <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </StyledBox>
  );
};
export default SearchCafe;
