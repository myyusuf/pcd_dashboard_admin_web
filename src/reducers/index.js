import { combineReducers } from 'redux';
import userReducers from './user/';
import projectReducers from './project/';
import financeReducers from './finance/';

const rootReducer = combineReducers({
  userReducers,
  projectReducers,
  financeReducers,
});

export default rootReducer;
