/**
 * @createdBy 김해지
 * @description 사이드 고정 메뉴
 */

import Image from 'next/image';

import {
  List,
  ListItem,
  ListItemButton,
  ListItemAvatar,
  Typography,
} from '@mui/material';

import { DrawerItem } from '~/types/drawer';
import { useCallback, useState } from 'react';
import { Drawer } from './drawer.styled';
import Depth1Drawer from '../depth1Drawer';

interface MainDrawerProps {
  data: DrawerItem[];
  selectedItem: string;
  handleSelectedItem: (name: string) => void;
}

const MainDrawer = ({
  data,
  selectedItem,
  handleSelectedItem,
}: MainDrawerProps) => {
  // depth1 메뉴 오픈 여부
  const [openDepth1, setOpenDepth1] = useState(true);

  // depth1 메뉴 열기/닫기 함수
  const handleOpenDepth1 = useCallback(() => {
    setOpenDepth1(!openDepth1);
  }, [openDepth1]);

  return (
    <>
      <Drawer variant="permanent">
        <List sx={{ pt: 0 }}>
          {data.map((v) => (
            <ListItem key={v.name} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                selected={selectedItem === v.name}
                onClick={() => handleSelectedItem(v.name)}
                sx={{
                  minHeight: 48,
                  justifyContent: 'center',
                  px: 2.5,
                  textAlign: 'center',
                }}
              >
                <ListItemAvatar>
                  <Image src={v.src} alt="Profile_01" />
                  {v.text && (
                    <Typography variant="subtitle2">{v.text}</Typography>
                  )}
                </ListItemAvatar>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      <Depth1Drawer open={openDepth1} setOpen={handleOpenDepth1} />
    </>
  );
};

export default MainDrawer;
