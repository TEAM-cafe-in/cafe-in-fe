/* eslint import/no-cycle: [2, { maxDepth: 1 }] */

import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { RootState, useAppSelector } from '~/store';

export interface CafeId {
  cafe_id: string;
}

export interface CafeIdState {
  cafeId: CafeId;
}

export const initialCafeIdState: CafeIdState = {
  cafeId: {
    cafe_id: '0',
  },
};

// 카페 select id Slice
const cafeIdSlice = createSlice({
  name: 'cafeId',
  initialState: initialCafeIdState,
  reducers: {
    setCafeId(state: CafeIdState, { payload }: PayloadAction<CafeId>) {
      state.cafeId.cafe_id = payload.cafe_id;
    },
  },
});

export const { setCafeId } = cafeIdSlice.actions;

export const useCafeIdSelector = () =>
  useAppSelector((rootState: RootState) => rootState.cafeId.cafeId.cafe_id);

export default cafeIdSlice.reducer;
