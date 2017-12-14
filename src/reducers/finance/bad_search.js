const defaultState = {
  searchText: '',
  pageSize: 10,
  currentPage: 1,
  loading: false,
};

const badSearch = (state = defaultState, action) => {
  switch (action.type) {
    case 'BAD_SEARCH_TEXT_CHANGED': {
      return { ...state, searchText: action.payload };
    }
    case 'BAD_CURRENT_PAGE_CHANGED': {
      return { ...state, currentPage: action.payload };
    }
    case 'BAD_LOADING_START': {
      return { ...state, loading: true };
    }
    case 'BAD_LOADING_FINISH': {
      return { ...state, loading: false };
    }
    default:
      return state;
  }
};

export default badSearch;
