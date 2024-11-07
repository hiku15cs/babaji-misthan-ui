import Home from "./components/Home/Home";
import MilkEntry from "./components/Milk/MilkEntries.js/MilkEntry";
import MilkMen from "./components/Milk/MilkMan/Milkmen";
import NavBar from "./components/NavBar/Navigation";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        <NavBar /> {/* Include the navigation bar */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/milkman-details" element={<MilkMen />} />
          <Route path="/milkEntry" element={<MilkEntry/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
