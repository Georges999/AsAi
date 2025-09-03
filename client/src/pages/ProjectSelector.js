import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProjectSelector.css';

const ProjectSelector = () => {
  const navigate = useNavigate();
  const [selectedProject, setSelectedProject] = useState(null);

  const projectTypes = [
    {
      id: 'react-app',
      title: 'REACT WEB APP',
      icon: '⚛',
      description: 'Single-page applications with modern React ecosystem',
      complexity: 'INTERMEDIATE',
      features: ['Component Architecture', 'State Management', 'Routing', 'API Integration'],
      estimatedTime: '2-8 weeks'
    },
    {
      id: 'express-api',
      title: 'EXPRESS.JS API',
      icon: '🚀',
      description: 'RESTful APIs and backend services with Node.js',
      complexity: 'INTERMEDIATE',
      features: ['REST Endpoints', 'Database Integration', 'Authentication', 'Middleware'],
      estimatedTime: '1-4 weeks'
    },
    {
      id: 'mobile-app',
      title: 'MOBILE APPLICATION',
      icon: '📱',
      description: 'Cross-platform mobile apps with React Native or Flutter',
      complexity: 'ADVANCED',
      features: ['Native Components', 'Device APIs', 'App Store Deployment', 'Push Notifications'],
      estimatedTime: '4-12 weeks'
    },
    {
      id: 'game-dev',
      title: 'GAME DEVELOPMENT',
      icon: '🎮',
      description: 'Interactive games using JavaScript, Unity, or Godot',
      complexity: 'ADVANCED',
      features: ['Game Loop', 'Physics', 'Asset Management', 'User Input'],
      estimatedTime: '6-20 weeks'
    },
    {
      id: 'data-science',
      title: 'DATA SCIENCE PROJECT',
      icon: '📊',
      description: 'Machine learning and data analysis with Python',
      complexity: 'ADVANCED',
      features: ['Data Processing', 'ML Models', 'Visualization', 'Statistical Analysis'],
      estimatedTime: '2-10 weeks'
    },
    {
      id: 'desktop-app',
      title: 'DESKTOP APPLICATION',
      icon: '💻',
      description: 'Native desktop apps with Electron, Tauri, or native frameworks',
      complexity: 'INTERMEDIATE',
      features: ['Native UI', 'File System', 'System Integration', 'Auto Updates'],
      estimatedTime: '3-10 weeks'
    }
  ];

  const handleProjectSelect = (project) => {
    setSelectedProject(project);
    // Store selection in localStorage for later use
    localStorage.setItem('selectedProject', JSON.stringify(project));
  };

  const handleProceed = () => {
    if (selectedProject) {
      navigate('/template-generator');
    }
  };

  const getComplexityColor = (complexity) => {
    switch (complexity) {
      case 'BEGINNER': return 'var(--primary-green)';
      case 'INTERMEDIATE': return 'var(--warning-amber)';
      case 'ADVANCED': return 'var(--error-red)';
      default: return 'var(--secondary-green)';
    }
  };

  return (
    <div className="project-selector-page fade-in">
      <div className="selector-container">
        <header className="page-header">
          <h1 className="page-title glow">
            <span className="title-bracket">[</span>
            PROJECT TYPE SELECTION
            <span className="title-bracket">]</span>
          </h1>
          <p className="page-description">
            Choose your project type to receive tailored AI prompting guidance and templates.
            Each selection provides specific workflows optimized for that development context.
          </p>
        </header>

        <div className="projects-grid">
          {projectTypes.map((project) => (
            <div
              key={project.id}
              className={`project-card retro-screen ${selectedProject?.id === project.id ? 'selected' : ''}`}
              onClick={() => handleProjectSelect(project)}
            >
              <div className="card-header">
                <div className="project-icon">{project.icon}</div>
                <div className="project-info">
                  <h3 className="project-title">{project.title}</h3>
                  <div 
                    className="complexity-badge"
                    style={{ borderColor: getComplexityColor(project.complexity), color: getComplexityColor(project.complexity) }}
                  >
                    {project.complexity}
                  </div>
                </div>
              </div>

              <p className="project-description">{project.description}</p>

              <div className="project-features">
                <h4 className="features-title">KEY FEATURES:</h4>
                <ul className="features-list">
                  {project.features.map((feature, index) => (
                    <li key={index} className="feature-item">
                      <span className="feature-bullet">▸</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="project-meta">
                <div className="meta-item">
                  <span className="meta-label">EST. TIME:</span>
                  <span className="meta-value">{project.estimatedTime}</span>
                </div>
              </div>

              {selectedProject?.id === project.id && (
                <div className="selection-indicator">
                  <span className="selection-text">◆ SELECTED ◆</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {selectedProject && (
          <div className="selection-summary retro-screen">
            <h3 className="summary-title">SELECTION CONFIRMED</h3>
            <div className="summary-content">
              <div className="summary-project">
                <span className="summary-icon">{selectedProject.icon}</span>
                <span className="summary-name">{selectedProject.title}</span>
              </div>
              <p className="summary-description">
                You've selected {selectedProject.title.toLowerCase()}. 
                Proceed to generate optimized prompting templates for this project type.
              </p>
            </div>
            <button className="btn btn-primary proceed-button" onClick={handleProceed}>
              GENERATE TEMPLATES →
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectSelector;
