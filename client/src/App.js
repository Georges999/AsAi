import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Import page components
import HomePage from './pages/HomePage';
import ProjectSelector from './pages/ProjectSelector';
import TemplateGenerator from './pages/TemplateGenerator';
import FileStructure from './pages/FileStructure';
import Troubleshooting from './pages/Troubleshooting';
import Workflow from './pages/Workflow';
import Progress from './pages/Progress';

// Import layout components
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

function App() {
  useEffect(() => {
    // Remove loading screen after app loads
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
      setTimeout(() => {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
          loadingScreen.remove();
        }, 500);
      }, 1000);
    }
  }, []);

  return (
    <div className="App">
      <Router>
        <div className="app-container">
          <Header />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/project-selector" element={<ProjectSelector />} />
              <Route path="/template-generator" element={<TemplateGenerator />} />
              <Route path="/file-structure" element={<FileStructure />} />
              <Route path="/troubleshooting" element={<Troubleshooting />} />
              <Route path="/workflow" element={<Workflow />} />
              <Route path="/progress" element={<Progress />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </div>
  );
}

export default App;
