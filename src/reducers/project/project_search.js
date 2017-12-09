const defaultState = {
  searchText: '',
  pageSize: 10,
  currentPage: 1,
  loading: false,
};

const projectSearch = (state = defaultState, action) => {
  switch (action.type) {
    case 'PROJECT_SEARCH_TEXT_CHANGED': {
      return { ...state, searchText: action.payload };
    }
    case 'PROJECT_CURRENT_PAGE_CHANGED': {
      return { ...state, currentPage: action.payload };
    }
    case 'PROJECT_LOADING_START': {
      return { ...state, loading: true };
    }
    case 'PROJECT_LOADING_FINISH': {
      return { ...state, loading: false };
    }
    default:
      return state;
  }
};

export default projectSearch;
