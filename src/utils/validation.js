import _ from 'lodash';

const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const validatePassword = (name, value, minimumLength) => {
  if (value && value.trim().length > 0) {
    if (value.trim().length < minimumLength) {
      return {
        validateStatus: 'error',
        errorMsg: `${_.startCase(name)} minimum length is ${minimumLength} characters`,
      };
    }
    if (value.search(/[a-z]/i) < 0) {
      return {
        validateStatus: 'error',
        errorMsg: 'Your password must contain at least one letter.',
      };
    }
    if (value.search(/[0-9]/) < 0) {
      return {
        validateStatus: 'error',
        errorMsg: 'Your password must contain at least one digit.',
      };
    }
    return {
      validateStatus: 'success',
      errorMsg: null,
    };
  }
  return {
    validateStatus: 'error',
    errorMsg: `${_.startCase(name)} is required`,
  };
};

export const validateExist = (name, value) => {
  if (value !== undefined && value !== null) {
    return {
      validateStatus: 'success',
      errorMsg: null,
    };
  }
  return {
    validateStatus: 'error',
    errorMsg: `${_.startCase(name)} is required`,
  };
};

export const validateArrayNotEmpty = (name, value) => {
  if (value !== undefined && value !== null && value.length > 0) {
    return {
      validateStatus: 'success',
      errorMsg: null,
    };
  }
  return {
    validateStatus: 'error',
    errorMsg: `${_.startCase(name)} is required`,
  };
};

export const validateLength = (name, value, minimumLength) => {
  if (value && value.trim().length > 0) {
    if (value.trim().length < minimumLength) {
      return {
        validateStatus: 'error',
        errorMsg: `${_.startCase(name)} minimum length is ${minimumLength} characters`,
      };
    }
    return {
      validateStatus: 'success',
      errorMsg: null,
    };
  }
  return {
    validateStatus: 'error',
    errorMsg: `${_.startCase(name)} is required`,
  };
};

export const validateEmail = (name, value) => {
  if (value && value.trim().length > 0) {
    if (!emailRegex.test(value)) {
      return {
        validateStatus: 'error',
        errorMsg: 'Not valid email address',
      };
    }
    return {
      validateStatus: 'success',
      errorMsg: null,
    };
  }
  return {
    validateStatus: 'error',
    errorMsg: `${_.startCase(name)} is required`,
  };
};

export const validateFormFields = (form, validation) => {
  const validationResult = {};
  let isFormValid = true;
  const keys = _.keys(form);
  for (let i = 0; i < keys.length; i += 1) {
    const key = keys[i];
    const value = form[key].value;
    validationResult[key] = {
      value,
      ...validation(key, value),
    };
    if (validationResult[key].validateStatus && validationResult[key].validateStatus === 'error') {
      isFormValid = false;
    }
  }

  return { validationResult, isFormValid };
};

export const validateFormField = (field, validation) => {
  const result = {
    [field.key]: {
      value: field.value,
      ...validation(field.key, field.value),
    },
  };
  return result;
};
