/**
 * @createBy 한수민
 * @description 카페 디테일 컴포넌트
 */
import { useQuery } from '@tanstack/react-query';

import { ListItem, useTheme } from '@mui/material';

import { CafeComment } from '~/types/cafeInfo';
import getCoffeeBeanInfo from '~/pages/api/cafe/getCoffeeBeanInfo';
import { useAccessTokenSelector } from '~/store/reducers/authSlice';
import CafePlaceInfo from './CafePlaceInfo';
// import CafeCommunity from './CafeCommunity';
import CafeDetailTitle from './CafeDetailTitle';
import CafeCongestionStatus from './CafeCongestionStatus';
import {
  CafeContentContainer,
  CafeDetailContainer,
} from './cafeDetailInfo.styled';

interface DetailProps {
  cafeId: string;
}

const CafeDetailInfo = ({ cafeId }: DetailProps) => {
  const token = useAccessTokenSelector();
  const theme = useTheme();
  const grayColor = theme.palette.grey[100];

  // 혼잡도 확인했을 때 카페 디테일 정보 react query문
  const { data } = useQuery<CafeComment>(
    ['comment', cafeId],
    () => getCoffeeBeanInfo({ token, cafeId }),
    {
      suspense: true,
      enabled: !!cafeId, // cafeId가 없을 때 실행 X
    }
  );

  // console.log('혼잡도 댓글', data);
  // data?.averageCongestion === '0' => 혼잡도 확인 전
  return (
    <ListItem>
      {data && (
        <CafeDetailContainer>
          <CafeContentContainer color={grayColor}>
            {/* 카페 디테일 제목과 리뷰 등록 컴포넌트 */}
            <CafeDetailTitle
              name={data?.cafeInfoProjection.name}
              status={data?.cafeInfoProjection.status}
              cafeId={cafeId}
            />
            {/* 카페 혼잡도 확인 버튼 컴포넌트 */}
            <CafeCongestionStatus
              status={data?.cafeInfoProjection.averageCongestion}
              cafeId={cafeId}
            />
          </CafeContentContainer>
          <CafePlaceInfo
            address={data?.cafeInfoProjection.address}
            phoneNumber={data?.cafeInfoProjection.phoneNumber}
            isCongestion={data?.cafeInfoProjection.averageCongestion !== '0'}
            hasPlugCount={data?.cafeInfoProjection.hasPlugCount}
            isCleanCount={data?.cafeInfoProjection.isCleanCount}
          />
          {/* {data?.comment && <CafeCommunity comment={length(data.comments)} />} */}
        </CafeDetailContainer>
      )}
    </ListItem>
  );
};
export default CafeDetailInfo;
