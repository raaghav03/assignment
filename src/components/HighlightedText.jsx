// HighlightedText.jsx

import PropTypes from "prop-types";

/**
 * HighlightedText component
 *
 * Renders the provided text with the specified highlight term highlighted.
 *
 * @param {string} text - The text to be rendered.
 * @param {string} highlight - The term to be highlighted within the text.
 * @param {string} highlightClassName - The CSS class to apply to the highlighted text.
 * @returns {JSX.Element} The rendered HighlightedText component.
 */
const HighlightedText = ({
  text,
  highlight,
  highlightClassName = "highlight",
}) => {
  if (!highlight.trim()) return <>{text}</>;
  const parts = [];
  let startIndex = 0;
  let highlightIndex;
  const lowerText = text.toLowerCase();
  const lowerHighlight = highlight.toLowerCase();

  while (
    (highlightIndex = lowerText.indexOf(lowerHighlight, startIndex)) !== -1
  ) {
    const before = text.slice(startIndex, highlightIndex);
    const highlighted = text.slice(
      highlightIndex,
      highlightIndex + highlight.length
    );
    parts.push(before);
    parts.push(
      <mark key={highlightIndex} className={highlightClassName}>
        {highlighted}
      </mark>
    );
    startIndex = highlightIndex + highlight.length;
  }

  parts.push(text.slice(startIndex));
  return <>{parts}</>;
};

HighlightedText.propTypes = {
  text: PropTypes.string.isRequired,
  highlight: PropTypes.string.isRequired,
  highlightClassName: PropTypes.string,
};

export default HighlightedText;
