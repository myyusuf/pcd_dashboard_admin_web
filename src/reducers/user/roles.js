const defaultState = [];

const roles = (state = defaultState, action) => {
  switch (action.type) {
    case 'FETCH_ROLES_SUCCESS':
      return action.payload;
    default:
      return state;
  }
};

export default roles;
