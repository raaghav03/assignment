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

  const placeholderText = file
    ? "Search in File"
    : "Please upload a file to enable search";

  return (
    <p className="fit-content">
      <input
        type="text"
        placeholder={placeholderText}
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        onFocus={() => setShowDropdown(true)}
        onBlur={() => setShowDropdown(false)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleEnter();
          }
        }}
        ref={inputRef}
        disabled={!file}
        className={`px-4 py-2 border object-fill ${
          !file ? "border-gray-200" : "border-gray-300"
        } rounded-md w-1/4 hover:border-gray-400 focus:border-blue-500 focus:outline-none ${
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
    </p>
  );
};

SearchInput.propTypes = {
  searchText: PropTypes.string.isRequired,
  setSearchText: PropTypes.func.isRequired,
  showDropdown: PropTypes.bool.isRequired,
  searchSuggestions: PropTypes.arrayOf(PropTypes.string).isRequired,
  file: PropTypes.any, // relaxed type since the file can be null or an object
  setShowDropdown: PropTypes.func.isRequired,
  handleEnter: PropTypes.func.isRequired,
};

export default SearchInput;
