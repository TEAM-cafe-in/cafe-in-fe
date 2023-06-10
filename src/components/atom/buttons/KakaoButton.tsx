import Image from 'next/image';

import { styled } from 'styled-components';

import kakao from './img/kakao.png';

interface ButtonProps {
  // eslint-disable-next-line react/require-default-props
  onClick?: () => void;
  // eslint-disable-next-line react/require-default-props
}

const KakaoBtn = styled.button<ButtonProps>`
  margin-top: 100px;
  width: 300px;
  background-color: #ffe400;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  cursor: pointer;

  .kakao {
    width: 30px;
    height: 30px;
    justify-content: left;
  }
`;

const KakaoButton = ({ ...props }: ButtonProps) => {
  return (
    <KakaoBtn {...props}>
      <Image className="kakao" src={kakao} alt="kakao" />
      카카오로 시작하기
    </KakaoBtn>
  );
};
export default KakaoButton;
