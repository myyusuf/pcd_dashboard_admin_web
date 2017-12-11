import { createLogic } from 'redux-logic';
import axios from 'axios';
import notification from 'antd/lib/notification';
import Constant from '../../Constant';
import { mathRandom } from '../../utils/random';

const PROJECTIONS_URL = `${Constant.serverUrl}/api/projections`;

const fetchProjectionsLogic = createLogic({
  type: 'FETCH_PROJECTIONS_LOGIC',
  cancelType: 'CANCEL_FETCH_PROJECTIONS_LOGIC',
  latest: true,
  process({ getState, action }, dispatch, done) {
    const search = getState().financeReducers.projectionSearch;
    const paramameters = search ? { params: { ...search, r: mathRandom() } } : {};
    dispatch({ type: 'PROJECTION_LOADING_START' });
    axios.get(PROJECTIONS_URL, paramameters)
      .then(resp => resp.data)
      .then((data) => {
        dispatch({ type: 'PROJECTION_LOADING_FINISH' });
        dispatch({ type: 'FETCH_PROJECTIONS_SUCCESS', payload: data });
      })
      .catch((err) => {
        console.error(err);
        dispatch({ type: 'PROJECTION_LOADING_FINISH' });
        notification.error({
          message: 'Fetch projection error',
          description: 'Please check internet connection.',
        });
      })
      .then(() => done());
  },
});

const projectionPageChangedLogic = createLogic({
  type: 'PROJECTION_PAGE_CHANGED_LOGIC',
  process({ getState, action }, dispatch, done) {
    dispatch({ type: 'PROJECTION_CURRENT_PAGE_CHANGED', payload: action.payload });
    dispatch({ type: 'FETCH_PROJECTIONS_LOGIC' });
    done();
  },
});

export default [
  fetchProjectionsLogic,
  projectionPageChangedLogic,
];
