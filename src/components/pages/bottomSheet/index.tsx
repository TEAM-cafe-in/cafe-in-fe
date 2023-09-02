/**
 * @createBy 김해지
 * @description [모바일] 메인 하단 카페 목록용 Bottom Sheet
 */
import { useCallback, useState, Suspense } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';

import { Box, SwipeableDrawer, useTheme } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import CloseIcon from '@mui/icons-material/Close';
import { Global } from '@emotion/react';

import {
  setNavigationContent,
  useNavigationSelector,
} from '~/store/reducers/navigateSlice';
import getCoffeeBeanInfo from '~/pages/api/cafe/getCoffeeBeanInfo';

import {
  EMPTY_TOOL_BAR_HEIGHT,
  TOOL_BAR_HEIGHT,
} from '~/components/organism/appBar';
import CafeInfoListPage from '~/components/organism/cafeInfoList';
import CafeDetailInfo from '~/components/organism/cafeDetailInfo';
import CafeDetailTitleHeader from '~/components/organism/cafeDetailInfo/CafeDetailTitleHeader';
import GoogleMapComponent from '~/components/organism/googleMap';
import CafeDetailComment from '~/components/organism/cafeDetailComment';
import CafeReComment from '~/components/organism/cafeReComment';
import CafeWriteComment from '~/components/organism/cafeWriteComment';
import { CafeComment } from '~/types/cafeInfo';
import { useCafeIdSelector } from '~/store/reducers/cafeIdSlice';
import {
  ButtonContainer,
  ButtonWrapper,
  ContentBox,
  DRAWER_BLEEDING,
  Puller,
  StyledBox,
} from './bottomSheet.styled';

// Bottom Sheet FUll 높이 값 : DRAWER Puller 높이 + Toolbar 높이 + 빈 Toolbar 높이 + 여유 높이
const BOTTOM_SHEET_FULL_HEIGHT =
  DRAWER_BLEEDING + TOOL_BAR_HEIGHT + EMPTY_TOOL_BAR_HEIGHT + 20;

const BottomSheet = () => {
  const theme = useTheme();
  const color1 = theme.palette.grey[100];

  const dispatch = useDispatch();
  const depth2Detail = useNavigationSelector();
  const cafe = useCafeIdSelector();
  const [open, setOpen] = useState(false);

  // 카페 디테일 아이디
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [openDepth2, setOpenDepth2] = useState(false);
  const [depth2DataId, setDepth2DataId] = useState(cafe.cafe_id);

  // 디테일 페이지 확장 상태
  const [expand, setExpand] = useState(true);

  // 혼잡도 확인했을 때 카페 디테일 정보 react query문
  const { data: congestion } = useQuery<CafeComment>(
    ['comment', depth2DataId],
    () => getCoffeeBeanInfo(depth2DataId),
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

  // 요약 페이지로 이동
  const handlePreviousDetail = () => {
    setOpen(false);
    setExpand(false);
  };

  const handlePreviousList = () => {
    dispatch(setNavigationContent('cafelist'));
  };

  return (
    <>
      <Global
        styles={{
          '.MuiDrawer-root > .MuiPaper-root': {
            overflow: 'visible',
            height: `calc(105% - ${DRAWER_BLEEDING}px)`,
          },
          ...(depth2Detail === 'cafelist' && {
            '.MuiDrawer-root > .MuiPaper-root': {
              overflow: 'visible',
              height: `calc(100% - ${BOTTOM_SHEET_FULL_HEIGHT}px)`,
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
            {depth2Detail === 'content' && !expand && congestion && (
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
            {depth2Detail === 'content' && expand && congestion && (
              <Suspense fallback={<div>loading...</div>}>
                <ButtonWrapper>
                  {/* 요약 페이지로 이동 */}
                  <ButtonContainer
                    color1={color1}
                    onClick={handlePreviousDetail}
                  >
                    <KeyboardArrowDownIcon />
                  </ButtonContainer>
                  {/* 리스트 페이지로 이동 */}
                  <ButtonContainer color1={color1} onClick={handlePreviousList}>
                    <CloseIcon />
                  </ButtonContainer>
                </ButtonWrapper>
                {/* 구글 맵 자리 */}
                <div style={{ width: '100%', height: '200px' }}>
                  <GoogleMapComponent />
                </div>
                <CafeDetailInfo cafeId={depth2DataId} data={congestion} />
              </Suspense>
            )}

            {/* 카페 댓글 리스트 페이지 */}
            {depth2Detail === 'comment' && congestion && (
              <CafeDetailComment
                name={congestion?.cafeInfoProjection.name}
                comments={congestion?.comments}
                cafeId={congestion?.cafeInfoProjection.cafeId}
              />
            )}

            {/* 카페 대댓글 리스트 페이지 */}
            {depth2Detail === 're-comment' && <CafeReComment />}

            {/* 카페 댓글 작성 페이지 */}
            {depth2Detail === 'write' && congestion && (
              <CafeWriteComment
                name={congestion?.cafeInfoProjection.name}
                cafeId={congestion?.cafeInfoProjection.cafeId}
              />
            )}
          </ContentBox>
        </StyledBox>
      </SwipeableDrawer>
    </>
  );
};

export default BottomSheet;
