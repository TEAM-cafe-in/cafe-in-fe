/**
 * @createdBy 김해지
 * @description 권한이 필요한 페이지의 Layout
 */

import { ReactNode, useCallback, useState } from 'react';
import Image from 'next/image';

import { Box, Toolbar, useMediaQuery } from '@mui/material';

import Logo from '~/static/images/logo.png';

import { DrawerItem, DrawerName } from '~/types/drawer';
import AppBar from '~/components/organism/appBar';
import Drawer from '~/components/pages/drawer';
import Profile from '~/components/atom/profile';
import BottomSheet from '~/components/pages/bottomSheet';

interface MainLayoutProps {
  children: ReactNode;
}

const drawerItems: DrawerItem[] = [
  {
    name: 'logo',
    text: '',
    children: <Image src={Logo} alt="로고 이미지" width={30} height={30} />,
  },
  { name: 'mypage', text: '마이', children: <Profile size="sm" /> },
];

const query = '(min-width:0px) and (max-width:600px)';

const MainLayout = ({ children }: MainLayoutProps) => {
  /**
   * Media Query Hook (SSR에서 동작)
   * 너비가 [0-360] 픽셀이면 true를 반환
   */
  const isMobile = useMediaQuery(query, { noSsr: false });

  // 선택중인 메뉴
  const [selectedMenu, setSelectedMenu] = useState<DrawerName>('logo');

  // 메뉴 변경 함수
  const handleSelectedMenu = useCallback((name: DrawerName) => {
    setSelectedMenu(name);
  }, []);

  return (
    <Box style={{ display: 'flex' }}>
      {/* 모바일 AppBar 영역 */}
      {isMobile && <AppBar />}

      {/* PC 용 Side Menu 영역 */}
      {!isMobile && (
        <Drawer
          data={drawerItems}
          selectedMenu={selectedMenu}
          handleSelectedMenu={handleSelectedMenu}
        />
      )}

      <Box component="main" sx={{ flexGrow: 1, backgroundColor: 'gray' }}>
        {/* Mobile 용 AppBar 영역만큼 차지해줌 */}
        {isMobile && <Toolbar />}

        {/* 현재 라우팅된 페이지 */}
        {children}

        {/* Mobile 전용 BottomSheet 영역  */}
        {isMobile && <BottomSheet />}
      </Box>
    </Box>
  );
};

export default MainLayout;
