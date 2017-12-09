import { combineReducers } from 'redux';
import userReducers from './user/';
import projectReducers from './project/';

const rootReducer = combineReducers({
  userReducers,
  projectReducers,
});

export default rootReducer;
