/**
 * @createBy 한수민
 * @description 카페 리뷰 등록 성공 팝업 모달창
 */

import Popup from '~/components/atom/popup';
import Image from 'next/image';
import { Typography, useTheme } from '@mui/material';
import { ActionButton } from '~/types/popup';
import reviewSuccess from '../../../static/images/review-logo.png';
import { ReviewCount } from './cafeDetailInfo.styled';

interface CafePopupProps {
  reviewPopup: boolean;
  coffeeCount: number;
  actions: ActionButton[];
  closePopup: () => void;
}
const CafeReviewSuccessPopup = ({
  reviewPopup,
  coffeeCount,
  actions,
  closePopup,
}: CafePopupProps) => {
  const theme = useTheme();
  const mainColor = theme.palette.primary.main;
  const coffeColor = theme.palette.grey[400];
  return (
    <Popup
      open={reviewPopup}
      content={
        <>
          <Image src={reviewSuccess} alt="" width={130} height={200} />
          <ReviewCount>
            <Typography variant="body2">커피콩 </Typography>
            <Typography variant="body1" color={mainColor} mt="2px" ml="5px">
              2
            </Typography>
            <Typography variant="body2">개 지급 완료!</Typography>
          </ReviewCount>
          <Typography variant="body2" color={coffeColor}>
            잔여 커피콩: {coffeeCount}개
          </Typography>
        </>
      }
      actions={actions}
      onClose={closePopup}
    />
  );
};
export default CafeReviewSuccessPopup;