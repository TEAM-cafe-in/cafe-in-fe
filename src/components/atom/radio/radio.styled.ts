import styled from 'styled-components';

interface WrapperProps {
  statusColor: string;
}

export const Wrapper = styled.div<WrapperProps>`
  .mui-icon {
    width: 17px;
    height: 17px;
    margin: 0 4px 0 0;
    color: ${(props) => props.statusColor};
  }
  display: flex;
  align-items: center;
`;
