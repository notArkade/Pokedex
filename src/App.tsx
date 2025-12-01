import "./App.css";
import Card from "./components/Card";
import CardDetails from "./components/CardDetails";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Card />}/>
        <Route path="/pokemon/:id" element={<CardDetails />}/>
      </Routes>
    </Router>
  );
};

export default App;
