/**
 * @createdBy 김해지
 * @description 메인 레이아웃 사이드 메뉴 Depth1
 */

import { Box, List, ListItem, ListItemButton } from '@mui/material';
import {
  ArrowLeft as ArrowLeftIcon,
  ArrowRight as ArrowRightIcon,
} from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';

import { useState } from 'react';
import { Drawer } from '../drawer/drawer.styled';
import Depth2Drawer from '../depth2Drawer';
import { Depth1Box, SwipeButton, CloseButton } from './depth1Drawer.styled';

interface IDepth1Drawer {
  open: boolean;
  setOpen: () => void;
}

const Depth1Drawer = ({ open, setOpen }: IDepth1Drawer) => {
  // depth2 메뉴 오픈 여부
  const [openDepth2, setOpenDepth2] = useState(true);

  // depth1 메뉴 열기/닫기 handler 함수
  const handleOpen = () => {
    // depth1이 비활성화인 경우 depth2도 같이 비활성화
    if (open) {
      setOpenDepth2(false);
    }

    // open 이 true인 경우 fasle로, fals인 경우 true로 변경
    setOpen();
  };

  return (
    <Depth1Box>
      <Drawer variant="permanent" isSecondProps open={open}>
        <Box>
          <List>
            <ListItem>
              <ListItemButton onClick={() => setOpenDepth2(true)}>
                depth2
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>

      <Depth2Drawer open={openDepth2} />

      <Box display="flex" flexDirection="column">
        {/* Depth2 활성화된 경우 Close 버튼 표시 */}
        {openDepth2 && (
          <CloseButton onClick={() => setOpenDepth2(false)}>
            <CloseIcon fontSize="small" color="info" />
          </CloseButton>
        )}

        {/* Depth1 활성화된 경우 Close 버튼 표시 */}
        <Box flexGrow={1} display="flex" alignItems="center">
          <SwipeButton onClick={handleOpen}>
            {open ? (
              <ArrowLeftIcon fontSize="small" color="primary" />
            ) : (
              <ArrowRightIcon fontSize="small" color="primary" />
            )}
          </SwipeButton>
        </Box>
      </Box>
    </Depth1Box>
  );
};

export default Depth1Drawer;
