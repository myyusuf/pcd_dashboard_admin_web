const defaultState = {
  searchText: '',
  pageSize: 10,
  currentPage: 1,
  loading: false,
};

const projectionSearch = (state = defaultState, action) => {
  switch (action.type) {
    case 'PROJECTION_SEARCH_TEXT_CHANGED': {
      return { ...state, searchText: action.payload };
    }
    case 'PROJECTION_CURRENT_PAGE_CHANGED': {
      return { ...state, currentPage: action.payload };
    }
    case 'PROJECTION_LOADING_START': {
      return { ...state, loading: true };
    }
    case 'PROJECTION_LOADING_FINISH': {
      return { ...state, loading: false };
    }
    default:
      return state;
  }
};

export default projectionSearch;
