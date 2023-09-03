/**
 * @createdBy 한수민
 * @description 카페 댓글, 대댓글 컴포넌트 layout
 */

import React from 'react';
import { useDispatch } from 'react-redux';

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { Typography, useMediaQuery } from '@mui/material';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';

import {
  setNavigationContent,
  useNavigationSelector,
} from '~/store/reducers/navigateSlice';
import { query } from '~/helpers/mobileQuery';
import CafeCommentWrite from './CafeCommentWrite';
import {
  CommentContent,
  CommentTitle,
  CommentWrapper,
  FooterContainer,
  Wrapper,
} from './cafeCommentLayout.styled';

interface CafeCommentLayoutProps {
  children: React.ReactNode;
  name: string;
}

const CafeCommentLayout = ({ children, name }: CafeCommentLayoutProps) => {
  const dispatch = useDispatch();
  const isMobile = useMediaQuery(query, { noSsr: false });
  const navigate = useNavigationSelector();

  // 뒤로 가기 버튼
  const handleBackArrowClick = () => {
    if (navigate === 'comment') {
      dispatch(setNavigationContent('content'));
    }
    if (navigate === 're-comment') {
      dispatch(setNavigationContent('comment'));
    }
    if (navigate === 'search-comment') {
      dispatch(setNavigationContent('search-detail'));
    }
    if (navigate === 'search-re-comment') {
      dispatch(setNavigationContent('search-comment'));
    }
  };

  // 홈 버튼
  const handleHomeClick = () => {
    dispatch(setNavigationContent('cafelist'));
  };

  return (
    <Wrapper>
      {/* 헤더 */}
      <CommentWrapper>
        <CommentTitle>
          <ArrowBackIosNewIcon
            className="mui-icon"
            onClick={handleBackArrowClick}
          />
          {isMobile && (
            <HomeRoundedIcon
              className="mui-home-icon"
              onClick={handleHomeClick}
            />
          )}

          <Typography variant="h4" className="title" mr="20px">
            {name}
          </Typography>
        </CommentTitle>

        {/* 내용 */}
        <CommentContent>{children}</CommentContent>

        {/* 댓글 달기 */}
        <FooterContainer>
          <CafeCommentWrite />
        </FooterContainer>
      </CommentWrapper>
    </Wrapper>
  );
};
export default CafeCommentLayout;
