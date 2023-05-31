import FileDropArea from "../../components/FileDropArea/FileDropArea";

const CSVImporter = () => {
  const acceptedFileType = ".csv";

  const stationApiAddress = "http://localhost:8080/api/stations/upload";
  const displayStationsDropText = "Drop / Select Station CSV here";
  const stationsTitle = "Stations File Selection";

  const bikeTripApiAddress = "http://localhost:8080/api/biketrips/upload";
  const displayBikeTripDropText = "Drop / Select Bike Trip CSV here";
  const bikeTripTitle = "Bike Trips File Selection";

  return (
    <div className="flex items-center justify-center max-lg:grid max-lg:ml-auto max-lg:mr-auto">
      <div className="m-4">
        <FileDropArea
          title={stationsTitle}
          apiAddress={stationApiAddress}
          validateCSV={isValidStationCSV}
          acceptedFileType={acceptedFileType}
          displayText={displayStationsDropText}
        />
      </div>
      <div className="m-4">
        <FileDropArea
          title={bikeTripTitle}
          apiAddress={bikeTripApiAddress}
          validateCSV={isValidBikeTripCSV}
          acceptedFileType={acceptedFileType}
          displayText={displayBikeTripDropText}
        />
      </div>
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
    headerRow[12] === "y"
  );
}

function isValidBikeTripCSV(data: string[][], headerRow: string[]): boolean {
  //FID,ID,Nimi,Namn,Name,Osoite,Adress,Kaupunki,Stad,Operaattor,Kapasiteet,x,y

  return (
    data.length > 0 &&
    headerRow.length === 8 &&
    headerRow[0] === "Departure" &&
    headerRow[1] === "Return" &&
    headerRow[2] === "Departure station id" &&
    headerRow[3] === "Departure station name" &&
    headerRow[4] === "Return station id" &&
    headerRow[5] === "Return station name" &&
    headerRow[6] === "Covered distance (m)" &&
    headerRow[7] === "Duration (sec.)"
  );
}
