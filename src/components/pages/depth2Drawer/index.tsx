/**
 * @createdBy 김해지
 * @description 메인 레이아웃 사이드 메뉴 Depth2
 */

import { Suspense } from 'react';

import { List } from '@mui/material';

import CafeDetailInfo from '~/components/organism/cafeDetailInfo';
import CafeComment from '~/components/organism/cafeComment';
import { useDepth2ContentSelector } from '~/store/reducers/depth2ContentSlice';
import { Drawer } from '../drawer/drawer.styled';

interface Depth2DrawerProps {
  open: boolean;
  dataId: string;
}

const Depth2Drawer = ({ open, dataId }: Depth2DrawerProps) => {
  const depth2Detail = useDepth2ContentSelector();
  return (
    <Drawer variant="permanent" isSecondProps open={open}>
      {depth2Detail === 'content' && (
        <List>
          <Suspense fallback={<div>loading...</div>}>
            <CafeDetailInfo cafeId={dataId} />
          </Suspense>
        </List>
      )}
      {depth2Detail === 'comment' && (
        <List>
          <CafeComment />
        </List>
      )}
    </Drawer>
  );
};

export default Depth2Drawer;
