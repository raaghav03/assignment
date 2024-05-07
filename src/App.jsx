// src/App.jsx
import { useState, useEffect, useRef } from "react";
import { Toaster } from "sonner";
import FileUpload from "./components/FileUpload";
import SearchInput from "./components/SearchInput";
import HighlightedText from "./components/HighlightedText";
import WordCount from "./components/WordCount";
import SearchCount from "./components/SearchCount";
import { readFileContent } from "./utils/fileUtils";
import useSearchHistory from "./hooks/useSearchHistory";

export default function App() {
  const [file, setFile] = useState(null);
  const [fileContent, setFileContent] = useState("");
  const [wordCount, setWordCount] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [searchCount, setSearchCount] = useState(0);
  const [showDropdown, setShowDropdown] = useState(false);
  const { addToSearchHistory, getSearchSuggestions } = useSearchHistory();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === "text/plain") {
      setFile(selectedFile);
      readFileContent(selectedFile, setFileContent, setWordCount);
    } else {
      console.error("Please select a text file (*.txt)");
    }
  };

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
      addToSearchHistory(searchText);
    }
  };

  useEffect(() => {
    handleSearch(searchText);
  });

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

  const searchSuggestions = getSearchSuggestions(searchText);
  const fileInputRef = useRef(null);
  const inputRef = useRef(null);

  return (
    <>
      <Toaster position="top-right" richColors />
      <FileUpload file={file} handleFileChange={handleFileChange} />
      <SearchInput
        file={file}
        searchText={searchText}
        setSearchText={setSearchText}
        showDropdown={showDropdown}
        setShowDropdown={setShowDropdown}
        handleEnter={handleEnter}
        searchSuggestions={searchSuggestions}
      />
      {searchText && (
        <SearchCount searchText={searchText} searchCount={searchCount} />
      )}
      {fileContent && (
        <div className="m-4 p-4 border border-stone-200 rounded-md">
          <pre className="object-fill text-wrap">
            <HighlightedText text={fileContent} highlight={searchText} />
          </pre>
        </div>
      )}
      {file && <WordCount wordCount={wordCount} />}
    </>
  );
}
