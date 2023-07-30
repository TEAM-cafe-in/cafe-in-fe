import { Box } from '@mui/material';
import { styled } from 'styled-components';

interface GrayTwoColor {
  color1: string;
  color2: string;
}
// CafeDetailComment 컴포넌트 styled component
export const Wrapper = styled(Box)`
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
`;

export const CommentWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const CommentTitle = styled(Box)`
  display: flex;
  align-items: center;
  margin-top: 10px;
  height: 35px;
  .mui-icon {
    margin-left: 20px;
    cursor: pointer;
  }
  .title {
    flex: 1;
    text-align: center;
  }
`;

export const CommentContent = styled(Box)`
  margin-bottom: 30px;
  flex: 1;
`;

export const FooterContainer = styled.footer`
  height: 30px;
  background-color: white;
  position: relative;
  transform: translateY(-100%);
`;

// CafeCommentWirte 컴포넌트 styled component
export const WriteContainer = styled(Box)<GrayTwoColor>`
  justify-content: center;
  display: flex;
  align-items: center;
  border-top: 1px solid ${(props) => props.color1};
  padding: 0.5rem 1rem;
  input {
    background-color: ${(props) => props.color2};
    margin-left: 10px;
    border-radius: 20px;
    height: 25px;
    padding: 15px;
    width: 100%;
  }
`;

// CafeSingleComment 컴포넌트 styled component
export const CommentContainer = styled(Box)<GrayTwoColor>`
  width: 100%;
  display: flex;
  padding: 1.5rem;
  border-bottom: 1px solid ${(props) => props.color2};
  .menu-icon {
    color: ${(props) => props.color1};
    transform: scale(0.9);
    cursor: pointer;
  }
`;
export const SingleCommentContent = styled(Box)`
  display: flex;
  flex-direction: column;
  width: 90%;
  margin-left: 20px;
`;
export const CommentReactIcon = styled(Box)`
  display: flex;
  align-items: center;
`;
