/* eslint import/no-cycle: [2, { maxDepth: 1 }] */

import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { RootState, useAppSelector } from '~/store';

interface User {
  isLogged: boolean;
  id: number;
  nickname: string;
  profile_image: string;
  email: string;
}

export interface UserState {
  user: User;
}

const initialState: UserState = {
  user: {
    isLogged: false,
    id: 0,
    nickname: '',
    profile_image: '',
    email: '',
  },
};

// 사용자 정보 Slice
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData(state: UserState, { payload }: PayloadAction<User>) {
      state.user.isLogged = payload.isLogged;
      state.user.id = payload.id;
      state.user.nickname = payload.nickname;
      state.user.profile_image = payload.profile_image;
      state.user.email = payload.email;
    },
  },
});

export const { setUserData } = userSlice.actions;

export const useAccessUserSelector = () =>
  useAppSelector((rootState: RootState) => rootState.user.user);

export default userSlice.reducer;
