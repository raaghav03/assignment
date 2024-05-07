// src/components/FileUpload.jsx

import { Upload } from "lucide-react";
import PropTypes from "prop-types";
const FileUpload = ({ file, handleFileChange }) => (
  <label
    htmlFor="file-upload"
    className="flex items-center justify-center rounded-full px-6 py-4 gap-2 border-2  text-gray-800 bg-white cursor-pointer transition-all duration-300 hover:bg-gray-100 hover:shadow-sm active:bg-gray-200 active:shadow-inner"
  >
    <Upload size={20} />
    <span>{file ? file.name : "Upload your file"}</span>
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
