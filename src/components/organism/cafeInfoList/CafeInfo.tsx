/**
 * @createdBy 한수민
 * @description 카페 리스트 아이템 컴포넌트
 */

import { ListItem, ListItemButton, Typography } from '@mui/material';

import { RadioStatusButton } from '~/components/molecule/radioButtons';
import { CafesInfo } from '~/types/cafeInfo';
import { CafeBox, CafeInfoTitle, CafeStatus } from './cafeInfo.styled';

interface CafeInfoProp {
  cafeClickHandler: () => void;
  cafes: CafesInfo;
}

const CafeInfo = ({ cafeClickHandler, cafes }: CafeInfoProp) => {
  return (
    <ListItem>
      <ListItemButton onClick={cafeClickHandler}>
        <CafeBox>
          <CafeInfoTitle>
            <Typography variant="h5" mr="4px">
              {cafes.name}
            </Typography>
            <RadioStatusButton status={cafes.averageCongestion} />
          </CafeInfoTitle>
          <Typography variant="body2" mt="5px">
            {cafes.address}
          </Typography>
          <CafeInfoTitle>
            <CafeStatus variant="subtitle2">{cafes.status}</CafeStatus>
            <Typography
              variant="subtitle2"
              color="grey"
              mt="12px"
              mb="10px"
              ml="10px"
            >
              후기{cafes.commentReviewCount}
            </Typography>
          </CafeInfoTitle>
        </CafeBox>
      </ListItemButton>
    </ListItem>
  );
};

export default CafeInfo;
