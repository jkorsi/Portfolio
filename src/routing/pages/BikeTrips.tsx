import { BikeTripsTable } from "../../components/BikeTripsTable";

const BikeTrips = () => {
  return (
    <div>
      <h3 className="mb-10">Bike trips in Helsinki and Espoo</h3>
      <div className="flex items-center justify-center">
        <BikeTripsTable />
      </div>
    </div>
  );
};

export default BikeTrips;
