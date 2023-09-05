import { useQuery } from '@tanstack/react-query';

import { Box } from '@mui/material';

import { useCafeIdSelector } from '~/store/reducers/cafeIdSlice';
import { useNavigationSelector } from '~/store/reducers/navigateSlice';
import { CafeComment } from '~/types/cafeInfo';

import CafeDetailComment from '~/components/organism/cafeDetailComment';
import CafeReComment from '~/components/organism/cafeReComment';
import CafeWriteComment from '~/components/organism/cafeWriteComment';
import getCoffeeBeanInfo from '~/pages/api/cafe/getCoffeeBeanInfo';

const MobilePage = () => {
  const navigate = useNavigationSelector();
  const cafe = useCafeIdSelector();

  // 혼잡도 확인했을 때 카페 디테일 정보 react query문
  const { data: congestion } = useQuery<CafeComment>(
    ['comment', cafe.cafeId],
    () => getCoffeeBeanInfo(cafe.cafeId),
    {
      suspense: true,
      enabled: !!cafe.cafeId, // cafeId가 없을 때 실행 X
    }
  );

  return (
    <Box sx={{ width: '100%' }}>
      {/* 카페 댓글 리스트 페이지 */}
      {navigate === 'comment' && congestion && (
        <CafeDetailComment
          name={congestion?.cafeInfoProjection.name}
          comments={congestion?.comments}
          cafeId={congestion?.cafeInfoProjection.cafeId}
        />
      )}

      {/* 카페 대댓글 리스트 페이지 */}
      {navigate === 're-comment' && <CafeReComment />}

      {/* 카페 댓글 작성 페이지 */}
      {navigate === 'write' && congestion && (
        <CafeWriteComment
          name={congestion?.cafeInfoProjection.name}
          cafeId={congestion?.cafeInfoProjection.cafeId}
        />
      )}
    </Box>
  );
};
export default MobilePage;
