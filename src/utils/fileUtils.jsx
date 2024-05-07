// src/utils/fileUtils.js
import { toast } from "sonner";

export const readFileContent = (file, setFileContent, setWordCount) => {
  const fileReader = new FileReader();
  fileReader.onload = (e) => {
    const content = e.target.result;
    setFileContent(content);
    calculateWordCount(content, setWordCount);
    toast.success(`${file.name} has been uploaded`);
  };
  fileReader.readAsText(file);
};

export const calculateWordCount = (text, setWordCount) => {
  const words = text.trim().split(/\s+/);
  setWordCount(words.filter(Boolean).length);
};
