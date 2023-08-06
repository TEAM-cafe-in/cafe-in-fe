/**
 * @createBy 김해지
 * @description [모바일] 메인 하단 카페 목록용 Bottom Sheet
 */
import { useCallback, useState, Suspense } from 'react';

import { SwipeableDrawer } from '@mui/material';
import { Global } from '@emotion/react';

import {
  EMPTY_TOOL_BAR_HEIGHT,
  TOOL_BAR_HEIGHT,
} from '~/components/organism/appBar';
import CafeInfoListPage from '~/components/organism/cafeInfoList';
import {
  ContentBox,
  DRAWER_BLEEDING,
  Puller,
  StyledBox,
} from './bottomSheet.styled';

// Bottom Sheet FUll 높이 값 : DRAWER Puller 높이 + Toolbar 높이 + 빈 Toolbar 높이 + 여유 높이
const BOTTOM_SHEET_FULL_HEIGHT =
  DRAWER_BLEEDING + TOOL_BAR_HEIGHT + EMPTY_TOOL_BAR_HEIGHT + 20;

const BottomSheet = () => {
  const [open, setOpen] = useState(false);
  // 카페 디테일 아이디
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [openDepth2, setOpenDepth2] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [depth2DataId, setDepth2DataId] = useState('');

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
          <ContentBox>
            {/* 카페 리스트 페이지 */}
            <Suspense fallback={<div>loading...</div>}>
              <CafeInfoListPage
                setOpenDepth2={setOpenDepth2}
                setDepth2DataId={setDepth2DataId}
              />
            </Suspense>
          </ContentBox>
        </StyledBox>
      </SwipeableDrawer>
    </>
  );
};

export default BottomSheet;
