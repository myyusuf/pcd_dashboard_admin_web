const defaultState = {
  rows: [],
  count: 0,
};

const cashFlows = (state = defaultState, action) => {
  switch (action.type) {
    case 'FETCH_CASH_FLOWS_SUCCESS':
      return { ...state, rows: action.payload.rows, count: action.payload.count };
    default:
      return state;
  }
};

export default cashFlows;
