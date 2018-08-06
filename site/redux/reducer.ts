import { combineReducers } from 'redux';
import { default as IndexReducer, IndexState } from './index/reducer';

const reducers = {
  index: IndexReducer,
}

export type RootState = {
  index: IndexState;
};

const rootReducer = combineReducers(reducers);

export default rootReducer;
