/* eslint import/no-cycle: [2, { maxDepth: 1 }] */

import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { RootState, useAppSelector } from '~/store';

export interface Depth2Content {
  depth2_content: 'content' | 'comment';
}

export interface Depth2ContentState {
  depth2Content: Depth2Content;
}

export const initialDepth2ContentState: Depth2ContentState = {
  depth2Content: {
    depth2_content: 'content',
  },
};

// 카페 select id Slice
const depth2ContentSlice = createSlice({
  name: 'depth2Content',
  initialState: initialDepth2ContentState,
  reducers: {
    setDepth2Content(
      state: Depth2ContentState,
      action: PayloadAction<'content' | 'comment'>
    ) {
      state.depth2Content.depth2_content = action.payload;
    },
  },
});

export const { setDepth2Content } = depth2ContentSlice.actions;

export const useDepth2ContentSelector = () =>
  useAppSelector(
    (rootState: RootState) =>
      rootState.depth2Content.depth2Content.depth2_content
  );

export default depth2ContentSlice.reducer;
