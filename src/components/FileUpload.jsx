// src/components/FileUpload.jsx

import { Upload } from "lucide-react";
import PropTypes from "prop-types";
const FileUpload = ({ file, handleFileChange }) => (
  <label
    className="flex rounded-full px-6 py-4 gap-2 m-4 border border-stone-200 text-gray-900 cursor-pointer"
    htmlFor="file-upload"
  >
    <Upload />
    <p>{file ? file.name : "Upload your file"}</p>
    <input
      id="file-upload"
      type="file"
      accept=".txt"
      onChange={handleFileChange}
      className="hidden"
    />
  </label>
);
FileUpload.propTypes = {
  file: PropTypes.isRequired,
  handleFileChange: PropTypes.isRequired,
};
export default FileUpload;
