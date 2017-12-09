const defaultState = {
  visible: false,
  confirmLoading: false,
};

const userWindow = (state = defaultState, action) => {
  switch (action.type) {
    case 'SHOW_USER_WINDOW': {
      return { ...state, visible: true };
    }
    case 'HIDE_USER_WINDOW': {
      return { ...state, visible: false };
    }
    case 'SHOW_USER_WINDOW_CONFIRM_LOADING': {
      return { ...state, confirmLoading: true };
    }
    case 'HIDE_USER_WINDOW_CONFIRM_LOADING': {
      return { ...state, confirmLoading: false };
    }
    default:
      return state;
  }
};

export default userWindow;
