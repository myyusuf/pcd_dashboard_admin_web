const defaultState = {
  searchText: '',
  pageSize: 10,
  currentPage: 1,
  loading: false,
};

const piutangSearch = (state = defaultState, action) => {
  switch (action.type) {
    case 'PIUTANG_SEARCH_TEXT_CHANGED': {
      return { ...state, searchText: action.payload };
    }
    case 'PIUTANG_CURRENT_PAGE_CHANGED': {
      return { ...state, currentPage: action.payload };
    }
    case 'PIUTANG_LOADING_START': {
      return { ...state, loading: true };
    }
    case 'PIUTANG_LOADING_FINISH': {
      return { ...state, loading: false };
    }
    default:
      return state;
  }
};

export default piutangSearch;
