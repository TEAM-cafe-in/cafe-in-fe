/**
 * @createBy 한수민
 * @description 카페 디테일 제목 컴포넌트(리뷰 등록)
 */

import { useCallback, useMemo, useState } from 'react';

import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';

import { WriteButton } from '~/components/atom/buttons';
import { ActionButton } from '~/types/popup';
import CafeReviewSuccessPopup from './CafeReviewSuccessPopup';
import CafeReviewModal from './CafeReviewModal';
import {
  CafeStatusTypography,
  CafeTitle,
  CafeTitleContainer,
} from './cafeDetailInfo.styled';

interface CafeTitleProps {
  name: string;
  status: string;
  cafeId: string;
  address: string;
}

const query = '(min-width:0px) and (max-width:600px)';

const CafeDetailTitle = ({ name, status, cafeId, address }: CafeTitleProps) => {
  const theme = useTheme();
  const grayColor = theme.palette.grey[100];

  const isMobile = useMediaQuery(query, { noSsr: false });

  // 리뷰 등록 모달 상태
  const [reviewOpen, setReviewOpen] = useState<boolean>(false);
  // 리뷰 등록 성공 팝업 모달 상태
  const [reviewPopUp, setReviewPopUp] = useState<boolean>(false);
  // 커피빈 남은 개수
  const [coffeeCount, setCoffeeCount] = useState<number>(0);

  // 커피 남은 콩 개수 update 함수
  const updateCoffeCount = useCallback((coffee: number) => {
    setCoffeeCount(coffee);
  }, []);

  // 리뷰 Modal 열기 함수
  const openReviewHandler = useCallback(() => {
    setReviewOpen(true);
  }, []);

  // 리뷰 성공 팝업 열기 함수
  const openReviewPopup = useCallback(() => {
    setReviewPopUp(true);
  }, []);

  // 리뷰 성공 팝업 닫기 함수
  const closePopup = useCallback(() => {
    setReviewPopUp(false);
  }, []);

  // 리뷰 성공 팝업 확인 함수
  const onConfirm = useCallback(() => {
    closePopup();
  }, [closePopup]);

  // 리뷰 성공 팝업 Button 목록
  const actions: ActionButton[] = useMemo(() => {
    return [
      {
        title: '다른 카페 정보 보러가기',
        type: 'confirm',
        onClick: onConfirm,
      },
      { title: '확인', type: 'close', onClick: closePopup },
    ];
  }, [closePopup, onConfirm]);

  // 리뷰 Modal 닫기 함수
  const closeReviewHandler = useCallback(() => {
    setReviewOpen(false);
  }, []);

  return (
    <Box>
      {/* 카페 리뷰 등록 모달 */}
      <CafeReviewModal
        cafeId={cafeId}
        open={reviewOpen}
        onClose={closeReviewHandler}
        title={name}
        reviewSuccess={openReviewPopup}
        setReviewCount={updateCoffeCount}
      />
      {/* 카페 리뷰 등록 성공 팝업 모달 */}
      <CafeReviewSuccessPopup
        reviewPopup={reviewPopUp}
        coffeeCount={coffeeCount}
        actions={actions}
        closePopup={closePopup}
      />
      <CafeTitle>
        <Box>
          <Typography variant="h3" mr="4px" mt="7px">
            {name}
          </Typography>
          <CafeTitleContainer>
            <CafeStatusTypography
              color={grayColor}
              variant="subtitle2"
              mt="5px"
            >
              {status}
            </CafeStatusTypography>
            {isMobile && (
              <Typography variant="subtitle2" mt="7px" ml="5px">
                {address}
              </Typography>
            )}
          </CafeTitleContainer>
        </Box>
        {/* 리뷰 작성 버튼 */}
        <WriteButton onClick={openReviewHandler} />
      </CafeTitle>
    </Box>
  );
};
export default CafeDetailTitle;
