/**
 * @createBy 한수민
 * @description 카페 혼잡도 확인 팝업 창
 */

import Image from 'next/image';

import { Typography, useTheme } from '@mui/material';

import Popup from '~/components/atom/popup';
import { ActionButton } from '~/types/popup';
import { CongestionCoffee } from './cafeDetailInfo.styled';
import coffeebean from '../../../static/images/coffeebean.png';

interface CongestionProps {
  open: boolean;
  actions: ActionButton[];
  onClose: () => void;
}

const CafeCongestionPopup = ({ open, actions, onClose }: CongestionProps) => {
  const theme = useTheme();
  const mainColor = theme.palette.primary.main;
  const grayColor = theme.palette.grey[400];
  return (
    <Popup
      open={open}
      content={
        <>
          <Typography>혼잡도를 확인하시겠습니까?</Typography>
          <Typography variant="subtitle2" color={grayColor} mt="10px" mb="10px">
            잔여 커피콩: 99개
          </Typography>
          <CongestionCoffee>
            <Image src={coffeebean} alt="" />
            <Typography variant="subtitle1" color={mainColor}>
              2
            </Typography>
            <Typography variant="subtitle2" mr="2px">
              개 차감
            </Typography>
          </CongestionCoffee>
        </>
      }
      onClose={onClose}
      actions={actions}
    />
  );
};
export default CafeCongestionPopup;
