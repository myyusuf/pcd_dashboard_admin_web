const defaultState = {
  rows: [],
  count: 0,
};

const piutangs = (state = defaultState, action) => {
  switch (action.type) {
    case 'FETCH_PIUTANGS_SUCCESS':
      return { ...state, rows: action.payload.rows, count: action.payload.count };
    default:
      return state;
  }
};

export default piutangs;
