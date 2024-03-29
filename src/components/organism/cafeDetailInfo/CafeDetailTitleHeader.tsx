import { useTheme } from '@mui/material';

import { CafeComment } from '~/types/cafeInfo';
import CafeCongestionStatus from './CafeCongestionStatus';
import CafeDetailTitle from './CafeDetailTitle';
import { CafeContentContainer } from './cafeDetailInfo.styled';

interface DetailProps {
  data: CafeComment;
}

const CafeDetailTitleHeader = ({ data }: DetailProps) => {
  const theme = useTheme();
  const grayColor = theme.palette.grey[100];
  return (
    <CafeContentContainer color={grayColor}>
      {/* 카페 디테일 제목과 리뷰 등록 컴포넌트 */}
      <CafeDetailTitle
        name={data?.cafeInfoProjection.name}
        status={data?.cafeInfoProjection.status}
        address={data?.cafeInfoProjection.address}
      />
      {/* 카페 혼잡도 확인 버튼 컴포넌트 */}
      <CafeCongestionStatus
        status={data?.cafeInfoProjection.averageCongestion}
      />
    </CafeContentContainer>
  );
};
export default CafeDetailTitleHeader;
