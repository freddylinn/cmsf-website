import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Tool from "./pages/Tool";
import Intro from "./pages/Intro";
import Layout from "./components/Layout";
import Downloads from "./pages/Downloads";
import Audio from "./pages/Audio";
import BodyMovement from "./pages/BodyMovement";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route exact path="/" element={<Intro />} />
          <Route path="/tool" element={<Tool />} />
          <Route path="/downloads" element={<Downloads />} />
          <Route path="/audio" element={<Audio />} />
          <Route path="/movement" element={<BodyMovement />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
