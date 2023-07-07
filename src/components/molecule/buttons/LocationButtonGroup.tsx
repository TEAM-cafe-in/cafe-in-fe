import React, { useState } from 'react';
import { Button, ButtonGroup, Typography } from '@mui/material';
import styled from 'styled-components';

const Wrapper = styled.div`
  margin-top: 10px;
  margin-left: 10px;
`;

interface StyledButtonProps {
  selected: boolean;
}

interface LocationProps {
  hongdaeFunc: () => void;
  seongsuFunc: () => void;
  yeonnamFunc: () => void;
}

const StyledButton = styled(Button)<StyledButtonProps>`
  && {
    background-color: ${({ selected }) => (selected ? '#FF6415' : 'white')};
    color: ${({ selected }) => (selected ? 'white' : 'black')};
    border-color: #ff6415;
  }
`;

const LocationButtonGroup = ({
  hongdaeFunc,
  seongsuFunc,
  yeonnamFunc,
}: LocationProps) => {
  const [selectedButton, setSelectedButton] = useState<string>('hongdae');

  const handleButtonClick = (buttonId: string) => {
    setSelectedButton(buttonId);
  };

  return (
    <Wrapper>
      <ButtonGroup>
        <StyledButton
          variant={selectedButton === 'hongdae' ? 'contained' : 'outlined'}
          onClick={() => {
            hongdaeFunc();
            handleButtonClick('hongdae');
          }}
          selected={selectedButton === 'hongdae'}
        >
          <Typography fontFamily="PretendardMedium">홍대</Typography>
        </StyledButton>
        <StyledButton
          variant={selectedButton === 'yeonnam' ? 'contained' : 'outlined'}
          onClick={() => {
            yeonnamFunc();
            handleButtonClick('yeonnam');
          }}
          selected={selectedButton === 'yeonnam'}
        >
          <Typography fontFamily="PretendardMedium">연남</Typography>
        </StyledButton>
        <StyledButton
          variant={selectedButton === 'seongsu' ? 'contained' : 'outlined'}
          onClick={() => {
            seongsuFunc();
            handleButtonClick('seongsu');
          }}
          selected={selectedButton === 'seongsu'}
        >
          <Typography fontFamily="PretendardMedium">성수</Typography>
        </StyledButton>
      </ButtonGroup>
    </Wrapper>
  );
};

export default LocationButtonGroup;
