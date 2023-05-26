import { useEffect, MutableRefObject } from "react";
import { fileUploader } from "../tools/fileUploader";

type HandleFileUploadType = (
  file: File,
  apiAddress: string,
  validateCSV: (data: string[][], headerRow: string[]) => boolean,
  setImportStatus: React.Dispatch<React.SetStateAction<string>>
) => void;
export const handleFileUpload: HandleFileUploadType = async (
  file,
  apiAddress,
  validateCSV,
  setImportStatus
) => {
  const reader = new FileReader();

  reader.onload = async (e) => {
    const text = (e.target?.result as string) || "";
    const data = text.split("\n").map((item) => item.split(","));
    const headerRow = data[0];

    if (!validateCSV(data, headerRow)) {
      alert("Invalid CSV file format!");
      setImportStatus("Invalid CSV file format!");
      return;
    }

    const uploadStatus = await fileUploader(file, apiAddress);
    setImportStatus(uploadStatus || "File not loaded");
  };

  reader.readAsText(file);
};
type UseDropHandlerType = (
  dropRef: MutableRefObject<HTMLDivElement | null>,
  apiAddress: string,
  validateCSV: (data: string[][], headerRow: string[]) => boolean,
  setImportStatus: React.Dispatch<React.SetStateAction<string>>
) => void;
export const useDropHandler: UseDropHandlerType = (
  dropRef,
  apiAddress,
  validateCSV,
  setImportStatus
) => {
  useEffect(() => {
    const dropDiv = dropRef.current;
    if (dropDiv) {
      const handleDragOver = (e: DragEvent) => e.preventDefault();

      const handleDrop = (e: DragEvent) => {
        e.preventDefault();
        const files = e.dataTransfer?.files;
        if (files && files.length > 0) {
          handleFileUpload(files[0], apiAddress, validateCSV, setImportStatus);
        }
      };

      dropDiv.addEventListener("dragover", handleDragOver);
      dropDiv.addEventListener("drop", handleDrop);

      return () => {
        dropDiv.removeEventListener("dragover", handleDragOver);
        dropDiv.removeEventListener("drop", handleDrop);
      };
    }
  }, []);
};
