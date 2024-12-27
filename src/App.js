import React from 'react';
import './App.css';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/Home';
import Layout from './components/Layout';
import MathResourcesPage from './components/Math';
import ToolPage from './components/Math/ToolPages';
import ComingSoonPage from './components/ComingSoon';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/LearnToBeTutorResources" element={<HomePage />} />
          <Route path="/LearnToBeTutorResources/math-resources" element={<MathResourcesPage />} />
          <Route path="/LearnToBeTutorResources/math-resources/:category" element={<MathResourcesPage />} />
          <Route path="/LearnToBeTutorResources/math-resources/tools/ToolPages/:tool_type" element={<ToolPage />} />
          <Route path="/LearnToBeTutorResources/reading-resources" element={<ComingSoonPage />} />
          <Route path="/LearnToBeTutorResources/science-resources" element={<ComingSoonPage />} />
          <Route path="/about-page" element={<ComingSoonPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}


export default App;
