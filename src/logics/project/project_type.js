import { createLogic } from 'redux-logic';
import axios from 'axios';
import _ from 'lodash';
import notification from 'antd/lib/notification';
import Constant from '../../Constant';
import { mathRandom } from '../../utils/random';

const PROJECT_TYPES_URL = `${Constant.serverUrl}/api/projecttypes`;

const fetchAllProjectTypesLogic = createLogic({
  type: 'FETCH_ALL_PROJECT_TYPES_LOGIC',
  cancelType: 'CANCEL_FETCH_ALL_PROJECT_TYPES_LOGIC',
  latest: true,
  process({ getState, action }, dispatch, done) {
    axios.get(PROJECT_TYPES_URL, { params: { r: mathRandom() } })
      .then(resp => resp.data)
      .then((projectTypes) => {
        dispatch({ type: 'FETCH_PROJECT_TYPES_SUCCESS', payload: projectTypes });
      })
      .catch((err) => {
        console.error(err);
        notification.error({
          message: 'Fetch project types error',
          description: 'Connection error.',
        });
      })
      .then(() => done());
  },
});

export default [
  fetchAllProjectTypesLogic,
];
