import styled from 'styled-components';

interface WrapperProps {
  color: string;
}

export const Wrapper = styled.div<WrapperProps>`
  .mui-icon {
    width: 17px;
    height: 17px;
    color: ${(props) => props.color};
  }
  display: flex;
  align-items: center;
`;
