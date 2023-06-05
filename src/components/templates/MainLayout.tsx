/**
 * @createdBy 김해지
 * @description 권한이 필요한 페이지의 Layout
 */

import { ReactNode, useCallback, useState } from 'react';

import { Box, useMediaQuery } from '@mui/material';

import Logo from '~/static/images/logo.png';
import Profile_01 from '~/static/images/Profile_01.png';

import { DrawerItem } from '~/types/drawer';
import Header from '../organism/header';
import Drawer from '../organism/drawer';

interface MainLayoutProps {
  children: ReactNode;
}

const drawerItems: DrawerItem[] = [
  { name: 'logo', src: Logo, text: '' },
  { name: 'mypage', src: Profile_01, text: '마이' },
];

const MainLayout = ({ children }: MainLayoutProps) => {
  /**
   * Media Query Hook
   * 너비가 [0-360] 픽셀이면 true를 반환
   */
  const isMobile = useMediaQuery('(min-width:0px) and (max-width:360px)');

  // 선택중인 메뉴
  const [selectedItem, setSelectedItem] = useState('logo');

  // 메뉴 변경 함수
  const handleSelectedItem = useCallback((name: string) => {
    setSelectedItem(name);
  }, []);

  return (
    <Box style={{ display: 'flex' }}>
      {/* Header 영역 */}
      {isMobile && <Header />}
      {/* Side Menu 영역 */}
      {!isMobile && (
        <Drawer
          data={drawerItems}
          selectedItem={selectedItem}
          handleSelectedItem={handleSelectedItem}
        />
      )}
      {/* Side Menu에 해당하는 Drawer 영역 */}

      {/* 현재 라우팅된 페이지 */}
      <Box component="main" sx={{ flexGrow: 1, p: 3, backgroundColor: 'gray' }}>
        {children}
      </Box>
    </Box>
  );
};

export default MainLayout;
