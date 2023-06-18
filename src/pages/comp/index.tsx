/**
 * @createBy 김해지
 * @description 공통 컴포넌트 미리 보기 화면
 */
import { Box } from '@mui/material';

import ButtonPreview from '~/components/organism/preview/ButtonPreview';
import ModalPreview from '~/components/organism/preview/ModalPreview';
import PopupPreview from '~/components/organism/preview/PopupPreview';
import RadioButtonPreview from '~/components/organism/preview/RadioButtonPreview';
import ToastPreview from '~/components/organism/preview/ToastPreview';

const Comp = () => {
  return (
    <Box>
      <h1>cafe in</h1>
      <h4>Button Component</h4>
      <ButtonPreview />
      <h4>Popup Component</h4>
      <PopupPreview />
      <h4>Modal Component</h4>
      <ModalPreview />
      <h4>Toast Message Component</h4>
      <ToastPreview />
      <h4>Radio Button Component</h4>
      <RadioButtonPreview />
    </Box>
  );
};

export default Comp;
