const defaultState = {
  id: {},
  username: {},
  name: {},
  role: {},
  email: {},
};

const userForm = (state = defaultState, action) => {
  switch (action.type) {
    case 'SHOW_USER_FORM_VALIDATION_ERRORS':
    case 'UPDATE_USER_FORM': {
      const newState = { ...state, ...action.payload };
      return newState;
    }
    case 'LOAD_USER': {
      return action.payload;
    }
    case 'CLEAR_USER_FORM':
      return { ...defaultState };
    default:
      return state;
  }
};

export default userForm;
