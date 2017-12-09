const defaultState = [];

const projectTypes = (state = defaultState, action) => {
  switch (action.type) {
    case 'FETCH_PROJECT_TYPES_SUCCESS':
      return action.payload;
    default:
      return state;
  }
};

export default projectTypes;
