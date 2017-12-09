const defaultState = {
  id: {},
  code: {},
  name: {},
  projectType: {},
};

const projectForm = (state = defaultState, action) => {
  switch (action.type) {
    case 'SHOW_PROJECT_FORM_VALIDATION_ERRORS':
    case 'UPDATE_PROJECT_FORM': {
      const newState = { ...state, ...action.payload };
      return newState;
    }
    case 'LOAD_PROJECT': {
      return action.payload;
    }
    case 'CLEAR_PROJECT_FORM':
      return { ...defaultState };
    default:
      return state;
  }
};

export default projectForm;
