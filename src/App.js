import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Tool from "./pages/Tool";
import Intro from "./pages/Intro";
import Layout from "./components/Layout";
import Downloads from "./pages/Downloads";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route exact path="/" element={<Intro />} />
          <Route path="/tool" element={<Tool />} />
          <Route path="/downloads" element={<Downloads />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
