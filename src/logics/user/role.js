import { createLogic } from 'redux-logic';
import axios from 'axios';
import _ from 'lodash';
import notification from 'antd/lib/notification';
import Constant from '../../Constant';
import { mathRandom } from '../../utils/random';
import { validateForm } from './role_form';

const ROLES_URL = `${Constant.serverUrl}/api/roles`;

const fetchRolesLogic = createLogic({
  type: 'FETCH_ROLES_LOGIC',
  cancelType: 'CANCEL_FETCH_ROLES_LOGIC',
  latest: true,
  process({ getState, action }, dispatch, done) {
    const search = getState().userReducers.roleSearch;
    const paramameters = search ? { params: { ...search, r: mathRandom() } } : {};
    dispatch({ type: 'ROLE_LOADING_START' });
    axios.get(ROLES_URL, paramameters)
      .then(resp => resp.data)
      .then((roles) => {
        dispatch({ type: 'ROLE_LOADING_FINISH' });
        dispatch({ type: 'FETCH_ROLES_SUCCESS', payload: roles });
      })
      .catch((err) => {
        console.error(err);
        dispatch({ type: 'ROLE_LOADING_FINISH' });
        notification.error({
          message: 'Fetch roles error',
          description: 'Please check internet connection.',
        });
      })
      .then(() => done());
  },
});

const fetchAllRolesLogic = createLogic({
  type: 'FETCH_ALL_ROLES_LOGIC',
  cancelType: 'CANCEL_FETCH_ALL_ROLES_LOGIC',
  latest: true,
  process({ getState, action }, dispatch, done) {
    axios.get(ROLES_URL, { params: { r: mathRandom() } })
      .then(resp => resp.data)
      .then((roles) => {
        dispatch({ type: 'FETCH_ROLES_SUCCESS', payload: roles });
      })
      .catch((err) => {
        console.error(err);
        notification.error({
          message: 'Fetch roles error',
          description: 'Connection error.',
        });
      })
      .then(() => done());
  },
});

const editRoleLogic = createLogic({
  type: 'EDIT_ROLE_LOGIC',
  process({ getState, action }, dispatch, done) {
    dispatch({ type: 'CLEAR_ROLE_FORM' });
    dispatch({ type: 'SHOW_ROLE_WINDOW' });
    done();
  },
});

const cancelAddRoleLogic = createLogic({
  type: 'CANCEL_EDIT_ROLE_LOGIC',
  process({ getState, action }, dispatch, done) {
    dispatch({ type: 'CLEAR_ROLE_FORM' });
    dispatch({ type: 'HIDE_ROLE_WINDOW' });
    done();
  },
});

const saveRoleLogic = createLogic({
  type: 'SAVE_ROLE_LOGIC',
  latest: true,
  validate({ getState, action }, allow, reject) {
    const roleForm = { ...getState().userReducers.roleForm };
    const validatedForm = validateForm(roleForm);
    if (validatedForm.isFormValid) {
      allow(action);
    } else {
      reject({ type: 'SHOW_ROLE_FORM_VALIDATION_ERRORS', payload: validatedForm.validationResult, error: true });
    }
  },
  process({ getState, action }, dispatch, done) {
    const roleForm = _.mapValues({ ...getState().userReducers.roleForm }, 'value');
    dispatch({ type: 'SHOW_ROLE_WINDOW_CONFIRM_LOADING' });

    if (roleForm.id) {
      axios.put(`${ROLES_URL}/${roleForm.id}`, roleForm)
        .then(() => {
          dispatch({ type: 'HIDE_ROLE_WINDOW_CONFIRM_LOADING' });
          dispatch({ type: 'CANCEL_EDIT_ROLE_LOGIC' });
          dispatch({ type: 'FETCH_ROLES_LOGIC' });
          notification.success({
            message: 'Update role success',
            description: 'Success saving role',
          });
        })
        .catch((err) => {
          let errorMessage = '';
          if (err.response) {
            if (err.response.status === 500) {
              errorMessage = 'Ex. Role code must be unique';
            } else {
              errorMessage = `Status: ${err.response.status}`;
            }
          } else if (err.request) {
            errorMessage = 'Connection error.';
          } else {
            errorMessage = err.message;
          }
          dispatch({ type: 'HIDE_ROLE_WINDOW_CONFIRM_LOADING' });
          notification.error({
            message: 'Update role error',
            description: errorMessage,
          });
        })
        .then(() => done());
    } else {
      axios.post(ROLES_URL, roleForm)
        .then(() => {
          dispatch({ type: 'HIDE_ROLE_WINDOW_CONFIRM_LOADING' });
          dispatch({ type: 'CANCEL_EDIT_ROLE_LOGIC' });
          dispatch({ type: 'FETCH_ROLES_LOGIC' });
          notification.success({
            message: 'Create role success',
            description: 'Success saving role',
          });
        })
        .catch((err) => {
          let errorMessage = '';
          if (err.response) {
            if (err.response.status === 500) {
              errorMessage = 'Ex. Role code must be unique';
            } else {
              errorMessage = `Status: ${err.response.status}`;
            }
          } else if (err.request) {
            errorMessage = 'Connection error.';
          } else {
            errorMessage = err.message;
          }
          dispatch({ type: 'HIDE_ROLE_WINDOW_CONFIRM_LOADING' });
          notification.error({
            message: 'Create role error',
            description: errorMessage,
          });
        })
        .then(() => done());
    }
  },
});

const deleteRoleLogic = createLogic({
  type: 'DELETE_ROLE_LOGIC',
  process({ getState, action }, dispatch, done) {
    axios.delete(`${ROLES_URL}/${action.payload.id}`)
      .then(resp => resp.data)
      .then(() => {
        notification.success({
          message: 'Delete role success',
          description: 'Success deleting role',
        });
        dispatch({ type: 'FETCH_ROLES_LOGIC' });
      })
      .catch((err) => {
        console.error(err);
        notification.error({
          message: 'Delete role error',
          description: 'Please check internet connection.',
        });
      })
      .then(() => done());
  },
});

export default [
  fetchRolesLogic,
  editRoleLogic,
  cancelAddRoleLogic,
  saveRoleLogic,
  deleteRoleLogic,
  fetchAllRolesLogic,
];
