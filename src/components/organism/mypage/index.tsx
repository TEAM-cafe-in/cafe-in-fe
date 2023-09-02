/**
 * @createdBy 김해지
 * @description 마이페이지
 */

import { Suspense } from 'react';
import { useDispatch } from 'react-redux';
import Image from 'next/image';

import { Box, Divider, IconButton, Typography, useTheme } from '@mui/material';

import Setting from '~/static/images/setting.svg';
import Badge from '~/static/images/badge.png';
import Profile from '~/components/atom/profile';
import TabContainer from '~/components/organism/mypage/TabContainer';
import { setNavigationContent } from '~/store/reducers/navigateSlice';
import { ProfileContainer, BadgeImg } from './mypage.styled';

const MyPage = () => {
  const theme = useTheme();
  const dispatch = useDispatch();

  return (
    <Box>
      <Box>
        <IconButton sx={{ position: 'absolute', right: 20, top: 20 }}>
          <Image
            src={Setting}
            alt="setting"
            width={24}
            height={24}
            onClick={() => {
              dispatch(setNavigationContent('setting'));
            }}
          />
        </IconButton>
        <ProfileContainer>
          <BadgeImg src={Badge} alt="edit" />
          <IconButton>
            <Profile size="lg" />
          </IconButton>
          <Typography variant="h3">김선우</Typography>
        </ProfileContainer>
      </Box>

      <Divider sx={{ borderWidth: 3, borderColor: theme.palette.grey[100] }} />

      {/* 마이페이지 탭 영역 */}
      <Suspense fallback={<div>loading...</div>}>
        <TabContainer />
      </Suspense>
    </Box>
  );
};

export default MyPage;
