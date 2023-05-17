import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { RootState, useAppSelector } from '..';

interface Auth {
  access_token: string;
  refresh_token: string;
}

export interface AuthState {
  auth: Auth;
}

const initialState: AuthState = {
  auth: {
    access_token: '11',
    refresh_token: '',
  },
};

// 사용자 인증 Slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken(state: AuthState, { payload }: PayloadAction<Auth>) {
      state.auth.access_token = payload.access_token;
      state.auth.refresh_token = payload.refresh_token;
    },
  },
});

export const { setToken } = authSlice.actions;

export const accessTokenSelector = () =>
  useAppSelector((rootState: RootState) => rootState.auth.auth.access_token);

export default authSlice.reducer;
