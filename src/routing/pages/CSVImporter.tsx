import { useEffect, useRef } from "react";
import { fileUploader } from "../../tools/fileUploader";

const stationApiAddress = "http://localhost:8080/api/stations/upload";

const CSVImporter = () => {
  const dropRef = useRef<HTMLDivElement | null>(null);

  handleDroppedFile(dropRef);

  function handleFileInput(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.item(0);
    if (file) {
      handleFileUpload(file, stationApiAddress);
    }
  }

  return (
    <div ref={dropRef} className="flex items-center justify-center">
      <div className="max-w-xl">
        <label className="flex justify-center w-full h-32 px-10 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none">
          <span className="flex items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
            <span className="font-medium text-gray-600 select-none">
              Drop bike station or bike trip CSV files here
            </span>
          </span>
          <input
            type="file"
            accept=".csv"
            name="file_upload"
            className="hidden"
            onChange={handleFileInput}
          />
        </label>
      </div>
    </div>
  );
};

export default CSVImporter;

function handleDroppedFile(
  dropRef: React.MutableRefObject<HTMLDivElement | null>
) {
  useEffect(() => {
    if (dropRef.current) {
      const dropDiv = dropRef.current;

      const handleDragOver = (e: DragEvent) => {
        e.preventDefault();
      };

      const handleDrop = (e: DragEvent) => {
        e.preventDefault();
        if (e.dataTransfer?.files) {
          handleFileUpload(e.dataTransfer.files[0], stationApiAddress);
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
}

function isValidStationCSV(data: string[][], headerRow: string[]) {
  //FID,ID,Nimi,Namn,Name,Osoite,Adress,Kaupunki,Stad,Operaattor,Kapasiteet,x,y

  return (
    data.length > 0 &&
    headerRow.length === 13 &&
    headerRow[0] === "FID" &&
    headerRow[1] === "ID" &&
    headerRow[2] === "Nimi" &&
    headerRow[3] === "Namn" &&
    headerRow[4] === "Name" &&
    headerRow[5] === "Osoite" &&
    headerRow[6] === "Adress" &&
    headerRow[7] === "Kaupunki" &&
    headerRow[8] === "Stad" &&
    headerRow[9] === "Operaattor" &&
    headerRow[10] === "Kapasiteet" &&
    headerRow[11] === "x" &&
    headerRow[12] === "y\r"
  );
}

const handleFileUpload = async (file: File, apiAddress: string) => {
  // read file
  const reader = new FileReader();
  reader.onload = async (e) => {
    const text = (e.target?.result as string) || "";
    const data = text.split("\n").map((item) => item.split(","));
    const headerRow = data[0];

    // Validate the CSV data
    if (!isValidStationCSV(data, headerRow)) {
      alert("Invalid CSV file format!");
    }

    // Upload the CSV file
    await fileUploader(file, apiAddress);
  };
  reader.readAsText(file);
};
