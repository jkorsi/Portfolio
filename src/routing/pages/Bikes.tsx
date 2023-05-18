import { useState, useEffect } from "react";
import { DynamicTable } from "../../components/DynamicTable";

const Bikes = () => {
  return (
    <div>
      <h1 className="mx-10 my-20">Bike data site comes here</h1>
      <h3 className="mx-10 my-20">Stations:</h3>
      <Stations />
    </div>
  );
};

const Stations = () => {
  const [stations, setStations] = useState<string[]>();
  const [headings, setHeadings] = useState<string[]>();

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch("http://localhost:8080/api/stations");

      const jsonResponse = await data.json();

      setStations(jsonResponse);
      setHeadings(Object.keys(jsonResponse[0]));
    };

    fetchData();
  }, []);

  if (!headings || !stations) {
    return <div className="h-96"></div>;
  }

  return DynamicTable(headings, stations);
};

export default Bikes;
