import { useRef } from "react";
import PropTypes from "prop-types";
import SearchHistoryDropdown from "./SearchHistory";

const SearchInput = ({
  file,
  searchText,
  setSearchText,
  showDropdown,
  setShowDropdown,
  handleEnter,
  searchSuggestions,
}) => {
  const inputRef = useRef(null);

  return (
    <div className="relative">
      <input
        type="text"
        placeholder={
          file ? "Search in file..." : "Please upload a file to enable search"
        }
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        onFocus={() => setShowDropdown(true)}
        onBlur={() => setShowDropdown(false)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleEnter();
          }
        }}
        ref={inputRef} // src/components/SearchInput.jsx (continued)
        disabled={!file}
        className={`px-4 py-2 border ${
          !file ? "border-gray-200" : "border-gray-300"
        } rounded-md w-full hover:border-gray-400 focus:border-blue-500 focus:outline-none ${
          !file ? "cursor-not-allowed" : "cursor-auto"
        }`}
      />
      {showDropdown && searchSuggestions.length > 0 && (
        <SearchHistoryDropdown
          searchSuggestions={searchSuggestions}
          setSearchText={setSearchText}
          setShowDropdown={setShowDropdown}
          inputRef={inputRef}
        />
      )}
    </div>
  );
};
SearchInput.propTypes = {
  searchText: PropTypes.string.isRequired,
  setSearchText: PropTypes.string.isRequired,
  showDropdown: PropTypes.bool.isRequired,
  searchSuggestions: PropTypes.string.isRequired,
  file: PropTypes.isRequired,
  setShowDropdown: PropTypes.bool.isRequired,
  handleEnter: PropTypes.isRequired,
};

export default SearchInput;
