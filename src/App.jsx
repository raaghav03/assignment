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
  const fileInputRef = useRef(null);
  const inputRef = useRef(null);

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
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "f") {
        e.preventDefault();
        if (inputRef.current) {
          inputRef.current.focus();
        }
      } else if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "u") {
        if (fileInputRef.current) {
          e.preventDefault();
          fileInputRef.current.click();
        }
      }
    };

    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  const searchSuggestions = getSearchSuggestions(searchText);

  return (
    <>
      <div className="m-8">
        <Toaster position="top-right" richColors />
        <div className="flex flex-row my-4 justify-between ">
          <div className="flex flex-col ">
            <p className="text-gray-900 antialiased font-medium text-2xl">
              {" "}
              Creative Dalaal FrontEnd Assignment
            </p>
            <p className="text-slate-500">By Raghav Nagpal</p>
          </div>
          <FileUpload
            file={file}
            handleFileChange={handleFileChange}
            ref={fileInputRef}
          />
        </div>
        {!file && (
          <div className="bg-yellow-100 border border-yellow-400  text-yellow-700 px-4 py-3 rounded-md relative my-4">
            No file has been uploaded yet. Please upload a file to continue.
          </div>
        )}
        {
          <>
            <div className="flex flex-row my-4 justify-between ">
              <SearchInput
                file={file}
                searchText={searchText}
                setSearchText={setSearchText}
                showDropdown={showDropdown}
                setShowDropdown={setShowDropdown}
                handleEnter={handleEnter}
                searchSuggestions={searchSuggestions}
                inputRef={inputRef} // Pass inputRef as a prop
              />

              <WordCount wordCount={wordCount} />
            </div>
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
          </>
        }
      </div>
      <div className="fixed bottom-4 right-4 bg-gray-100 p-4 text-gray-800  rounded-full">
        <p className="text-sm">
          Use <span className="font-semibold">cmd+f</span> for file search and{" "}
          <span className="font-semibold">cmd+u</span> for file upload
        </p>
      </div>
    </>
  );
}
