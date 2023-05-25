import ResponsiveNav from "./components/ResponsiveNav";
import { Footer } from "./components/Footer";
import { RoutedContent } from "./routing/Router";
import { BrowserRouter } from "react-router-dom";

import "./App.css";

function App() {
  return (
    <div>
      <BrowserRouter>
        <ResponsiveNav />
        <main className="p-10">{RoutedContent}</main>

        {/* <footer className="py-4 absolute bottom-0">Footer Comes Here</footer> */}
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
