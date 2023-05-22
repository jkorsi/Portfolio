import { useState, useEffect } from "react";
import { DynamicTable } from "./DynamicTable";
import fetch from "cross-fetch";

export const Stations = () => {
  const [stations, setStations] = useState<string[]>();
  const [headings, setHeadings] = useState<string[]>();

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch("http://localhost:8080/api/stations");

      const jsonResponse = (await data.json()) as string[];

      setStations(jsonResponse);

      setHeadings(Object.keys(jsonResponse[0]));
    };

    fetchData();
  }, []);

  if (!headings || !stations) {
    //TODO: Could try to prevent content shift
    return <div></div>;
  }

  console.log(stations);

  return (
    <DynamicTable
      headings={headings}
      content={stations}
      columnFilter={["fid", "stationLocationX", "stationLocationY"]}
    />
  );
};
