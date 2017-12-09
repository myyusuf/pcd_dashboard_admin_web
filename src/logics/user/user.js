import { createLogic } from 'redux-logic';
import axios from 'axios';
import _ from 'lodash';
import notification from 'antd/lib/notification';
import Constant from '../../Constant';
import { mathRandom } from '../../utils/random';
import { validateExist, validateLength, validateEmail } from '../../utils/validation';

const USERS_URL = `${Constant.serverUrl}/api/users`;
const USERS_BY_ROLE_URL = `${Constant.serverUrl}/api/usersbyrole`;

const validate = (key, value) => {
  let result = null;
  switch (key) {
    case 'username':
    case 'name':
      result = validateLength(key, value, 3);
      break;
    case 'role':
      result = validateExist(key, value);
      break;
    case 'email':
      result = validateEmail(key, value);
      break;
    default:
      break;
  }

  return result;
};

const fetchUsersLogic = createLogic({
  type: 'FETCH_USERS_LOGIC',
  cancelType: 'CANCEL_FETCH_USERS_LOGIC',
  latest: true,
  process({ getState, action }, dispatch, done) {
    const search = getState().userReducers.userSearch;
    const paramameters = search ? { params: { ...search, r: mathRandom() } } : {};
    dispatch({ type: 'USER_LOADING_START' });
    axios.get(USERS_URL, paramameters)
      .then(resp => resp.data)
      .then((data) => {
        dispatch({ type: 'USER_LOADING_FINISH' });
        dispatch({ type: 'FETCH_USERS_SUCCESS', payload: data });
      })
      .catch((err) => {
        console.error(err);
        dispatch({ type: 'USER_LOADING_FINISH' });
        notification.error({
          message: 'Fetch users error',
          description: 'Please check internet connection.',
        });
      })
      .then(() => done());
  },
});

const fetchAllUsersByRoleLogic = createLogic({
  type: 'FETCH_ALL_USERS_BY_ROLE_LOGIC',
  cancelType: 'CANCEL_FETCH_ALL_USERS_BY_ROLE_LOGIC',
  latest: true,
  process({ getState, action }, dispatch, done) {
    const paramameters = { params: { role: action.payload, r: mathRandom() } };
    axios.get(USERS_BY_ROLE_URL, paramameters)
      .then(resp => resp.data)
      .then((data) => {
        dispatch({ type: 'FETCH_ALL_USERS_BY_ROLE_SUCCESS', payload: data });
      })
      .catch((err) => {
        console.error(err);
        notification.error({
          message: 'Fetch users error',
          description: 'Connection error.',
        });
      })
      .then(() => done());
  },
});

const editUserLogic = createLogic({
  type: 'EDIT_USER_LOGIC',
  process({ getState, action }, dispatch, done) {
    dispatch({ type: 'CLEAR_USER_FORM' });
    dispatch({ type: 'SHOW_USER_WINDOW' });
    done();
  },
});

const cancelAddUserLogic = createLogic({
  type: 'CANCEL_EDIT_USER_LOGIC',
  process({ getState, action }, dispatch, done) {
    dispatch({ type: 'CLEAR_USER_FORM' });
    dispatch({ type: 'HIDE_USER_WINDOW' });
    done();
  },
});

const saveUserLogic = createLogic({
  type: 'SAVE_USER_LOGIC',
  latest: true,
  validate({ getState, action }, allow, reject) {
    let isFormValid = true;
    const userForm = { ...getState().userReducers.userForm };
    const validationResult = {};
    const keys = _.keys(userForm);
    for (let i = 0; i < keys.length; i += 1) {
      const key = keys[i];
      if (key !== 'id') {
        const value = userForm[key].value;
        validationResult[key] = {
          value,
          ...validate(key, value),
        };

        if (validationResult[key].validateStatus && validationResult[key].validateStatus === 'error') {
          isFormValid = false;
        }
      }
    }

    if (isFormValid) {
      allow(action);
    } else {
      reject({ type: 'SHOW_USER_FORM_VALIDATION_ERRORS', payload: validationResult, error: true });
    }
  },
  process({ getState, action }, dispatch, done) {
    const userForm = _.mapValues({ ...getState().userReducers.userForm }, 'value');
    dispatch({ type: 'SHOW_USER_WINDOW_CONFIRM_LOADING' });

    if (userForm.id) {
      axios.put(`${USERS_URL}/${userForm.id}`, userForm)
        .then(() => {
          dispatch({ type: 'HIDE_USER_WINDOW_CONFIRM_LOADING' });
          dispatch({ type: 'CANCEL_EDIT_USER_LOGIC' });
          dispatch({ type: 'FETCH_USERS_LOGIC' });
          notification.success({
            message: 'Update user success',
            description: 'Success saving user',
          });
        })
        .catch((err) => {
          let errorMessage = '';
          if (err.response) {
            if (err.response.status === 500) {
              errorMessage = 'Ex. Username must be unique';
            } else {
              errorMessage = `Status: ${err.response.status}`;
            }
          } else if (err.request) {
            errorMessage = 'Connection error.';
          } else {
            errorMessage = err.message;
          }
          dispatch({ type: 'HIDE_USER_WINDOW_CONFIRM_LOADING' });
          notification.error({
            message: 'Update user error',
            description: errorMessage,
          });
        })
        .then(() => done());
    } else {
      axios.post(USERS_URL, userForm)
        .then(() => {
          dispatch({ type: 'HIDE_USER_WINDOW_CONFIRM_LOADING' });
          dispatch({ type: 'CANCEL_EDIT_USER_LOGIC' });
          dispatch({ type: 'FETCH_USERS_LOGIC' });
          notification.success({
            message: 'Create user success',
            description: 'Success saving user',
          });
        })
        .catch((err) => {
          let errorMessage = '';
          if (err.response) {
            if (err.response.status === 500) {
              errorMessage = 'Ex. Username must be unique';
            } else {
              errorMessage = `Status: ${err.response.status}`;
            }
          } else if (err.request) {
            errorMessage = 'Connection error.';
          } else {
            errorMessage = err.message;
          }
          dispatch({ type: 'HIDE_USER_WINDOW_CONFIRM_LOADING' });
          notification.error({
            message: 'Create user error',
            description: errorMessage,
          });
        })
        .then(() => done());
    }
  },
});

const deleteUserLogic = createLogic({
  type: 'DELETE_USER_LOGIC',
  process({ getState, action }, dispatch, done) {
    axios.delete(`${USERS_URL}/${action.payload.id}`)
      .then(resp => resp.data)
      .then(() => {
        notification.success({
          message: 'Delete user success',
          description: 'Success deleting user',
        });
        dispatch({ type: 'FETCH_USERS_LOGIC' });
      })
      .catch((err) => {
        console.error(err);
        notification.error({
          message: 'Delete user error',
          description: 'Please check internet connection.',
        });
      })
      .then(() => done());
  },
});

const userPageChangedLogic = createLogic({
  type: 'USER_PAGE_CHANGED_LOGIC',
  process({ getState, action }, dispatch, done) {
    dispatch({ type: 'USER_CURRENT_PAGE_CHANGED', payload: action.payload });
    dispatch({ type: 'FETCH_USERS_LOGIC' });
    done();
  },
});

export default [
  fetchUsersLogic,
  fetchAllUsersByRoleLogic,
  editUserLogic,
  cancelAddUserLogic,
  saveUserLogic,
  deleteUserLogic,
  userPageChangedLogic,
];
