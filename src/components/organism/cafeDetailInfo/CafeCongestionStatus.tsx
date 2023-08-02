/**
 * @createdBy 한수민
 * @description 카페 혼잡도 확인 버튼 컴포넌트
 */

import { useCallback, useMemo, useState } from 'react';

import { Box } from '@mui/material';

import { useAccessTokenSelector } from '~/store/reducers/authSlice';
import { RadioStatusBoxButton } from '~/components/molecule/radioButtons';
import { useAddCoffeeBeanMutation } from '~/pages/api/cafe/useCoffeeBean';
import { ActionButton } from '~/types/popup';
import { TCafeCongestion } from '~/types/radio';
import CafeCongestionPopup from './CafeCongestionPopup';

interface CongestionProps {
  status: TCafeCongestion;
  cafeId: string;
}
const CafeCongestionStatus = ({ status, cafeId }: CongestionProps) => {
  const token = useAccessTokenSelector();
  // 실시간 혼잡도 확인하기
  const [cafeCongestionPopup, setCafeCongestionPopup] =
    useState<boolean>(false);

  // 혼잡도 확인 react query 문
  const { mutate: CoffeeBeanMutate } = useAddCoffeeBeanMutation({
    token,
    cafeId,
  });

  // 혼잡도 확인 팝업 열기 함수
  const openCafeCongestionPopup = useCallback(() => {
    setCafeCongestionPopup(true);
  }, []);

  // 혼잡도 확인 팝업 닫기 함수
  const closeCafeCongestionPopup = useCallback(() => {
    setCafeCongestionPopup(false);
  }, []);

  // 혼잡도 확인하는 버튼 함수
  const handleCoffeCongestion = useCallback(() => {
    CoffeeBeanMutate({ token, cafeId });
    closeCafeCongestionPopup();
  }, [CoffeeBeanMutate, closeCafeCongestionPopup, token, cafeId]);

  // 혼잡도 확인 팝업 Button 목록
  const congestionActions: ActionButton[] = useMemo(() => {
    return [
      {
        title: ' 정보 확인하기',
        type: 'confirm',
        onClick: handleCoffeCongestion,
      },
      { title: '취소', type: 'close', onClick: closeCafeCongestionPopup },
    ];
  }, [closeCafeCongestionPopup, handleCoffeCongestion]);

  return (
    <Box>
      {/* 카페 혼잡도 확인 팝업 모달 */}
      <CafeCongestionPopup
        open={cafeCongestionPopup}
        onClose={closeCafeCongestionPopup}
        actions={congestionActions}
      />
      {status === '0' ? (
        <RadioStatusBoxButton
          status={status}
          onClick={openCafeCongestionPopup}
        />
      ) : (
        <RadioStatusBoxButton status={status} />
      )}
    </Box>
  );
};
export default CafeCongestionStatus;
