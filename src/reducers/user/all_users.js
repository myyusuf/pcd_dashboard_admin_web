const defaultState = [];

const allUsersByRole = (state = defaultState, action) => {
  switch (action.type) {
    case 'FETCH_ALL_USERS_BY_ROLE_SUCCESS':
      return action.payload;
    default:
      return state;
  }
};

export default allUsersByRole;
