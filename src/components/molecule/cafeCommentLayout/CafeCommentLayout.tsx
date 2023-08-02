/**
 * @createdBy 한수민
 * @description 카페 댓글, 대댓글 컴포넌트 layout
 */

import React from 'react';

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { Typography } from '@mui/material';

import { useDispatch } from 'react-redux';
import { setDepth2Content } from '~/store/reducers/depth2ContentSlice';
import {
  CommentContent,
  CommentTitle,
  CommentWrapper,
  FooterContainer,
  Wrapper,
} from './cafeCommentLayout.styled';
import CafeCommentWrite from './CafeCommentWrite';

interface CafeCommentLayoutProps {
  children: React.ReactNode;
  name: string;
  type: 'comment' | 're-comment';
}

const CafeCommentLayout = ({
  children,
  name,
  type,
}: CafeCommentLayoutProps) => {
  const dispatch = useDispatch();

  // 뒤로 가기 버튼
  const handleBackArrowClick = () => {
    if (type === 'comment') {
      dispatch(setDepth2Content('content'));
    }
    if (type === 're-comment') {
      dispatch(setDepth2Content('comment'));
    }
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
          <Typography variant="h4" className="title" mr="20px">
            {name}
          </Typography>
        </CommentTitle>

        {/* 내용 */}
        <CommentContent>{children}</CommentContent>

        {/* 댓글 달기 */}
        <FooterContainer>
          <CafeCommentWrite type={type} />
        </FooterContainer>
      </CommentWrapper>
    </Wrapper>
  );
};
export default CafeCommentLayout;
