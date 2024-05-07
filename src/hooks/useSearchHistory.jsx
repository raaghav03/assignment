import { useState } from "react";

const useSearchHistory = () => {
  const [searchHistory, setSearchHistory] = useState([]);

  const addToSearchHistory = (searchTerm) => {
    setSearchHistory((prevHistory) => [
      ...new Set([...prevHistory, searchTerm]),
    ]);
  };

  const getSearchSuggestions = (searchText) => {
    if (searchText.trim() === "") {
      return [];
    }

    return searchHistory.filter((term) =>
      term.toLowerCase().includes(searchText.toLowerCase())
    );
  };

  return { searchHistory, addToSearchHistory, getSearchSuggestions };
};

export default useSearchHistory;
