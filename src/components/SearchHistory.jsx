import PropTypes from "prop-types";
const SearchHistoryDropdown = ({
  searchSuggestions,
  setSearchText,
  setShowDropdown,
  inputRef,
}) => (
  <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 shadow-md">
    {searchSuggestions.map((suggestion, index) => (
      <div
        key={index}
        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
        onClick={() => {
          setSearchText(suggestion);
          setShowDropdown(false);
          inputRef.current.focus();
        }}
      >
        {suggestion}
      </div>
    ))}
  </div>
);
SearchHistoryDropdown.propTypes = {
  searchSuggestions: PropTypes.string.isRequired,
  setSearchText: PropTypes.string.isRequired,
  setShowDropdown: PropTypes.bool.isRequired,
  inputRef: PropTypes.isRequired,
};
export default SearchHistoryDropdown;
