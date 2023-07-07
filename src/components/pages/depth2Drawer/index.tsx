/**
 * @createdBy 김해지
 * @description 메인 레이아웃 사이드 메뉴 Depth2
 */

import { Box, List } from '@mui/material';

import CafeDetailInfo from '~/components/organism/cafeDetailInfo';
import { Drawer } from '../drawer/drawer.styled';

interface Depth2DrawerProps {
  open: boolean;
  dataId: string;
}

const Depth2Drawer = ({ open, dataId }: Depth2DrawerProps) => {
  return (
    <Drawer variant="permanent" isSecondProps open={open}>
      <Box>
        <List>
          <CafeDetailInfo cafeId={dataId} />
        </List>
      </Box>
    </Drawer>
  );
};

export default Depth2Drawer;
