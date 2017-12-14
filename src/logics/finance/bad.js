import { createLogic } from 'redux-logic';
import axios from 'axios';
import notification from 'antd/lib/notification';
import Constant from '../../Constant';
import { mathRandom } from '../../utils/random';

const BADS_URL = `${Constant.serverUrl}/api/bads`;

const fetchBadsLogic = createLogic({
  type: 'FETCH_BADS_LOGIC',
  cancelType: 'CANCEL_FETCH_BADS_LOGIC',
  latest: true,
  process({ getState, action }, dispatch, done) {
    const search = getState().financeReducers.badSearch;
    const paramameters = search ? { params: { ...search, r: mathRandom() } } : {};
    dispatch({ type: 'BAD_LOADING_START' });
    axios.get(BADS_URL, paramameters)
      .then(resp => resp.data)
      .then((data) => {
        dispatch({ type: 'BAD_LOADING_FINISH' });
        dispatch({ type: 'FETCH_BADS_SUCCESS', payload: data });
      })
      .catch((err) => {
        console.error(err);
        dispatch({ type: 'BAD_LOADING_FINISH' });
        notification.error({
          message: 'Fetch bad error',
          description: 'Please check internet connection.',
        });
      })
      .then(() => done());
  },
});

const badPageChangedLogic = createLogic({
  type: 'BAD_PAGE_CHANGED_LOGIC',
  process({ getState, action }, dispatch, done) {
    dispatch({ type: 'BAD_CURRENT_PAGE_CHANGED', payload: action.payload });
    dispatch({ type: 'FETCH_BADS_LOGIC' });
    done();
  },
});

export default [
  fetchBadsLogic,
  badPageChangedLogic,
];
