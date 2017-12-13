import { createLogic } from 'redux-logic';
import axios from 'axios';
import notification from 'antd/lib/notification';
import Constant from '../../Constant';
import { mathRandom } from '../../utils/random';

const CASH_FLOWS_URL = `${Constant.serverUrl}/api/cashflows`;

const fetchCashFlowsLogic = createLogic({
  type: 'FETCH_CASH_FLOWS_LOGIC',
  cancelType: 'CANCEL_FETCH_CASH_FLOWS_LOGIC',
  latest: true,
  process({ getState, action }, dispatch, done) {
    const search = getState().financeReducers.cashFlowSearch;
    const paramameters = search ? { params: { ...search, r: mathRandom() } } : {};
    dispatch({ type: 'CASH_FLOW_LOADING_START' });
    axios.get(CASH_FLOWS_URL, paramameters)
      .then(resp => resp.data)
      .then((data) => {
        dispatch({ type: 'CASH_FLOW_LOADING_FINISH' });
        dispatch({ type: 'FETCH_CASH_FLOWS_SUCCESS', payload: data });
      })
      .catch((err) => {
        console.error(err);
        dispatch({ type: 'CASH_FLOW_LOADING_FINISH' });
        notification.error({
          message: 'Fetch cash flow error',
          description: 'Please check internet connection.',
        });
      })
      .then(() => done());
  },
});

const cashFlowPageChangedLogic = createLogic({
  type: 'CASH_FLOW_PAGE_CHANGED_LOGIC',
  process({ getState, action }, dispatch, done) {
    dispatch({ type: 'CASH_FLOW_CURRENT_PAGE_CHANGED', payload: action.payload });
    dispatch({ type: 'FETCH_CASH_FLOWS_LOGIC' });
    done();
  },
});

export default [
  fetchCashFlowsLogic,
  cashFlowPageChangedLogic,
];
