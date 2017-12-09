const defaultState = {
  id: {},
  code: {},
  name: {},
};

const roleForm = (state = defaultState, action) => {
  switch (action.type) {
    case 'SHOW_ROLE_FORM_VALIDATION_ERRORS':
    case 'UPDATE_ROLE_FORM': {
      const newState = { ...state, ...action.payload };
      return newState;
    }
    case 'LOAD_ROLE': {
      return action.payload;
    }
    case 'CLEAR_ROLE_FORM':
      return { ...defaultState };
    default:
      return state;
  }
};

export default roleForm;
