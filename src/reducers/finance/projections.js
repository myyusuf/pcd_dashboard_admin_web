const defaultState = {
  rows: [],
  count: 0,
};

const projections = (state = defaultState, action) => {
  switch (action.type) {
    case 'FETCH_PROJECTIONS_SUCCESS':
      return { ...state, rows: action.payload.rows, count: action.payload.count };
    default:
      return state;
  }
};

export default projections;
