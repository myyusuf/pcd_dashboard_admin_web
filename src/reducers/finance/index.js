import { combineReducers } from 'redux';
import projections from './projections';
import projectionSearch from './projection_search';

const financeReducer = combineReducers({
  projections,
  projectionSearch,
});

export default financeReducer;
