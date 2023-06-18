/**
 * @createBy 김해지
 * @description 공통 컴포넌트 미리 보기 화면
 */
import { Box } from '@mui/material';

import ButtonPreview from '~/components/organism/preview/ButtonPreview';
import ModalPreview from '~/components/organism/preview/ModalPreview';
import PopupPreview from '~/components/organism/preview/PopupPreview';
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
    </Box>
  );
};

export default Comp;
