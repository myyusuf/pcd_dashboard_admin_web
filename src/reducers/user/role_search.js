const defaultState = {
  searchText: '',
  loading: false,
};

const roleSearch = (state = defaultState, action) => {
  switch (action.type) {
    case 'ROLE_SEARCH_TEXT_CHANGED': {
      return { ...state, searchText: action.payload };
    }
    case 'ROLE_LOADING_START': {
      return { ...state, loading: true };
    }
    case 'ROLE_LOADING_FINISH': {
      return { ...state, loading: false };
    }
    default:
      return state;
  }
};

export default roleSearch;
