/* eslint import/no-cycle: [2, { maxDepth: 1 }] */

import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import {
  configureStore,
  getDefaultMiddleware,
  EnhancedStore,
  Store,
} from '@reduxjs/toolkit';
import logger from 'redux-logger';
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { MakeStore, createWrapper } from 'next-redux-wrapper';

import reducers from './reducers';

const persistConfig = {
  key: 'root', // local storage 에 저장합니다
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

// server-side 스토어와 client-side 스토어를 합쳐준다.
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: true,
    }).concat(logger),
  devTools: process.env.NODE_ENV !== 'production',
});

const setupStore = (context: any): EnhancedStore => store;
const makeStore: MakeStore<any> = (context: any) => setupStore(context);
export const persistor = persistStore(store);
export const wrapper = createWrapper<Store>(makeStore);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppStore = ReturnType<typeof makeStore>;

// configureStore reducer에 담긴 슬라이스들을 하나의 Store 객체로 정리하여 관리해준다.
// export const makeStore = () => {
//  const store = configureStore({
//    reducer: reducers as Reducer<CombinedState<ReducerStates>, AnyAction>,
//    devTools: process.env.NODE_ENV === 'development',
//  });

//  return store;
// };

// export type RootState = ReturnType<typeof reducers>;

// export type AppDispatch = AppStore['dispatch'];

// hooks
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// next-redux-wrapper 라이브러리를 통ㅎ해 SSR에서 Redux Store에 접근할 수 있음
// const wrapper = createWrapper(makeStore);
// export default wrapper;
