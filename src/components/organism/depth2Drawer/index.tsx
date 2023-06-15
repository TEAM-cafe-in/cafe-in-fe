/**
 * @createdBy 김해지
 * @description 메인 레이아웃 사이드 메뉴 Depth2
 */

import { Box, List, ListItem, ListItemText } from '@mui/material';

import { Drawer } from '../drawer/drawer.styled';

interface Depth2DrawerProps {
  open: boolean;
}

const Depth2Drawer = ({ open }: Depth2DrawerProps) => {
  return (
    <Drawer variant="permanent" isSecondProps open={open}>
      <Box>
        <List>
          <ListItem>
            <ListItemText>sss</ListItemText>
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
};

export default Depth2Drawer;
