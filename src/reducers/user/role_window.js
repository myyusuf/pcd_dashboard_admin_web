const defaultState = {
  visible: false,
  confirmLoading: false,
};

const roleWindow = (state = defaultState, action) => {
  switch (action.type) {
    case 'SHOW_ROLE_WINDOW': {
      return { ...state, visible: true };
    }
    case 'HIDE_ROLE_WINDOW': {
      return { ...state, visible: false };
    }
    case 'SHOW_ROLE_WINDOW_CONFIRM_LOADING': {
      return { ...state, confirmLoading: true };
    }
    case 'HIDE_ROLE_WINDOW_CONFIRM_LOADING': {
      return { ...state, confirmLoading: false };
    }
    default:
      return state;
  }
};

export default roleWindow;
