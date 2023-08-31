/**
 * @createdBy 김해지
 * @description 메인 레이아웃 사이드 메뉴 Depth2
 */
import { useQuery } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';

import { List } from '@mui/material';

import { useDepth2ContentSelector } from '~/store/reducers/depth2ContentSlice';
import CafeDetailComment from '~/components/organism/cafeDetailComment';
import CafeReComment from '~/components/organism/cafeReComment';
import CafeWriteComment from '~/components/organism/cafeWriteComment';
import CafeDetailInfo from '~/components/organism/cafeDetailInfo';

import getCoffeeBeanInfo from '~/pages/api/cafe/getCoffeeBeanInfo';
import { CafeComment } from '~/types/cafeInfo';
import { Drawer } from '../drawer/drawer.styled';

interface Depth2DrawerProps {
  open: boolean;
  dataId: string;
}

const Depth2Drawer = ({ open, dataId }: Depth2DrawerProps) => {
  const depth2Detail = useDepth2ContentSelector();

  // 혼잡도 확인했을 때 카페 디테일 정보 react query문
  const { data: congestion } = useQuery<CafeComment>(
    ['comment', dataId],
    () => getCoffeeBeanInfo(dataId),
    {
      suspense: true,
      enabled: !!dataId, // cafeId가 없을 때 실행 X
    }
  );

  const dispatch = useDispatch();
  return (
    <Drawer variant="permanent" isSecondProps open={open}>
      {/* 카페 디테일 페이지 */}
      {depth2Detail === 'content' && congestion && (
        <List>
          <CafeDetailInfo cafeId={dataId} data={congestion} />
        </List>
      )}

      {/* 카페 댓글 리스트 페이지 */}
      {depth2Detail === 'comment' && congestion && (
        <CafeDetailComment
          cafeId={dataId}
          name={congestion?.cafeInfoProjection.name}
          comments={congestion?.comments}
        />
      )}

      {/* 카페 대댓글 리스트 페이지 */}
      {depth2Detail === 're-comment' && <CafeReComment />}

      {/* 카페 댓글 작성 페이지 */}
      {depth2Detail === 'write' && congestion && (
        <CafeWriteComment
          name={congestion?.cafeInfoProjection.name}
          cafeId={congestion?.cafeInfoProjection.cafeId}
        />
      )}
    </Drawer>
  );
};

export default Depth2Drawer;
