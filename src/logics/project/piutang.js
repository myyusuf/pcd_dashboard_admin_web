import { createLogic } from 'redux-logic';
import axios from 'axios';
import notification from 'antd/lib/notification';
import Constant from '../../Constant';
import { mathRandom } from '../../utils/random';

const PIUTANGS_URL = `${Constant.serverUrl}/api/piutangs`;

const fetchPiutangsLogic = createLogic({
  type: 'FETCH_PIUTANGS_LOGIC',
  cancelType: 'CANCEL_FETCH_PIUTANGS_LOGIC',
  latest: true,
  process({ getState, action }, dispatch, done) {
    const search = getState().projectReducers.piutangSearch;
    const paramameters = search ? { params: { ...search, r: mathRandom() } } : {};
    dispatch({ type: 'PIUTANG_LOADING_START' });
    axios.get(PIUTANGS_URL, paramameters)
      .then(resp => resp.data)
      .then((data) => {
        dispatch({ type: 'PIUTANG_LOADING_FINISH' });
        dispatch({ type: 'FETCH_PIUTANGS_SUCCESS', payload: data });
      })
      .catch((err) => {
        console.error(err);
        dispatch({ type: 'PIUTANG_LOADING_FINISH' });
        notification.error({
          message: 'Fetch piutang error',
          description: 'Please check internet connection.',
        });
      })
      .then(() => done());
  },
});

const piutangPageChangedLogic = createLogic({
  type: 'PIUTANG_PAGE_CHANGED_LOGIC',
  process({ getState, action }, dispatch, done) {
    dispatch({ type: 'PIUTANG_CURRENT_PAGE_CHANGED', payload: action.payload });
    dispatch({ type: 'FETCH_PIUTANGS_LOGIC' });
    done();
  },
});

export default [
  fetchPiutangsLogic,
  piutangPageChangedLogic,
];
