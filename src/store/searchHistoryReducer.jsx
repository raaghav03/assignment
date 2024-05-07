// searchHistoryReducer.js
const initialState = {
  searchHistory: [],
};

const searchHistoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_SEARCH_TERM":
      return {
        ...state,
        searchHistory: [...state.searchHistory, action.payload],
      };
    default:
      return state;
  }
};

export default searchHistoryReducer;
