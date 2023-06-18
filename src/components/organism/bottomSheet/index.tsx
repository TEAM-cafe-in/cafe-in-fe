/**
 * @createBy 김해지
 * @description [모바일] 메인 하단 카페 목록용 Bottom Sheet
 */
import { useCallback, useState } from 'react';

import { SwipeableDrawer } from '@mui/material';
import { Global } from '@emotion/react';
import { DRAWER_BLEEDING, Puller, StyledBox } from './bottomSheet.styled';
import { EMPTY_TOOL_BAR_HEIGHT, TOOL_BAR_HEIGHT } from '../appBar';

// Bottom Sheet FUll 높이 값 : DRAWER Puller 높이 + Toolbar 높이 + 빈 Toolbar 높이 + 여유 높이
const BOTTOM_SHEET_FULL_HEIGHT =
  DRAWER_BLEEDING + TOOL_BAR_HEIGHT + EMPTY_TOOL_BAR_HEIGHT + 20;

const BottomSheet = () => {
  const [open, setOpen] = useState(false);
  const container =
    window !== undefined ? () => window.document.body : undefined;

  // Bottom Modal Open 함수
  const handleOpen = useCallback(() => {
    setOpen(true);
  }, []);

  // Bottom Modal Close 함수
  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <>
      <Global
        styles={{
          '.MuiDrawer-root > .MuiPaper-root': {
            height: `calc(100% - ${BOTTOM_SHEET_FULL_HEIGHT}px)`,
            overflow: 'visible',
          },
        }}
      />
      <SwipeableDrawer
        container={container}
        anchor="bottom"
        open={open}
        onOpen={handleOpen}
        onClose={handleClose}
        swipeAreaWidth={DRAWER_BLEEDING}
        disableSwipeToOpen={false}
        ModalProps={{ keepMounted: true }}
      >
        <StyledBox>
          <Puller />
        </StyledBox>
      </SwipeableDrawer>
    </>
  );
};

export default BottomSheet;
