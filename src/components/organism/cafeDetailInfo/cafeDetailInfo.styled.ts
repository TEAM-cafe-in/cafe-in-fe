import { Box, Typography } from '@mui/material';
import styled from 'styled-components';

// index.tsx 파일 styled component
export interface CafeInfoGrayProps {
  color: string;
}
export const CafeDetailContainer = styled(Box)`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const CafeContentContainer = styled(Box)<CafeInfoGrayProps>`
  border-bottom: 4px solid ${(props) => props.color};
`;

export const CafeStatusTypography = styled(Typography)<CafeInfoGrayProps>`
  display: inline-block;
  padding: 2px 4px;
  border-radius: 4px;
  background-color: ${(props) => props.color};
  color: black;
`;

export const CafeTitle = styled(Box)`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`;

// CafePlaceInfo 컴포넌트 styled component
interface CafeColorProps {
  color: string;
  icon: string;
}

export const CafePlaceContainer = styled(Box)<CafeColorProps>`
  width: 100%;
  border-bottom: 4px solid ${(props) => props.color};
  display: flex;
  flex-direction: column;
  float: left;
  .cafe-info {
    display: flex;
    align-items: center;
    margin-bottom: 6px;
    svg {
      color: ${(props) => props.icon};
      transform: scale(0.8);
      margin-right: 5px;
    }
  }
  .cafe-plus {
    display: flex;
    flex-direction: column;
    text-align: center;
  }
`;

// CafeCommunity 컴포넌트 styled component
export const CafeCommunityContainer = styled(Box)<CafeInfoGrayProps>`
  border-bottom: 1px solid ${(prop) => prop.color};
`;

// CafeCommunityComment 컴포넌트 styled component
export const CommentBox = styled(Box)<CafeInfoGrayProps>`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  .arrow {
    padding: 0.6rem;
    border-radius: 6px;
    background-color: ${(props) => props.color};
    width: 100%;
  }
`;

// CafeReviewModal 컴포넌트 styled component
export const ReviewTitle = styled(Box)<CafeInfoGrayProps>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ${(props) => props.color};
`;
export const ReviewContent = styled(Box)<CafeInfoGrayProps>`
  display: flex;
  border-bottom: 1px solid ${(props) => props.color};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
`;
