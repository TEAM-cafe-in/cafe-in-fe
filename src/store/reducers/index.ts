import { combineReducers, AnyAction } from 'redux';
import { HYDRATE } from 'next-redux-wrapper';

import authSlice, { AuthState } from './authSlice';

export interface ReducerStates {
  auth: AuthState;
}

// 쪼개져있는 reducer들을 하나로 합쳐준다.
const combinedReducer = combineReducers<ReducerStates>({
  auth: authSlice,
});

const reducers = (
  state: ReturnType<typeof combinedReducer>,
  action: AnyAction
) => {
  if (action.type === HYDRATE) {
    return { ...state, ...action.payload };
  } else {
    return combinedReducer(state, action);
  }
};

export default reducers;
