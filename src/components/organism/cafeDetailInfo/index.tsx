/**
 * @createBy 한수민
 * @description 카페 디테일 컴포넌트
 */
import { ListItem } from '@mui/material';

import { CafeComment } from '~/types/cafeInfo';
import CafePlaceInfo from './CafePlaceInfo';
import CafeCommunity from './CafeCommunity';
import { CafeDetailContainer } from './cafeDetailInfo.styled';
import CafeDetailTitleHeader from './CafeDetailTitleHeader';

interface DetailProps {
  data: CafeComment;
}

const CafeDetailInfo = ({ data }: DetailProps) => {
  return (
    <ListItem>
      {data && (
        <CafeDetailContainer>
          <CafeDetailTitleHeader data={data} />
          <CafePlaceInfo
            address={data?.cafeInfoProjection.address}
            phoneNumber={data?.cafeInfoProjection.phoneNumber}
            isCongestion={data?.cafeInfoProjection.averageCongestion !== '0'}
            hasPlugCount={data?.cafeInfoProjection.hasPlugCount}
            isCleanCount={data?.cafeInfoProjection.isCleanCount}
          />
          {data?.comments && <CafeCommunity comment={data?.comments} />}
        </CafeDetailContainer>
      )}
    </ListItem>
  );
};
export default CafeDetailInfo;
