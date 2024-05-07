import { useState } from "react";
import { Upload } from "lucide-react";

export default function App() {
  const [file, setFile] = useState(null);
  const [fileContent, setFileContent] = useState("");
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === "text/plain") {
      setFile(selectedFile);
      readFileContent(selectedFile);
    } else {
      console.error("Please select a text file (*.txt)");
    }
  };
  const readFileContent = (file) => {
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      setFileContent(e.target.result);
    };
    fileReader.readAsText(file);
  };
  return (
    <>
      <button> Search Text</button>
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
    </>
  );
}
