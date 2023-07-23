/**
 * @createBy 한수민
 * @description 카페 디테일 컴포넌트
 */

import { useState, useCallback } from 'react';

import { ListItem, Typography, Box, useTheme } from '@mui/material';

import { WriteButton } from '~/components/atom/buttons';
import { RadioStatusBoxButton } from '~/components/molecule/radioButtons';
import { useCafeInfoSelector } from '~/store/reducers/cafeInfoSlice';
import { CafeInfo, CafesInfo } from '~/types/cafeInfo';
import CafePlaceInfo from './CafePlaceInfo';
import CafeCommunity from './CafeCommunity';
import {
  CafeContentContainer,
  CafeDetailContainer,
  CafeStatusTypography,
  CafeTitle,
} from './cafeDetailInfo.styled';
import CafeReviewModal from './CafeReviewModal';

interface DetailProps {
  cafeId: string;
}

const CafeDetailInfo = ({ cafeId }: DetailProps) => {
  const [reviewOpen, setReviewOpen] = useState(false);
  const theme = useTheme();
  const grayColor = theme.palette.grey[100];

  const cafeData: CafeInfo = useCafeInfoSelector();
  const datas = cafeData
    ? cafeData?.cafes.filter((cafe: CafesInfo) => cafe.cafeId === cafeId)
    : [];
  const data: CafesInfo = datas[0];

  // Modal 열기 함수
  const openReviewHandler = () => {
    setReviewOpen(true);
  };

  // Modal 닫기 함수
  const closeReviewHandler = useCallback(() => {
    setReviewOpen(false);
  }, []);

  return (
    <ListItem>
      <CafeDetailContainer>
        <CafeReviewModal
          open={reviewOpen}
          onClose={closeReviewHandler}
          title={data?.name}
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
