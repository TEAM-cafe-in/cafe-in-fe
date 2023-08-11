/**
 * @createBy 한수민
 * @description 카페 팝업 창 레이아웃
 */

import Image from 'next/image';

import { Typography, useTheme } from '@mui/material';

import Popup from '~/components/atom/popup';
import { ActionButton } from '~/types/popup';
import reviewSuccess from '../../../static/images/review-logo.png';
import reviewFail from '../../../static/images/not-review-logo.png';
import { ReviewCount } from './cafeResponsePopup.styled';

interface CafePopupProps {
  reviewPopup: boolean;
  actions: ActionButton[];
  closePopup: () => void;
  type: 'success' | 'fail';
}

const CafeResponsePopup = ({
  reviewPopup,
  actions,
  closePopup,
  type,
}: CafePopupProps) => {
  const theme = useTheme();
  const mainColor = theme.palette.primary.main;
  const coffeColor = theme.palette.grey[400];

  return (
    <Popup
      open={reviewPopup}
      content={
        <>
          {type === 'success' ? (
            <>
              <Image src={reviewSuccess} alt="" width={130} height={200} />
              <ReviewCount>
                <Typography variant="body2">커피콩 </Typography>
                <Typography variant="body1" color={mainColor} mt="2px" ml="5px">
                  2
                </Typography>
                <Typography variant="body2">개 지급 완료!</Typography>
              </ReviewCount>
            </>
          ) : (
            <>
              <Image src={reviewFail} alt="" width={130} height={200} />
              <Typography variant="body2">잔여 커피콩이 없어요!</Typography>
            </>
          )}

          <Typography variant="body2" color={coffeColor}>
            잔여 커피콩: 99개
          </Typography>
        </>
      }
      actions={actions}
      onClose={closePopup}
    />
  );
};
export default CafeResponsePopup;
