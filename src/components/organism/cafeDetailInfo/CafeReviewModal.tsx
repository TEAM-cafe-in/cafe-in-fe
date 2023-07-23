/**
 * @createBy 한수민
 * @description  카페 리뷰 작성 모달
 */
import { useState, useCallback } from 'react';

import { Button, Typography, useTheme } from '@mui/material';

import Modal from '~/components/atom/modal';
import { RadioReviewButtons } from '~/components/molecule/radioButtons';
import { ReviewContent, ReviewTitle } from './cafeDetailInfo.styled';

interface ReviewProps {
  open: boolean;
  onClose: () => void;
  title: string;
}

const CafeReviewModal = ({ open, onClose, title }: ReviewProps) => {
  const [cafeCongestion, setCafeCongestion] = useState<string>('');
  const [hasPlug, setHasPlug] = useState<string>('');
  const [isClean, setIsClean] = useState<string>('');

  const handleCafeCongestionChange = useCallback((data: string) => {
    setCafeCongestion(data);
  }, []);

  const handleHasPlugChange = useCallback((data: string) => {
    setHasPlug(data);
  }, []);

  const handleIsCleanChange = useCallback((data: string) => {
    setIsClean(data);
  }, []);

  // 카페 리뷰 등록 함수
  const handleCafeReview = () => {
    console.log(cafeCongestion, hasPlug, isClean);
  };

  const theme = useTheme();
  const grayColor = theme.palette.grey[100];

  return (
    <Modal open={open} onClose={onClose}>
      <ReviewTitle color={grayColor}>
        <Button color="secondary" onClick={onClose}>
          취소
        </Button>
        <Typography variant="h5">{title}</Typography>
        <Button onClick={handleCafeReview}>등록</Button>
      </ReviewTitle>

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
    </Modal>
  );
};
export default CafeReviewModal;
