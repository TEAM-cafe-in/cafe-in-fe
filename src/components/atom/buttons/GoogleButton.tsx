import { styled } from 'styled-components';
import Image from 'next/image';

import google from './img/google.png';

interface ButtonProps {
  // eslint-disable-next-line react/require-default-props
  onClick?: () => void;
  // eslint-disable-next-line react/require-default-props
}

const GoogleBtn = styled.button<ButtonProps>`
  margin-top: 10px;
  width: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  border: 1px solid black;
  cursor: pointer;

  .google {
    width: 30px;
    height: 30px;
    justify-content: left;
  }
`;

const GoogleButton = ({ ...props }: ButtonProps) => {
  return (
    <GoogleBtn {...props}>
      <Image className="google" src={google} alt="google" />
      구글로 시작하기
    </GoogleBtn>
  );
};
export default GoogleButton;
