import { useState } from "react";

export default function UploadBox({ onFileSelect }) {
  const [fileName, setFileName] = useState("");

  function handleFileChange(e) {
    const file = e.target.files[0];
    if (!file) return;

    setFileName(file.name);
    onFileSelect(file);
  }

  return (
    <div className="w-full max-w-md mx-auto mt-12">
      <label
        htmlFor="file-upload"
        className=" 
          font-['Funnel_Sans'] flex flex-col items-center justify-center
          border-2 border-dashed border-gray-400
          rounded-xl p-8 cursor-pointer
          hover:border-blue-500 hover:bg-blue-50
          transition
        "
      >
        <svg
          className="w-12 h-12 text-gray-500 mb-3"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1M4 12l8-8 8 8M12 4v12"
          />
        </svg>

        <span className="text-gray-600 font-medium">
          {fileName || "Click to upload your browser history (JSON file)"}
        </span>

        <input
          id="file-upload"
          type="file"
          accept=".json"
          className="hidden"
          onChange={handleFileChange}
        />
      </label>
    </div>
  );
}
