import { useState, useRef, useEffect } from "react";
import { Upload } from "lucide-react";
import { Toaster, toast } from "sonner";
import PropTypes from "prop-types";

const HighlightedText = ({ text, highlight }) => {
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
    parts.push(<mark key={highlightIndex}>{highlighted}</mark>);
    startIndex = highlightIndex + highlight.length;
  }

  parts.push(text.slice(startIndex));
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
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchHistory, setSearchHistory] = useState([]);
  const inputRef = useRef(null);

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

  // Function to get search suggestions based on search history and current input
  const getSearchSuggestions = () => {
    if (searchText.trim() === "") {
      return [];
    }

    return searchHistory.filter((term) =>
      term.toLowerCase().includes(searchText.toLowerCase())
    );
  };

  // Main function to handle search and count occurrences
  const handleSearch = (searchValue) => {
    setSearchText(searchValue);

    if (searchValue === "") {
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
      searchIndex += lowerSearchValue.length;
    }

    setSearchCount(count);
  };

  const handleEnter = () => {
    if (searchText.trim() !== "") {
      setSearchHistory((prevHistory) => [
        ...new Set([...prevHistory, searchText]),
      ]);
    }
  };

  useEffect(() => {
    handleSearch(searchText);
  }, [searchText, fileContent]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      // Handle CMD+U or CTRL+U to trigger file upload
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "u") {
        e.preventDefault();
        fileInputRef.current.click(); // Programmatically open file dialog
      }

      // Handle CMD+F or CTRL+F to focus on the search input
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "f") {
        e.preventDefault(); // Prevent default find dialog
        inputRef.current.focus(); // Focus on the search input
      }
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress); // Cleanup the event listener
    };
  }, []);

  const searchSuggestions = getSearchSuggestions();
  const fileInputRef = useRef(null);

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
          ref={fileInputRef} // Reference to this input
        />
      </label>
      <div className="relative">
        <input
          type="text"
          placeholder="Search in file..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onFocus={() => setShowDropdown(true)}
          onBlur={() => setShowDropdown(false)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleEnter();
            }
          }}
          ref={inputRef} // Reference to this input for search
          className="px-4 py-2 border border-gray-300 rounded-md"
        />
        {showDropdown && searchHistory.length > 0 && (
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
        )}
      </div>
      {searchText && (
        <p>
          Total occurrences: {searchCount}{" "}
          {searchCount === 1 ? "match" : "matches"}
        </p>
      )}
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
