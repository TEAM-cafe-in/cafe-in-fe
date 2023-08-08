/* eslint import/no-cycle: [2, { maxDepth: 1 }] */

import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { RootState, useAppSelector } from '~/store';

type Depth2Navigation =
  | 'cafelist'
  | 'content'
  | 'comment'
  | 're-comment'
  | 'write';

export interface Depth2Content {
  depth2_content: Depth2Navigation;
}

export interface Depth2ContentState {
  depth2Content: Depth2Content;
}

export const initialDepth2ContentState: Depth2ContentState = {
  depth2Content: {
    depth2_content: 'cafelist',
  },
};

// 카페 select id Slice
const depth2ContentSlice = createSlice({
  name: 'depth2Content',
  initialState: initialDepth2ContentState,
  reducers: {
    setDepth2Content(
      state: Depth2ContentState,
      action: PayloadAction<Depth2Navigation>
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
