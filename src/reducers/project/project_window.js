const defaultState = {
  visible: false,
  confirmLoading: false,
};

const projectWindow = (state = defaultState, action) => {
  switch (action.type) {
    case 'SHOW_PROJECT_WINDOW': {
      return { ...state, visible: true };
    }
    case 'HIDE_PROJECT_WINDOW': {
      return { ...state, visible: false };
    }
    case 'SHOW_PROJECT_WINDOW_CONFIRM_LOADING': {
      return { ...state, confirmLoading: true };
    }
    case 'HIDE_PROJECT_WINDOW_CONFIRM_LOADING': {
      return { ...state, confirmLoading: false };
    }
    default:
      return state;
  }
};

export default projectWindow;
