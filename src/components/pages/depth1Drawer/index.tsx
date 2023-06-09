/**
 * @createdBy 김해지
 * @description 메인 레이아웃 사이드 메뉴 Depth1
 */
import { useState, useEffect } from 'react';

import { Box } from '@mui/material';
import {
  ArrowLeft as ArrowLeftIcon,
  ArrowRight as ArrowRightIcon,
} from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';

import { DrawerName } from '~/types/drawer';
import MyPage from '~/components/organism/mypage';
import { useCafeIdSelector } from '~/store/reducers/cafeIdSlice';
import Depth2Drawer from '~/components/pages/depth2Drawer';
import { Drawer } from '~/components/pages/drawer/drawer.styled';
import CafeInfoList from '~/components/organism/cafeInfoList';
import { Depth1Box, SwipeButton, CloseButton } from './depth1Drawer.styled';

interface IDepth1Drawer {
  // 상위 선택된 메뉴 (카페목록/마이페이지)
  selectedMenu: DrawerName;
  open: boolean;
  setOpen: () => void;
}

const Depth1Drawer = ({ selectedMenu, open, setOpen }: IDepth1Drawer) => {
  const cafeId = useCafeIdSelector();

  // depth2 메뉴 오픈 여부
  const [openDepth2, setOpenDepth2] = useState(false);
  const [depth2DataId, setDepth2DataId] = useState('');

  useEffect(() => {
    if (cafeId !== '0') {
      setOpenDepth2(true);
      setDepth2DataId(cafeId);
    }
  }, [cafeId]);

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
        {selectedMenu === 'logo' && (
          <CafeInfoList
            setOpenDepth2={setOpenDepth2}
            setDepth2DataId={setDepth2DataId}
          />
        )}
        {selectedMenu === 'mypage' && <MyPage />}
      </Drawer>

      <Depth2Drawer open={openDepth2} dataId={depth2DataId} />

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
