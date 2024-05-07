import PropTypes from "prop-types";
import SearchHistoryDropdown from "./SearchHistory"; // Make sure the import is correct

const SearchInput = ({
  file,
  searchText,
  setSearchText,
  showDropdown,
  setShowDropdown,
  handleEnter,
  searchSuggestions,
  inputRef, // Receive inputRef as a prop
}) => {
  const placeholderText = file ? "Search in File" : "No file Uploaded";

  return (
    <p>
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
        } rounded-md flex-4 hover:border-gray-400 focus:border-blue-500 focus:outline-none ${
          !file ? "cursor-not-allowed flex-4" : "cursor-auto"
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
  file: PropTypes.any, // Consider specifying a more specific type or using PropTypes.shape
  searchText: PropTypes.string.isRequired,
  setSearchText: PropTypes.func.isRequired,
  showDropdown: PropTypes.bool.isRequired,
  setShowDropdown: PropTypes.func.isRequired,
  handleEnter: PropTypes.func.isRequired,
  searchSuggestions: PropTypes.arrayOf(PropTypes.string).isRequired,
  inputRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]).isRequired,
};

export default SearchInput;
