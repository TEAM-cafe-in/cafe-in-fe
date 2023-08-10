/**
 * @createBy 한수민
 * @description  [모바일] 카페 리뷰 작성 모달
 */
import { useState, useCallback } from 'react';
import { useMutation } from '@tanstack/react-query';

import { Button, Typography, useTheme } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import Modal from '~/components/atom/modal';
import { RadioReviewButtons } from '~/components/molecule/radioButtons';
import { useAccessTokenSelector } from '~/store/reducers/authSlice';
import addCafeReview from '~/pages/api/cafe/addCafeReview';
import { ReviewContent } from '../cafeDetailInfo.styled';
import { MobileReviewButtons, MobileTitle } from './cafeDetailInfo.styled';

interface ReviewProps {
  cafeId: string;
  open: boolean;
  onClose: () => void;
  title: string;
  reviewSuccess: () => void;
  setReviewCount: (data: number) => void;
}

const CafeReviewMobileModal = ({
  cafeId,
  open,
  onClose,
  title,
  reviewSuccess,
  setReviewCount,
}: ReviewProps) => {
  const theme = useTheme();
  const grayColor = theme.palette.grey[100];
  const mainColor = theme.palette.primary.main;

  const token = useAccessTokenSelector();

  const [cafeCongestion, setCafeCongestion] = useState<string>('');
  const [hasPlug, setHasPlug] = useState<string>('');
  const [isClean, setIsClean] = useState<string>('');

  // 리뷰 작성 react query문
  const { mutate } = useMutation(addCafeReview, {
    onSuccess: (data) => {
      setReviewCount(data.coffeeBean);
      reviewSuccess();
    },
  });

  // 모달 취소
  const handleReviewModalClose = useCallback(() => {
    onClose();
    setCafeCongestion('');
    setHasPlug('');
    setIsClean('');
  }, [onClose]);

  // 혼잡도 상태 update
  const handleCafeCongestionChange = useCallback((data: string) => {
    setCafeCongestion(data);
  }, []);

  // 플러그 유무 상태 update
  const handleHasPlugChange = useCallback((data: string) => {
    setHasPlug(data);
  }, []);

  // 청결도 상태 update
  const handleIsCleanChange = useCallback((data: string) => {
    setIsClean(data);
  }, []);

  // 카페 리뷰 등록 함수
  const handleCafeReview = () => {
    const body = { token, cafeId, cafeCongestion, hasPlug, isClean };
    mutate(body);
    handleReviewModalClose();
  };

  // 등록 버튼 비활성화 함수
  const isButtonDisabled = () => {
    return cafeCongestion === '' || hasPlug === '' || isClean === '';
  };

  return (
    <Modal open={open} onClose={handleReviewModalClose} height="100%">
      <MobileTitle color={grayColor}>
        <Typography variant="h5">{title}</Typography>
        <CloseIcon className="closeIcon" onClick={handleReviewModalClose} />
      </MobileTitle>

      <ReviewContent color={grayColor}>
        <RadioReviewButtons
          type="cafeCongestion"
          state={cafeCongestion}
          setState={handleCafeCongestionChange}
        />
      </ReviewContent>

      <ReviewContent color={grayColor}>
        <RadioReviewButtons
          type="isClean"
          state={isClean}
          setState={handleIsCleanChange}
        />
      </ReviewContent>

      <ReviewContent color={grayColor}>
        <RadioReviewButtons
          type="hasPlug"
          state={hasPlug}
          setState={handleHasPlugChange}
        />
      </ReviewContent>
      <MobileReviewButtons>
        <Button variant="outlined" onClick={handleReviewModalClose}>
          <Typography color={mainColor} variant="button">
            취소
          </Typography>
        </Button>
        <Button
          variant="contained"
          onClick={handleCafeReview}
          disabled={isButtonDisabled()}
        >
          <Typography color="white" variant="button">
            등록
          </Typography>
        </Button>
      </MobileReviewButtons>
    </Modal>
  );
};
export default CafeReviewMobileModal;