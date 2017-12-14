import { combineReducers } from 'redux';
import projections from './projections';
import projectionSearch from './projection_search';
import cashFlows from './cash_flows';
import cashFlowSearch from './cash_flow_search';
import bads from './bads';
import badSearch from './bad_search';

const financeReducer = combineReducers({
  projections,
  projectionSearch,
  cashFlows,
  cashFlowSearch,
  bads,
  badSearch,
});

export default financeReducer;
