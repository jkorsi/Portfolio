import ResponsiveNav from "./components/ResponsiveNav";
import { RoutedContent } from "./routing/Router";
import { BrowserRouter } from "react-router-dom";

import "./App.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <ResponsiveNav />
        <main className="mt-24 mb-24 mx-5 p-10">{RoutedContent}</main>
        <footer className="mt-96 mb-0">Alateksti xx</footer>
      </BrowserRouter>
    </>
  );
}

export default App;
