import { Box, Typography } from '@mui/material';
import styled from 'styled-components';

// index.tsx 파일 styled component
export interface CafeInfoGrayProps {
  grayColor: string;
}
export const CafeDetailContainer = styled(Box)`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const CafeContentContainer = styled(Box)<CafeInfoGrayProps>`
  border-bottom: 4px solid ${(props) => props.grayColor};
`;

export const CafeStatusTypography = styled(Typography)<CafeInfoGrayProps>`
  display: inline-block;
  padding: 2px 4px;
  border-radius: 4px;
  background-color: ${(props) => props.grayColor};
`;

export const CafeTitle = styled(Box)`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`;

// CafePlaceInfo 컴포넌트 styled component
interface CafeColorProps {
  grayColor: string;
  iconColor: string;
}

export const CafePlaceContainer = styled(Box)<CafeColorProps>`
  width: 100%;
  border-bottom: 4px solid ${(props) => props.grayColor};
  display: flex;
  flex-direction: column;
  float: left;
  .cafe-info {
    display: flex;
    align-items: center;
    margin-bottom: 6px;
    svg {
      color: ${(props) => props.iconColor};
      transform: scale(0.8);
      margin-right: 5px;
    }
  }
  .cafe-plus {
    display: flex;
    flex-direction: column;
    text-align: center;
    .plus {
      text-decoration: underline;
    }
  }
`;

// CafeCommunity 컴포넌트 styled component
export const CafeCommunityContainer = styled(Box)<CafeInfoGrayProps>`
  border-bottom: 1px solid ${(prop) => prop.grayColor};
`;
export const CafeCommunityTypography = styled(Typography)`
  text-decoration: underline;
  text-align: center;
  cursor: pointer;
`;

// CafeCommunityComment 컴포넌트 styled component
export const CommentBox = styled(Box)<CafeInfoGrayProps>`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  .arrow {
    padding: 0.6rem;
    border-radius: 6px;
    background-color: ${(props) => props.grayColor};
    width: 100%;
  }
`;
