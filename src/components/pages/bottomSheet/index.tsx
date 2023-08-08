/**
 * @createBy 김해지
 * @description [모바일] 메인 하단 카페 목록용 Bottom Sheet
 */
import { useCallback, useState, Suspense } from 'react';
import { useQuery } from '@tanstack/react-query';

import { Box, SwipeableDrawer, Typography } from '@mui/material';
import { Global } from '@emotion/react';

import { useDepth2ContentSelector } from '~/store/reducers/depth2ContentSlice';
import {
  EMPTY_TOOL_BAR_HEIGHT,
  TOOL_BAR_HEIGHT,
} from '~/components/organism/appBar';
import CafeInfoListPage from '~/components/organism/cafeInfoList';
import CafeDetailInfo from '~/components/organism/cafeDetailInfo';

import { useAccessTokenSelector } from '~/store/reducers/authSlice';
import getCoffeeBeanInfo from '~/pages/api/cafe/getCoffeeBeanInfo';
import CafeDetailTitleHeader from '~/components/organism/cafeDetailInfo/CafeDetailTitleHeader';
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
  const token = useAccessTokenSelector();
  const depth2Detail = useDepth2ContentSelector();
  const [open, setOpen] = useState(false);
  // 카페 디테일 아이디
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [openDepth2, setOpenDepth2] = useState(false);
  const [depth2DataId, setDepth2DataId] = useState('22');

  // 디테일 페이지 확장 상태
  const [expand, setExpand] = useState(true);

  // 혼잡도 확인했을 때 카페 디테일 정보 react query문
  const { data: congestion } = useQuery(
    ['comment', depth2DataId],
    () => getCoffeeBeanInfo({ token, cafeId: depth2DataId }),
    {
      suspense: true,
      enabled: !!depth2DataId, // cafeId가 없을 때 실행 X
    }
  );

  const container =
    window !== undefined ? () => window.document.body : undefined;

  // Bottom Modal Open 함수
  const handleOpen = useCallback(() => {
    setOpen(true);
    setExpand(true);
  }, []);

  // Bottom Modal Close 함수
  const handleClose = useCallback(() => {
    setOpen(false);
    setExpand(false);
  }, []);

  return (
    <>
      <Global
        styles={{
          '.MuiDrawer-root > .MuiPaper-root': {
            overflow: 'visible',
            height: `calc(100% - ${BOTTOM_SHEET_FULL_HEIGHT}px)`,
          },
          ...(depth2Detail === 'content' && {
            '.MuiDrawer-root > .MuiPaper-root': {
              overflow: 'visible',
              height: `calc(100% - ${DRAWER_BLEEDING}px)`,
            },
          }),
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
            {depth2Detail === 'cafelist' && (
              <Suspense fallback={<div>loading...</div>}>
                <CafeInfoListPage
                  setOpenDepth2={setOpenDepth2}
                  setDepth2DataId={setDepth2DataId}
                />
              </Suspense>
            )}
            {/* 카페 디테일 요약 페이지 */}
            {depth2Detail === 'content' && !expand && (
              <Suspense fallback={<div>loading...</div>}>
                <Box sx={{ paddingX: 2, paddingY: 0.3 }}>
                  <CafeDetailTitleHeader
                    cafeId={depth2DataId}
                    data={congestion}
                  />
                </Box>
              </Suspense>
            )}
            {/* 카페 디테일 확장 페이지 */}
            {depth2Detail === 'content' && expand && (
              <Suspense fallback={<div>loading...</div>}>
                <Typography>모바일 디테일 페이지</Typography>
                <CafeDetailInfo cafeId={depth2DataId} data={congestion} />
              </Suspense>
            )}
          </ContentBox>
        </StyledBox>
      </SwipeableDrawer>
    </>
  );
};

export default BottomSheet;
