import React, { useCallback, useState } from 'react';

import { Button, ButtonGroup, Typography } from '@mui/material';
import styled from 'styled-components';

import { Option, locationArray, locationOptions } from '~/types/locationButton';

const Wrapper = styled.div`
  margin-top: 10px;
  margin-left: 10px;
`;

interface StyledButtonProps {
  selected: boolean;
}

interface LocationProps {
  googleMap: google.maps.Map;
}

const StyledButton = styled(Button)<StyledButtonProps>`
  && {
    background-color: ${({ selected }) => (selected ? '#FF6415' : 'white')};
    color: ${({ selected }) => (selected ? 'white' : 'black')};
    border-color: #ff6415;
  }
`;

const LocationButtonGroup = ({ googleMap }: LocationProps) => {
  const [selectedButton, setSelectedButton] = useState<string>('hongdae');

  const handleButtonClick = useCallback(
    (location: Option) => {
      setSelectedButton(location.name);
      googleMap.setCenter({
        lat: location.lat,
        lng: location.lng,
      });
      googleMap.setZoom(17);
    },
    [googleMap]
  );

  return (
    <Wrapper>
      <ButtonGroup>
        {locationArray.map((location) => (
          <StyledButton
            key={location}
            variant={
              selectedButton === locationOptions[location].name
                ? 'contained'
                : 'outlined'
            }
            onClick={() => handleButtonClick(locationOptions[location])}
            selected={selectedButton === locationOptions[location].name}
          >
            <Typography fontFamily="PretendardMedium">
              {locationOptions[location].title}
            </Typography>
          </StyledButton>
        ))}
      </ButtonGroup>
    </Wrapper>
  );
};

export default LocationButtonGroup;
