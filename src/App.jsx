import { Upload } from "lucide-react";

export default function App() {
  return (
    <>
      <button className="flex rounded-full  px-6 py-4 gap-2 m-4 border border-stone-200 text-gray-900">
        <Upload />
        <div>Upload your file</div>
      </button>
    </>
  );
}
