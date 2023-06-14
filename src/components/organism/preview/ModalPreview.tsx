/**
 * @createBy 김해지
 * @description 모달 컴포넌트 미리보기
 */
import { useCallback, useState } from 'react';

import { Box, Typography } from '@mui/material';

import { BoxButton } from '~/components/atom/buttons';
import Modal from '~/components/molecule/modal';

const ModalPreview = () => {
  const [open, setOpen] = useState(false);

  // 팝업 열기 함수
  const openPopup = () => {
    setOpen(true);
  };

  // 팝업 닫기 함수
  const closePopup = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <Box>
      <BoxButton title="Open Modal" onClick={openPopup} />

      <Modal open={open} onClose={closePopup}>
        <Typography>Content 영역입니다.</Typography>
      </Modal>
    </Box>
  );
};

export default ModalPreview;
