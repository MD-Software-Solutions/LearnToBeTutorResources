import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/Home';
import Layout from './components/Layout';
import MathResourcesPage from './components/Math';
import ToolPage from './components/Math/ToolPages';

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
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
