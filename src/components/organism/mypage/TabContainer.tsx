/* eslint-disable react-hooks/rules-of-hooks */
/**
 * @createdBy 김해지
 * @description 마이페이지 탭 영역
 */

import { SyntheticEvent, useCallback, useMemo, useState } from 'react';

import { Box, Divider, Tab, Tabs, useTheme } from '@mui/material';
import { useQuery } from '@tanstack/react-query';

import { MyPageResponse, MyPageTab, TMyPageTabKey } from '~/types/mypage';
import Recently from '~/components/molecule/mypage/Recently';
import Post from '~/components/molecule/mypage/Post';
import getMemberMyPage from '~/pages/api/member/getMemberMyPage';
import { useAccessTokenSelector } from '~/store/reducers/authSlice';

const TabContainer = () => {
  const theme = useTheme();
  const token = useAccessTokenSelector();
  const { data } = useQuery(['mypage'], () => getMemberMyPage(token), {
    suspense: true,
  });

  const { cafeInfoViewedByMemberDTOS, reviewCount, reviewDTOS } =
    data as MyPageResponse;

  // recently, post
  const [tabKey, setTabKey] = useState<TMyPageTabKey>('recently');

  // 탭 활성화 여부에 따른 폰트 스타일 변경
  const getFontStyle = useCallback(
    (value: TMyPageTabKey) => {
      if (value === tabKey) {
        return theme.typography.h5;
      }

      return {
        ...theme.typography.h5,
        color: theme.palette.grey[400],
        fontFamily: 'PretendardRegular',
      };
    },
    [tabKey, theme.palette.grey, theme.typography.h5]
  );

  const tabList = useMemo<MyPageTab[]>(() => {
    return [
      { label: '최근 본 매장', value: 'recently' },
      { label: `작성한 게시물 ${reviewCount}`, value: 'post' },
    ];
  }, [reviewCount]);

  const onChangeTabKey = useCallback(
    (e: SyntheticEvent, newTabKey: TMyPageTabKey) => {
      setTabKey(newTabKey);
    },
    []
  );

  return (
    <Box>
      {/*  Toggle Tabs */}
      <Tabs value={tabKey} onChange={onChangeTabKey} variant="fullWidth">
        {tabList.map((v) => (
          <Tab
            key={v.value}
            label={v.label}
            value={v.value}
            sx={getFontStyle(v.value)}
          />
        ))}
      </Tabs>

      <Divider />

      {/* Tab Content */}
      <Box sx={{ p: 0 }}>
        {tabKey === 'recently' && (
          <Recently items={cafeInfoViewedByMemberDTOS} />
        )}
        {tabKey === 'post' && <Post items={reviewDTOS} />}
      </Box>
    </Box>
  );
};

export default TabContainer;
