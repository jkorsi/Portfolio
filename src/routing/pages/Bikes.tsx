import { Stations } from "../../components/Stations";

const Bikes = () => {
  return (
    <div>
      <h1 className="mx-10 my-20">Bike data site comes here</h1>
      <h3 className="mx-10 my-20">Stations:</h3>
      <div className="flex items-center justify-center">
        <Stations />
      </div>
    </div>
  );
};

export default Bikes;
