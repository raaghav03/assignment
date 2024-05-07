import PropTypes from "prop-types";
const WordCount = ({ wordCount }) => (
  <p className="">
    Word Count: {wordCount}
  </p>
);
WordCount.propTypes = {
  wordCount: PropTypes.number.isRequired,
};
export default WordCount;
