import { createLogic } from 'redux-logic';
import _ from 'lodash';
import { validateExist, validateLength, validateEmail } from '../../utils/validation';

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

const userFormChangedLogic = createLogic({
  type: 'USER_FORM_CHANGED_LOGIC',
  latest: true,
  process({ getState, action }, dispatch, done) {
    const payload = action.payload;
    const result = {
      [payload.key]: {
        value: payload.value,
        ...validate(payload.key, payload.value),
      },
    };
    dispatch({ type: 'UPDATE_USER_FORM', payload: result });
    done();
  },
});

const loadUserFormLogic = createLogic({
  type: 'LOAD_USER_TO_FORM_LOGIC',
  process({ getState, action }, dispatch, done) {
    const user = action.payload;
    const roleId = user.Role ? user.Role.id : undefined;
    const userForm = {
      id: {
        value: user.id,
      },
      username: {
        value: user.username,
      },
      name: {
        value: user.name,
      },
      role: {
        value: roleId,
      },
      email: {
        value: user.email,
      },
    };
    const validationResult = {};
    const keys = _.keys(userForm);
    for (let i = 0; i < keys.length; i += 1) {
      const key = keys[i];
      const value = userForm[key].value;
      validationResult[key] = {
        value,
        ...validate(key, value),
      };
    }

    dispatch({ type: 'EDIT_USER_LOGIC' });
    dispatch({ type: 'LOAD_USER', payload: validationResult });
    done();
  },
});

export default [
  userFormChangedLogic,
  loadUserFormLogic,
];
