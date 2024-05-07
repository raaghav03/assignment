import { useState } from "react";
import { Upload } from "lucide-react";
import { Toaster, toast } from "sonner";

export default function App() {
  const [file, setFile] = useState(null);
  const [fileContent, setFileContent] = useState("");
  const [wordCount, setWordCount] = useState(0);

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
    const filteredWords = words.filter(Boolean); // Filter out empty strings
    setWordCount(filteredWords.length);
  };
  const readFileContent = (file) => {
    const fileReader = new FileReader();

    fileReader.onload = (e) => {
      const content = e.target.result;
      setFileContent(content);
      toast.success(`${file.name} has been uploaded`);
      calculateWordCount(content); // Update word count here
    };
    fileReader.readAsText(file);
  };
  return (
    <>
      <label className="flex rounded-full px-6 py-4 gap-2 m-4 border border-stone-200 text-gray-900 cursor-pointer">
        <Upload />
        <p>{file ? file.name : "Upload your file"}</p>
        <input
          type="file"
          accept=".txt "
          onChange={handleFileChange}
          className="hidden"
        ></input>
      </label>
      {fileContent && (
        <div className="m-4 p-4 border border-stone-200 rounded-md w-full">
          <pre className="text-wrap">{fileContent}</pre>
        </div>
      )}

      <p>{file ? `Word Count: ${wordCount}` : ""}</p>
      <Toaster position="top-right" richColors />
    </>
  );
}
