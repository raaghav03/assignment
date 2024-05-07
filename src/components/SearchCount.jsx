import PropTypes from "prop-types";
const SearchCount = ({ searchCount }) => (
  <p>
    Total occurrences: {searchCount} {searchCount === 1 ? "match" : "matches"}
  </p>
);
SearchCount.propTypes = {
  searchText: PropTypes.string.isRequired,
  searchCount: PropTypes.number.isRequired,
};
export default SearchCount;
