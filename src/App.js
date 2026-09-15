import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Tool from "./pages/Tool";
import Intro from "./pages/Intro";
import IntroES from "./pages/IntroES";
import Layout from "./components/Layout";
import Downloads from "./pages/Downloads";
import Audio from "./pages/Audio";
import BodyMovement from "./pages/BodyMovement";
import PatientTasks from './pages/PatientTasks';
import Research from "./pages/Research";
import Resources from './pages/Resources';
import FitiAssessment from "./pages/FitiAssessment";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* English (default) */}
          <Route exact path="/" element={<Intro />} />
          <Route path="/tool" element={<Tool lang="en" />} />
          <Route path="/downloads" element={<Downloads />} />
          <Route path="/audio" element={<Audio />} />
          <Route path="/movement" element={<BodyMovement lang="en" />} />
          <Route path="/patient-view" element={<PatientTasks lang="en" />} />
          <Route path="/research" element={<Research />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/fiti" element={<FitiAssessment />} />

          {/* Español (Chile) — CMSF SPCh */}
          <Route path="/es" element={<IntroES />} />
          <Route path="/es/tool" element={<Tool lang="es" />} />
          <Route path="/es/movement" element={<BodyMovement lang="es" />} />
          <Route path="/es/patient-view" element={<PatientTasks lang="es" />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
