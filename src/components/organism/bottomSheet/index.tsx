import { useState } from 'react';

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

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

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
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
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
