/* eslint import/no-cycle: [2, { maxDepth: 1 }] */

import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { RootState, useAppSelector } from '~/store';
import { CafeInfo } from '~/types/cafeInfo';

export interface CafeInfoState {
  data: CafeInfo | null;
}

export const initialCafeInfoState: CafeInfoState = {
  data: null,
};

const cafeInfoSlice = createSlice({
  name: 'cafeInfo',
  initialState: initialCafeInfoState,
  reducers: {
    setCafeInfo(state: CafeInfoState, { payload }: PayloadAction<CafeInfo>) {
      state.data = payload;
    },
    clearCafeInfo(state: CafeInfoState) {
      state.data = null;
    },
  },
});

export const { setCafeInfo, clearCafeInfo } = cafeInfoSlice.actions;

export const useCafeInfoSelector = () =>
  useAppSelector((rootState: RootState) => rootState.cafeInfo.data);

export default cafeInfoSlice.reducer;
