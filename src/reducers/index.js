import { combineReducers } from 'redux';
import userReducers from './user/';

const rootReducer = combineReducers({
  userReducers,
});

export default rootReducer;
