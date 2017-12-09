import { createLogic } from 'redux-logic';
import _ from 'lodash';
import { validateExist, validateLength } from '../../utils/validation';

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

const projectFormChangedLogic = createLogic({
  type: 'PROJECT_FORM_CHANGED_LOGIC',
  latest: true,
  process({ getState, action }, dispatch, done) {
    const payload = action.payload;
    const result = {
      [payload.key]: {
        value: payload.value,
        ...validate(payload.key, payload.value),
      },
    };
    dispatch({ type: 'UPDATE_PROJECT_FORM', payload: result });
    done();
  },
});

const loadProjectFormLogic = createLogic({
  type: 'LOAD_PROJECT_TO_FORM_LOGIC',
  process({ getState, action }, dispatch, done) {
    const project = action.payload;
    const projectTypeId = project.ProjectType ? project.ProjectType.id : undefined;
    const projectForm = {
      id: {
        value: project.id,
      },
      code: {
        value: project.code,
      },
      name: {
        value: project.name,
      },
      projectType: {
        value: projectTypeId,
      },
    };
    const validationResult = {};
    const keys = _.keys(projectForm);
    for (let i = 0; i < keys.length; i += 1) {
      const key = keys[i];
      const value = projectForm[key].value;
      validationResult[key] = {
        value,
        ...validate(key, value),
      };
    }

    dispatch({ type: 'EDIT_PROJECT_LOGIC' });
    dispatch({ type: 'LOAD_PROJECT', payload: validationResult });
    done();
  },
});

export default [
  projectFormChangedLogic,
  loadProjectFormLogic,
];
