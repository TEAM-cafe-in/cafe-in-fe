import { styled } from 'styled-components';
import Image from 'next/image';

import google from './img/google.png';

const GoogleBtn = styled.button`
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

function GoogleButton() {
  return (
    <GoogleBtn>
      <Image className="google" src={google} alt="google" />
      구글로 시작하기
    </GoogleBtn>
  );
}
export default GoogleButton;
