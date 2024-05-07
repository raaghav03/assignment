import { useState } from "react";
import { Upload } from "lucide-react";
import { Toaster, toast } from "sonner";
// import { debounce } from "lodash";
import PropTypes from "prop-types"; // Proper import statement

// HighlightedText component definition
const HighlightedText = ({ text, highlight }) => {
  if (!highlight.trim()) return <>{text}</>; // Ensure empty strings don't cause false highlights
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
    parts.push(<mark key={highlightIndex}>{highlighted}</mark>);
    startIndex = highlightIndex + highlight.length;
  }

  parts.push(text.slice(startIndex)); // Append remaining text after the last match
  return <>{parts}</>;
};

HighlightedText.propTypes = {
  text: PropTypes.string.isRequired,
  highlight: PropTypes.string.isRequired,
};

export default function App() {
  const [file, setFile] = useState(null);
  const [fileContent, setFileContent] = useState("");
  const [wordCount, setWordCount] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [searchCount, setSearchCount] = useState(0);

  // Function to handle file selection and content reading
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === "text/plain") {
      setFile(selectedFile);
      readFileContent(selectedFile);
    } else {
      console.error("Please select a text file (*.txt)");
    }
  };

  // Function to read file content
  const readFileContent = (file) => {
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      const content = e.target.result;
      setFileContent(content);
      calculateWordCount(content);
      toast.success(`${file.name} has been uploaded`);
    };
    fileReader.readAsText(file);
  };

  // Function to calculate word count from text
  const calculateWordCount = (text) => {
    const words = text.trim().split(/\s+/);
    setWordCount(words.filter(Boolean).length);
  };

  // Main function to handle search and count occurrences
const handleSearch = (searchValue) => {
  setSearchText(searchValue);

  if (searchValue === "") {
    // Handle empty search query logically
    setSearchCount(0);
    return;
  }

  const lowerSearchValue = searchValue.toLowerCase();
  let count = 0;
  const lowerContent = fileContent.toLowerCase();
  let searchIndex = 0;

  while (
    (searchIndex = lowerContent.indexOf(lowerSearchValue, searchIndex)) !== -1
  ) {
    count++;
    searchIndex += lowerSearchValue.length; // Ensure the next search starts after the current match to avoid infinite loops
  }

  setSearchCount(count);
};


  // Debounce the search handler function to optimize performance
  // const debouncedHandleSearch = debounce(handleSearch, 300);

  return (
    <>
      <Toaster position="top-right" richColors />
      <label className="flex rounded-full px-6 py-4 gap-2 m-4 border border-stone-200 text-gray-900 cursor-pointer">
        <Upload />
        <p>{file ? file.name : "Upload your file"}</p>
        <input
          type="file"
          accept=".txt"
          onChange={handleFileChange}
          className="hidden"
        />
      </label>
      <div className="m-4">
        <input
          type="text"
          placeholder="Search in file..."
          value={searchText}
          onChange={(e) => handleSearch(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md"
        />
        {searchText && (
          <p>
            Total occurrences: {searchCount}{" "}
            {searchCount === 1 ? "match" : "matches"}
          </p>
        )}
      </div>
      {fileContent && (
        <div className="m-4 p-4 border border-stone-200 rounded-md">
          <pre>
            <HighlightedText text={fileContent} highlight={searchText} />
          </pre>
        </div>
      )}
      <p>{file ? `Word Count: ${wordCount}` : ""}</p>
    </>
  );
}
