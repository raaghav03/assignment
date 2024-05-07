import React from "react"; // Ensure React is imported
import { Upload } from "lucide-react";
import PropTypes from "prop-types";

const FileUpload = React.forwardRef(({ file, handleFileChange }, ref) => (
  <label
    htmlFor="file-upload"
    className="flex items-center justify-center rounded-full px-6 py-4 gap-2 border-2 text-gray-800 bg-white cursor-pointer transition-all duration-300 hover:bg-gray-100 hover:shadow-sm active:bg-gray-200 active:shadow-inner"
  >
    <Upload size={20} />
    <span>{file ? `${file.name} is uploaded` : "Upload your file"}</span>
    <input
      id="file-upload"
      type="file"
      accept=".txt"
      onChange={handleFileChange}
      className="hidden"
      ref={ref}
    />
  </label>
));

FileUpload.displayName = "FileUpload"; // Set displayName for the component

FileUpload.propTypes = {
  file: PropTypes.object, // 'object' is used here, consider specifying the shape if known
  handleFileChange: PropTypes.func.isRequired,
};

export default FileUpload;
