import { useState } from "react";
import { Upload } from "lucide-react";
import { Toaster, toast } from "sonner";

import PropTypes from "prop-types"; // Import PropTypes
const HighlightedText = ({ text, highlight }) => {
  if (!highlight) return <>{text}</>;

  const parts = [];
  let startIndex = 0;
  let highlightIndex;

  while (
    (highlightIndex = text
      .toLowerCase()
      .indexOf(highlight.toLowerCase(), startIndex)) !== -1
  ) {
    const part1 = text.slice(startIndex, highlightIndex);
    const part2 = text.slice(highlightIndex, highlightIndex + highlight.length);
    parts.push(part1, <mark key={highlightIndex}>{part2}</mark>);
    startIndex = highlightIndex + highlight.length;
  }

  if (startIndex < text.length) {
    parts.push(text.slice(startIndex));
  }

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

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === "text/plain") {
      setFile(selectedFile);
      readFileContent(selectedFile);
      console.log(selectedFile.name);
    } else {
      console.error("Please select a text file (*.txt)");
    }
  };

  const calculateWordCount = (text) => {
    if (!text) return 0;
    const words = text.trim().split(/\s+/);
    const filteredWords = words.filter(Boolean);
    setWordCount(filteredWords.length);
  };

  const readFileContent = (file) => {
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      const content = e.target.result;
      setFileContent(content);
      toast.success(`${file.name} has been uploaded`);
      calculateWordCount(content);
    };
    fileReader.readAsText(file);
  };

  const handleSearch = (e) => {
    const searchValue = e.target.value;
    setSearchText(searchValue);

    let count = 0;
    let lowercaseContent = fileContent.toLowerCase();
    let searchIndex = 0;

    while (
      (searchIndex = lowercaseContent.indexOf(
        searchValue.toLowerCase(),
        searchIndex
      )) !== -1
    ) {
      count++;
      searchIndex += searchValue.length;
    }

    setSearchCount(count);
  };

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
          onChange={handleSearch}
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
