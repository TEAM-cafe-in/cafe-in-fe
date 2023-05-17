import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import {
  AnyAction,
  CombinedState,
  Reducer,
  configureStore,
} from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';

import reducers, { ReducerStates } from './reducers';

// configureStore reducer에 담긴 슬라이스들을 하나의 Store 객체로 정리하여 관리해준다.
export const store = configureStore({
  reducer: reducers as Reducer<CombinedState<ReducerStates>, AnyAction>,
  devTools: process.env.NODE_ENV === 'development',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// hooks
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

const wrapper = createWrapper(() => store);

export default wrapper;
