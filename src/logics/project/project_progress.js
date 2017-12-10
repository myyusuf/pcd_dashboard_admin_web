import { createLogic } from 'redux-logic';
import axios from 'axios';
import notification from 'antd/lib/notification';
import Constant from '../../Constant';
import { mathRandom } from '../../utils/random';

const PROGRESSES_URL = `${Constant.serverUrl}/api/projectprogresses`;

const fetchProjectProgressesLogic = createLogic({
  type: 'FETCH_PROGRESSES_LOGIC',
  cancelType: 'CANCEL_FETCH_PROGRESSES_LOGIC',
  latest: true,
  process({ getState, action }, dispatch, done) {
    const search = getState().projectProgressReducers.projectProgressSearch;
    const paramameters = search ? { params: { ...search, r: mathRandom() } } : {};
    dispatch({ type: 'PROJECT_PROGRESS_LOADING_START' });
    axios.get(PROGRESSES_URL, paramameters)
      .then(resp => resp.data)
      .then((data) => {
        dispatch({ type: 'PROJECT_PROGRESS_LOADING_FINISH' });
        dispatch({ type: 'FETCH_PROGRESSES_SUCCESS', payload: data });
      })
      .catch((err) => {
        console.error(err);
        dispatch({ type: 'PROJECT_PROGRESS_LOADING_FINISH' });
        notification.error({
          message: 'Fetch project progress error',
          description: 'Please check internet connection.',
        });
      })
      .then(() => done());
  },
});

const projectProgressPageChangedLogic = createLogic({
  type: 'PROJECT_PROGRESS_PAGE_CHANGED_LOGIC',
  process({ getState, action }, dispatch, done) {
    dispatch({ type: 'PROJECT_PROGRESS_CURRENT_PAGE_CHANGED', payload: action.payload });
    dispatch({ type: 'FETCH_PROGRESSES_LOGIC' });
    done();
  },
});

export default [
  fetchProjectProgressesLogic,
  projectProgressPageChangedLogic,
];
