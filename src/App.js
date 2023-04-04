import React from "react";
import Home from "./Components/Home/Home";
import { BrowserRouter as Router, Routes,Route } from "react-router-dom";
import Header from "./Components/Header/Header";
import "./App.scss"

function App() {
  return <Router>
    <Header/>
    <Routes>
      <Route path="netflixClone/" element={<Home />} />
    </Routes>
    </Router>
}

export default App;
