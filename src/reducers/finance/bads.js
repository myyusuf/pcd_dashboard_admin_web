const defaultState = {
  rows: [],
  count: 0,
};

const bads = (state = defaultState, action) => {
  switch (action.type) {
    case 'FETCH_BADS_SUCCESS':
      return { ...state, rows: action.payload.rows, count: action.payload.count };
    default:
      return state;
  }
};

export default bads;
