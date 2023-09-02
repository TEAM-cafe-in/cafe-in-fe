/**
 * @createdBy 김해지
 * @description 사이드 고정 메뉴
 */
import { useCallback, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import {
  List,
  ListItem,
  ListItemButton,
  ListItemAvatar,
  Typography,
} from '@mui/material';

import { DrawerItem, DrawerName } from '~/types/drawer';
import {
  setNavigationContent,
  useNavigationSelector,
} from '~/store/reducers/navigateSlice';
import { Drawer } from './drawer.styled';
import Depth1Drawer from '../depth1Drawer';

interface MainDrawerProps {
  data: DrawerItem[];
  // 상위 선택된 메뉴 (카페목록/마이페이지)
  selectedMenu: DrawerName;
  // 상위 선택된 메뉴 변경 함수
  handleSelectedMenu: (name: DrawerName) => void;
}

const MainDrawer = ({
  data,
  selectedMenu,
  handleSelectedMenu,
}: MainDrawerProps) => {
  // depth1 메뉴 오픈 여부
  const [openDepth1, setOpenDepth1] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigationSelector();

  useEffect(() => {
    if (navigate === 'search-detail') {
      setOpenDepth1(false);
    }
  }, [navigate]);

  // depth1 메뉴 열기/닫기 함수
  const handleOpenDepth1 = useCallback(() => {
    setOpenDepth1(!openDepth1);
  }, [openDepth1]);

  const handleSelectMenuClick = (name: DrawerName) => {
    handleSelectedMenu(name);
    dispatch(setNavigationContent(name === 'logo' ? 'cafelist' : 'mypage'));
  };

  return (
    <>
      <Drawer variant="permanent">
        <List sx={{ pt: 0 }}>
          {data.map((v) => (
            <ListItem key={v.name} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                selected={selectedMenu === v.name}
                onClick={() => handleSelectMenuClick(v.name)}
              >
                <ListItemAvatar sx={{ m: '0 auto', minWidth: 'auto' }}>
                  {v.children}
                  {v.text && (
                    <Typography variant="subtitle2" textAlign="center">
                      {v.text}
                    </Typography>
                  )}
                </ListItemAvatar>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      <Depth1Drawer
        selectedMenu={selectedMenu}
        open={openDepth1}
        setOpen={handleOpenDepth1}
      />
    </>
  );
};

export default MainDrawer;
