import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import BikeTrips from "./pages/BikeTrips";
import CSVImporter from "./pages/CSVImporter";
import BikeStations from "./pages/BikeStations";

export const RoutedContent = (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="bikestations" element={<BikeStations />} />
    <Route path="biketrips" element={<BikeTrips />} />
    <Route path="upload" element={<CSVImporter />} />
  </Routes>
);
