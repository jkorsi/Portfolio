import { DynamicTable } from "./DynamicTable";

export const Stations = () => {
  const fetchUrl = "http://localhost:8080/api/stations";

  return (
    <DynamicTable
      fetchUrl={fetchUrl}
      columnFilter={["fid", "stationLocationX", "stationLocationY"]}
    />
  );
};
