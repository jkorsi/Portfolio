import { useRef, useState, ChangeEvent, FC } from "react";
import { FileUploadLabel } from "./FileUploadLabel";
import { useDropHandler, handleFileUpload } from "./useDropHandler";

type FileDropAreaProps = {
  apiAddress: string;
  validateCSV: (data: string[][], headerRow: string[]) => boolean;
  acceptedFileType: string;
  displayText: string;
  title: string;
};

const FileDropArea: FC<FileDropAreaProps> = ({
  apiAddress,
  validateCSV,
  acceptedFileType,
  displayText,
  title,
}) => {
  const dropRef = useRef<HTMLDivElement | null>(null);

  const [importStatus, setImportStatus] = useState("No files imported");

  useDropHandler(dropRef, apiAddress, validateCSV, setImportStatus);

  const handleFileInput = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.item(0);
    if (file) {
      handleFileUpload(file, apiAddress, validateCSV, setImportStatus);
    }
  };

  return (
    <div className="max-w-sm p-4 bg-slate-200 rounded-xl">
      <div className="text-left ml-1 mb-4">{title}</div>
      <div ref={dropRef} className="flex items-center justify-center">
        <FileUploadLabel
          handleFileInput={handleFileInput}
          acceptedFileType={acceptedFileType}
          displayText={displayText}
        />
      </div>
      <div className="text-left text-xs ml-1 mt-1 text-slate-500">
        Import status: {importStatus}
      </div>
    </div>
  );
};

export default FileDropArea;
