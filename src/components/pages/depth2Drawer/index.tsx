/**
 * @createdBy 김해지
 * @description 메인 레이아웃 사이드 메뉴 Depth2
 */
import { useQuery } from '@tanstack/react-query';

import { List } from '@mui/material';

import { useNavigationSelector } from '~/store/reducers/navigateSlice';
import CafeDetailComment from '~/components/organism/cafeDetailComment';
import CafeReComment from '~/components/organism/cafeReComment';
import CafeWriteComment from '~/components/organism/cafeWriteComment';
import CafeDetailInfo from '~/components/organism/cafeDetailInfo';
import getCoffeeBeanInfo from '~/pages/api/cafe/getCoffeeBeanInfo';
import { CafeComment } from '~/types/cafeInfo';
import MypageSetting from '~/components/organism/mypageSetting';
import { useCafeIdSelector } from '~/store/reducers/cafeIdSlice';
import { Drawer } from '../drawer/drawer.styled';

interface Depth2DrawerProps {
  open: boolean;
}

const Depth2Drawer = ({ open }: Depth2DrawerProps) => {
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
    <Drawer variant="permanent" isSecondProps open={open}>
      {/* 카페 디테일 페이지 */}
      {(navigate === 'content' || navigate === 'search-detail') &&
        congestion &&
        cafe && (
          <List>
            <CafeDetailInfo data={congestion} />
          </List>
        )}

      {/* 카페 댓글 리스트 페이지 */}
      {(navigate === 'comment' || navigate === 'search-comment') &&
        congestion && (
          <CafeDetailComment
            cafeId={cafe.cafeId}
            name={congestion?.cafeInfoProjection.name}
            comments={congestion?.comments}
          />
        )}

      {/* 카페 대댓글 리스트 페이지 */}
      {(navigate === 're-comment' || navigate === 'search-re-comment') && (
        <CafeReComment />
      )}

      {/* 카페 댓글 작성 페이지 */}
      {(navigate === 'write' || navigate === 'search-write') && congestion && (
        <CafeWriteComment
          name={congestion?.cafeInfoProjection.name}
          cafeId={congestion?.cafeInfoProjection.cafeId}
        />
      )}

      {/* 마이페이지 설정 페이지 */}
      {navigate === 'setting' && <MypageSetting />}
    </Drawer>
  );
};

export default Depth2Drawer;
