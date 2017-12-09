import { createLogic } from 'redux-logic';
import axios from 'axios';
import _ from 'lodash';
import notification from 'antd/lib/notification';
import Constant from '../../Constant';
import { mathRandom } from '../../utils/random';
import { validateExist, validateLength } from '../../utils/validation';

const PROJECTS_URL = `${Constant.serverUrl}/api/projects`;

const validate = (key, value) => {
  let result = null;
  switch (key) {
    case 'code':
    case 'name':
      result = validateLength(key, value, 3);
      break;
    case 'projectType':
      result = validateExist(key, value);
      break;
    default:
      break;
  }

  return result;
};

const fetchProjectsLogic = createLogic({
  type: 'FETCH_PROJECTS_LOGIC',
  cancelType: 'CANCEL_FETCH_PROJECTS_LOGIC',
  latest: true,
  process({ getState, action }, dispatch, done) {
    const search = getState().projectReducers.projectSearch;
    const parameters = search ? { params: { ...search, r: mathRandom() } } : {};
    dispatch({ type: 'PROJECT_LOADING_START' });
    axios.get(PROJECTS_URL, parameters)
      .then(resp => resp.data)
      .then((data) => {
        dispatch({ type: 'PROJECT_LOADING_FINISH' });
        dispatch({ type: 'FETCH_PROJECTS_SUCCESS', payload: data });
      })
      .catch((err) => {
        console.error(err);
        dispatch({ type: 'PROJECT_LOADING_FINISH' });
        notification.error({
          message: 'Fetch projects error',
          description: 'Please check internet connection.',
        });
      })
      .then(() => done());
  },
});

const editProjectLogic = createLogic({
  type: 'EDIT_PROJECT_LOGIC',
  process({ getState, action }, dispatch, done) {
    dispatch({ type: 'CLEAR_PROJECT_FORM' });
    dispatch({ type: 'SHOW_PROJECT_WINDOW' });
    done();
  },
});

const cancelAddProjectLogic = createLogic({
  type: 'CANCEL_EDIT_PROJECT_LOGIC',
  process({ getState, action }, dispatch, done) {
    dispatch({ type: 'CLEAR_PROJECT_FORM' });
    dispatch({ type: 'HIDE_PROJECT_WINDOW' });
    done();
  },
});

const saveProjectLogic = createLogic({
  type: 'SAVE_PROJECT_LOGIC',
  latest: true,
  validate({ getState, action }, allow, reject) {
    let isFormValid = true;
    const projectForm = { ...getState().projectReducers.projectForm };
    const validationResult = {};
    const keys = _.keys(projectForm);
    for (let i = 0; i < keys.length; i += 1) {
      const key = keys[i];
      if (key !== 'id') {
        const value = projectForm[key].value;
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
      reject({ type: 'SHOW_PROJECT_FORM_VALIDATION_ERRORS', payload: validationResult, error: true });
    }
  },
  process({ getState, action }, dispatch, done) {
    const projectForm = _.mapValues({ ...getState().projectReducers.projectForm }, 'value');
    dispatch({ type: 'SHOW_PROJECT_WINDOW_CONFIRM_LOADING' });

    if (projectForm.id) {
      axios.put(`${PROJECTS_URL}/${projectForm.id}`, projectForm)
        .then(() => {
          dispatch({ type: 'HIDE_PROJECT_WINDOW_CONFIRM_LOADING' });
          dispatch({ type: 'CANCEL_EDIT_PROJECT_LOGIC' });
          dispatch({ type: 'FETCH_PROJECTS_LOGIC' });
          notification.success({
            message: 'Update project success',
            description: 'Success saving project',
          });
        })
        .catch((err) => {
          let errorMessage = '';
          if (err.response) {
            if (err.response.status === 500) {
              errorMessage = 'Ex. Code must be unique';
            } else {
              errorMessage = `Status: ${err.response.status}`;
            }
          } else if (err.request) {
            errorMessage = 'Connection error.';
          } else {
            errorMessage = err.message;
          }
          dispatch({ type: 'HIDE_PROJECT_WINDOW_CONFIRM_LOADING' });
          notification.error({
            message: 'Update project error',
            description: errorMessage,
          });
        })
        .then(() => done());
    } else {
      axios.post(PROJECTS_URL, projectForm)
        .then(() => {
          dispatch({ type: 'HIDE_PROJECT_WINDOW_CONFIRM_LOADING' });
          dispatch({ type: 'CANCEL_EDIT_PROJECT_LOGIC' });
          dispatch({ type: 'FETCH_PROJECTS_LOGIC' });
          notification.success({
            message: 'Create project success',
            description: 'Success saving project',
          });
        })
        .catch((err) => {
          let errorMessage = '';
          if (err.response) {
            if (err.response.status === 500) {
              errorMessage = 'Ex. Code must be unique';
            } else {
              errorMessage = `Status: ${err.response.status}`;
            }
          } else if (err.request) {
            errorMessage = 'Connection error.';
          } else {
            errorMessage = err.message;
          }
          dispatch({ type: 'HIDE_PROJECT_WINDOW_CONFIRM_LOADING' });
          notification.error({
            message: 'Create project error',
            description: errorMessage,
          });
        })
        .then(() => done());
    }
  },
});

const deleteProjectLogic = createLogic({
  type: 'DELETE_PROJECT_LOGIC',
  process({ getState, action }, dispatch, done) {
    axios.delete(`${PROJECTS_URL}/${action.payload.id}`)
      .then(resp => resp.data)
      .then(() => {
        notification.success({
          message: 'Delete project success',
          description: 'Success deleting project',
        });
        dispatch({ type: 'FETCH_PROJECTS_LOGIC' });
      })
      .catch((err) => {
        console.error(err);
        notification.error({
          message: 'Delete project error',
          description: 'Please check internet connection.',
        });
      })
      .then(() => done());
  },
});

const projectPageChangedLogic = createLogic({
  type: 'PROJECT_PAGE_CHANGED_LOGIC',
  process({ getState, action }, dispatch, done) {
    dispatch({ type: 'PROJECT_CURRENT_PAGE_CHANGED', payload: action.payload });
    dispatch({ type: 'FETCH_PROJECTS_LOGIC' });
    done();
  },
});

export default [
  fetchProjectsLogic,
  editProjectLogic,
  cancelAddProjectLogic,
  saveProjectLogic,
  deleteProjectLogic,
  projectPageChangedLogic,
];
