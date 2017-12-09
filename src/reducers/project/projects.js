const defaultState = {
  rows: [],
  count: 0,
};

const projects = (state = defaultState, action) => {
  switch (action.type) {
    case 'FETCH_PROJECTS_SUCCESS':
      return { ...state, rows: action.payload.rows, count: action.payload.count };
    default:
      return state;
  }
};

export default projects;
