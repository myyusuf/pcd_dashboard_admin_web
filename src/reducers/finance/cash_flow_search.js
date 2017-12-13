const defaultState = {
  searchText: '',
  pageSize: 10,
  currentPage: 1,
  loading: false,
};

const cashFlowSearch = (state = defaultState, action) => {
  switch (action.type) {
    case 'CASH_FLOW_SEARCH_TEXT_CHANGED': {
      return { ...state, searchText: action.payload };
    }
    case 'CASH_FLOW_CURRENT_PAGE_CHANGED': {
      return { ...state, currentPage: action.payload };
    }
    case 'CASH_FLOW_LOADING_START': {
      return { ...state, loading: true };
    }
    case 'CASH_FLOW_LOADING_FINISH': {
      return { ...state, loading: false };
    }
    default:
      return state;
  }
};

export default cashFlowSearch;
