import React, { useState, useEffect } from 'react';
import './FileStructure.css';

const FileStructure = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [structureData, setStructureData] = useState(null);

  useEffect(() => {
    const savedProject = localStorage.getItem('selectedProject');
    if (savedProject) {
      setSelectedProject(JSON.parse(savedProject));
    }
  }, []);

  useEffect(() => {
    if (selectedProject) {
      loadStructureData(selectedProject.id);
    }
  }, [selectedProject]);

  const loadStructureData = (projectType) => {
    // Mock structure data - in real app, this would come from API
    const structures = {
      'react-app': {
        name: 'React Application Structure',
        description: 'Organized folder structure for scalable React applications',
        structure: {
          'src/': {
            'components/': {
              'common/': ['Button.js', 'Input.js', 'Modal.js', 'Loading.js'],
              'layout/': ['Header.js', 'Footer.js', 'Sidebar.js', 'Navigation.js'],
              'features/': {
                'auth/': ['LoginForm.js', 'SignupForm.js', 'UserProfile.js'],
                'dashboard/': ['DashboardLayout.js', 'StatCard.js', 'Chart.js'],
                'settings/': ['SettingsForm.js', 'PreferencesPanel.js']
              }
            },
            'hooks/': ['useAuth.js', 'useLocalStorage.js', 'useApi.js', 'useDebounce.js'],
            'pages/': ['Home.js', 'About.js', 'Contact.js', 'Dashboard.js'],
            'services/': ['api.js', 'auth.js', 'storage.js', 'validation.js'],
            'utils/': ['helpers.js', 'constants.js', 'formatters.js'],
            'styles/': ['globals.css', 'variables.css', 'components.css'],
            'assets/': ['images/', 'icons/', 'fonts/']
          },
          'public/': ['index.html', 'favicon.ico', 'manifest.json', 'robots.txt'],
          'tests/': ['__mocks__/', 'components/', 'utils/', 'setup.js'],
          'package.json': null,
          '.gitignore': null,
          'README.md': null
        },
        recommendations: [
          'Keep components small and focused on single responsibilities',
          'Use feature-based organization for complex applications',
          'Separate business logic from UI components',
          'Create reusable utility functions and custom hooks'
        ]
      },
      'express-api': {
        name: 'Express.js API Structure',
        description: 'Scalable backend API architecture',
        structure: {
          'src/': {
            'controllers/': ['authController.js', 'userController.js', 'productController.js'],
            'models/': ['User.js', 'Product.js', 'Order.js', 'Category.js'],
            'routes/': ['auth.js', 'users.js', 'products.js', 'orders.js'],
            'middleware/': ['auth.js', 'validation.js', 'errorHandler.js', 'logger.js'],
            'services/': ['emailService.js', 'paymentService.js', 'fileService.js'],
            'utils/': ['database.js', 'helpers.js', 'validators.js'],
            'config/': ['database.js', 'server.js', 'environment.js']
          },
          'tests/': ['unit/', 'integration/', 'fixtures/', 'helpers/'],
          'docs/': ['api.md', 'setup.md', 'deployment.md'],
          'package.json': null,
          '.env.example': null,
          'server.js': null
        },
        recommendations: [
          'Follow MVC pattern for clear separation of concerns',
          'Use middleware for cross-cutting concerns like authentication',
          'Implement proper error handling and logging',
          'Keep database logic separate from business logic'
        ]
      }
    };

    setStructureData(structures[projectType] || null);
  };

  const renderFileTree = (structure, level = 0) => {
    return Object.entries(structure).map(([name, content]) => (
      <div key={name} className={`tree-item level-${level}`}>
        <div className="tree-node">
          <span className="tree-icon">
            {content === null ? '📄' : Array.isArray(content) ? '📁' : '📁'}
          </span>
          <span className="tree-name">{name}</span>
        </div>
        {content && typeof content === 'object' && !Array.isArray(content) && (
          <div className="tree-children">
            {renderFileTree(content, level + 1)}
          </div>
        )}
        {Array.isArray(content) && (
          <div className="tree-children">
            {content.map((file, index) => (
              <div key={index} className={`tree-item level-${level + 1}`}>
                <div className="tree-node">
                  <span className="tree-icon">📄</span>
                  <span className="tree-name">{file}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    ));
  };

  return (
    <div className="file-structure-page fade-in">
      <div className="structure-container">
        <header className="page-header">
          <h1 className="page-title glow">
            <span className="title-bracket">[</span>
            FILE STRUCTURE GUIDE
            <span className="title-bracket">]</span>
          </h1>
          {selectedProject && (
            <div className="project-info">
              <span className="project-badge">
                {selectedProject.icon} {selectedProject.title}
              </span>
            </div>
          )}
        </header>

        {!selectedProject ? (
          <div className="no-project-section retro-screen">
            <h2 className="section-title">No Project Selected</h2>
            <p className="section-description">
              Please select a project type to view recommended file structures.
            </p>
          </div>
        ) : !structureData ? (
          <div className="no-structure-section retro-screen">
            <h2 className="section-title">Structure Not Available</h2>
            <p className="section-description">
              File structure recommendations are not available for this project type yet.
            </p>
          </div>
        ) : (
          <div className="structure-content">
            <section className="structure-overview">
              <h2 className="section-title">{structureData.name}</h2>
              <p className="structure-description">{structureData.description}</p>
            </section>

            <section className="file-tree-section">
              <h3 className="subsection-title">RECOMMENDED STRUCTURE</h3>
              <div className="file-tree retro-screen">
                {renderFileTree(structureData.structure)}
              </div>
            </section>

            <section className="recommendations-section">
              <h3 className="subsection-title">BEST PRACTICES</h3>
              <div className="recommendations-list retro-screen">
                {structureData.recommendations.map((recommendation, index) => (
                  <div key={index} className="recommendation-item">
                    <span className="recommendation-bullet">▸</span>
                    <span className="recommendation-text">{recommendation}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileStructure;
