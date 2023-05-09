import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import About from "./pages/About";
import Bikes from "./pages/Bikes";
import Sandbox from "./pages/Sandbox";

export const RoutedContent = (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="about" element={<About />} />
    <Route path="bikes" element={<Bikes />} />
    <Route path="sandbox" element={<Sandbox />} />
  </Routes>
);
