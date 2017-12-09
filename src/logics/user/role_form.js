import { createLogic } from 'redux-logic';
import { validateLength, validateFormFields, validateFormField } from '../../utils/validation';

export const validate = (key, value) => {
  let result = null;
  switch (key) {
    case 'code':
    case 'name':
      result = validateLength(key, value, 3);
      break;
    default:
      break;
  }
  return result;
};

export const validateForm = form => (validateFormFields(form, validate));

const roleFormChangedLogic = createLogic({
  type: 'ROLE_FORM_CHANGED_LOGIC',
  latest: true,
  process({ getState, action }, dispatch, done) {
    const result = validateFormField(action.payload, validate);
    dispatch({ type: 'UPDATE_ROLE_FORM', payload: result });
    done();
  },
});

const loadRoleFormLogic = createLogic({
  type: 'LOAD_ROLE_TO_FORM_LOGIC',
  process({ getState, action }, dispatch, done) {
    const role = action.payload;
    const roleForm = {
      id: {
        value: role.id,
      },
      code: {
        value: role.code,
      },
      name: {
        value: role.name,
      },
    };
    const validationResult = validateFormFields(roleForm, validate).validationResult;
    dispatch({ type: 'EDIT_ROLE_LOGIC' });
    dispatch({ type: 'LOAD_ROLE', payload: validationResult });
    done();
  },
});

export default [
  roleFormChangedLogic,
  loadRoleFormLogic,
];
