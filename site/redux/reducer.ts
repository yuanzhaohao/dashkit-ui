import { combineReducers } from 'redux';
import indexReducer from './index/reducer';

const reducers = {
  index: indexReducer,
}

const rootReducer = combineReducers(reducers);

export default rootReducer;
