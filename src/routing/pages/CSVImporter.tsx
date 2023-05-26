import FileDropArea from "../../components/FileDropArea";

const CSVImporter = () => {
  const stationApiAddress = "http://localhost:8080/api/stations/upload";
  const acceptedFileType = ".csv";
  const displayStationsDropText = "Drop / Select Station CSV here";
  const stationsTitle = "Stations File Selection";

  return (
    <div>
      <FileDropArea
        title={stationsTitle}
        apiAddress={stationApiAddress}
        validateCSV={isValidStationCSV}
        acceptedFileType={acceptedFileType}
        displayText={displayStationsDropText}
      />
    </div>
  );
};

export default CSVImporter;

function isValidStationCSV(data: string[][], headerRow: string[]): boolean {
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
