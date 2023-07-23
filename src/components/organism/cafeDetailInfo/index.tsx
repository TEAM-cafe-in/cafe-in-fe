/**
 * @createBy 한수민
 * @description 카페 디테일 컴포넌트
 */

import { useState, useCallback, useMemo } from 'react';

import { ListItem, Typography, Box, useTheme } from '@mui/material';

import { WriteButton } from '~/components/atom/buttons';
import { RadioStatusBoxButton } from '~/components/molecule/radioButtons';
import { useCafeInfoSelector } from '~/store/reducers/cafeInfoSlice';
import { CafeInfo, CafesInfo } from '~/types/cafeInfo';
import { ActionButton } from '~/types/popup';
import CafeReviewModal from './CafeReviewModal';
import CafePlaceInfo from './CafePlaceInfo';
import CafeCommunity from './CafeCommunity';
import {
  CafeContentContainer,
  CafeDetailContainer,
  CafeStatusTypography,
  CafeTitle,
} from './cafeDetailInfo.styled';
import CafeReviewSuccessPopup from './CafeReviewSuccessPopup';

interface DetailProps {
  cafeId: string;
}

const CafeDetailInfo = ({ cafeId }: DetailProps) => {
  // 리뷰 등록 모달 상태
  const [reviewOpen, setReviewOpen] = useState<boolean>(false);
  // 리뷰 등록 성공 팝업 모달 상태
  const [reviewPopUp, setReviewPopUp] = useState<boolean>(false);
  // 커피빈 남은 개수
  const [coffeeCount, setCoffeeCount] = useState<number>(0);

  const theme = useTheme();
  const grayColor = theme.palette.grey[100];

  // 실제 카페 디테일 데이터
  const cafeData: CafeInfo = useCafeInfoSelector();
  const datas = cafeData
    ? cafeData?.cafes.filter((cafe: CafesInfo) => cafe.cafeId === cafeId)
    : [];
  const data: CafesInfo = datas[0];

  // 커피 남은 콩 개수 update 함수
  const updateCoffeCount = useCallback((coffee: number) => {
    setCoffeeCount(coffee);
  }, []);

  // 리뷰 Modal 열기 함수
  const openReviewHandler = () => {
    setReviewOpen(true);
  };

  // 리뷰 Modal 닫기 함수
  const closeReviewHandler = useCallback(() => {
    setReviewOpen(false);
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

  return (
    <ListItem>
      <CafeDetailContainer>
        {/* 카페 리뷰 등록 모달 */}
        <CafeReviewModal
          cafeId={cafeId}
          open={reviewOpen}
          onClose={closeReviewHandler}
          title={data?.name}
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

        <CafeContentContainer color={grayColor}>
          <CafeTitle>
            <Box>
              <Typography variant="h3" mr="4px" mt="7px">
                {data?.name}
              </Typography>
              <CafeStatusTypography
                color={grayColor}
                variant="subtitle2"
                mt="5px"
              >
                {data?.status}
              </CafeStatusTypography>
            </Box>
            {/* 리뷰 작성 버튼 */}
            <WriteButton onClick={openReviewHandler} />
          </CafeTitle>
          <RadioStatusBoxButton status={data?.averageCongestion} />
        </CafeContentContainer>
        <CafePlaceInfo
          address={data?.address}
          phoneNumber={data?.phoneNumber}
        />
        {data?.commentReviewCount && (
          <CafeCommunity comment={data?.commentReviewCount} />
        )}
      </CafeDetailContainer>
    </ListItem>
  );
};
export default CafeDetailInfo;
