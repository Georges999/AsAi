import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './TemplateGenerator.css';

const TemplateGenerator = () => {
  const navigate = useNavigate();
  const [selectedProject, setSelectedProject] = useState(null);
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [customizations, setCustomizations] = useState({});
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Load selected project from localStorage
    const savedProject = localStorage.getItem('selectedProject');
    if (savedProject) {
      setSelectedProject(JSON.parse(savedProject));
    }
  }, []);

  useEffect(() => {
    // Load templates when project is selected
    if (selectedProject) {
      loadTemplates(selectedProject.id);
    }
  }, [selectedProject]);

  const loadTemplates = async (projectType) => {
    setLoading(true);
    try {
      // In a real app, this would be an API call
      const mockTemplates = {
        'react-app': [
          {
            id: 'component-development',
            title: 'React Component Development',
            description: 'Create and optimize React components',
            category: 'development',
            difficulty: 'intermediate'
          },
          {
            id: 'state-management',
            title: 'State Management Setup',
            description: 'Implement state management solutions',
            category: 'architecture',
            difficulty: 'advanced'
          },
          {
            id: 'project-setup',
            title: 'Project Setup & Configuration',
            description: 'Initial project structure and setup',
            category: 'setup',
            difficulty: 'beginner'
          }
        ],
        'express-api': [
          {
            id: 'api-endpoints',
            title: 'API Endpoint Development',
            description: 'Create robust REST API endpoints',
            category: 'development',
            difficulty: 'intermediate'
          },
          {
            id: 'database-integration',
            title: 'Database Integration',
            description: 'Connect and configure database',
            category: 'setup',
            difficulty: 'intermediate'
          }
        ]
      };
      
      setTemplates(mockTemplates[projectType] || []);
    } catch (error) {
      console.error('Failed to load templates:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
    setCustomizations({});
    setGeneratedPrompt('');
  };

  const handleCustomizationChange = (field, value) => {
    setCustomizations(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const generatePrompt = () => {
    if (!selectedTemplate) return;

    const baseTemplate = getTemplateContent(selectedTemplate.id);
    let customizedPrompt = baseTemplate;

    // Replace placeholders with customizations
    Object.keys(customizations).forEach(key => {
      const placeholder = `[${key}]`;
      const value = customizations[key] || `[Please specify ${key}]`;
      customizedPrompt = customizedPrompt.replace(new RegExp(placeholder.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), value);
    });

    setGeneratedPrompt(customizedPrompt);
  };

  const getTemplateContent = (templateId) => {
    // Mock template content - in real app, this would come from API
    const templates = {
      'component-development': `I need to create a React component with the following specifications:

COMPONENT DETAILS:
- Component name: [componentName]
- Purpose: [componentPurpose]
- Type: [componentType]

FUNCTIONALITY:
- Props needed: [props]
- State requirements: [state]
- User interactions: [interactions]

REQUIREMENTS:
- Styling approach: [styling]
- Accessibility: [accessibility]
- Performance considerations: [performance]

Please provide:
1. Complete component code with best practices
2. Proper TypeScript types if applicable
3. Error handling and loading states
4. Unit test examples`,

      'state-management': `I need to implement state management for my React application:

APPLICATION CONTEXT:
- App type: [appType]
- Data complexity: [dataComplexity]
- User interactions: [userInteractions]

STATE REQUIREMENTS:
- Global state needs: [globalState]
- Local state patterns: [localState]
- Data flow requirements: [dataFlow]

CHOSEN APPROACH:
- State solution: [stateSolution]
- Why this choice: [reasonForChoice]

Please provide:
1. Complete state management setup
2. Action creators and reducers if needed
3. Custom hooks for state access
4. Best practices implementation
5. Performance optimization strategies`
    };

    return templates[templateId] || 'Template content not found.';
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedPrompt);
      alert('Prompt copied to clipboard!');
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
    }
  };

  if (!selectedProject) {
    return (
      <div className="template-generator-page fade-in">
        <div className="generator-container">
          <div className="no-project-section retro-screen">
            <h2 className="section-title">No Project Selected</h2>
            <p className="section-description">
              Please select a project type first to generate relevant templates.
            </p>
            <button 
              className="btn btn-primary"
              onClick={() => navigate('/project-selector')}
            >
              SELECT PROJECT TYPE
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="template-generator-page fade-in">
      <div className="generator-container">
        <header className="page-header">
          <h1 className="page-title glow">
            <span className="title-bracket">[</span>
            PROMPT TEMPLATE GENERATOR
            <span className="title-bracket">]</span>
          </h1>
          <div className="project-info">
            <span className="project-badge">
              {selectedProject.icon} {selectedProject.title}
            </span>
          </div>
        </header>

        <div className="generator-content">
          {/* Template Selection */}
          <section className="template-selection">
            <h2 className="section-title">SELECT TEMPLATE TYPE</h2>
            {loading ? (
              <div className="loading-message">Loading templates...</div>
            ) : (
              <div className="templates-grid">
                {templates.map((template) => (
                  <div
                    key={template.id}
                    className={`template-card retro-screen ${selectedTemplate?.id === template.id ? 'selected' : ''}`}
                    onClick={() => handleTemplateSelect(template)}
                  >
                    <h3 className="template-title">{template.title}</h3>
                    <p className="template-description">{template.description}</p>
                    <div className="template-meta">
                      <span className="template-category">{template.category}</span>
                      <span className="template-difficulty">{template.difficulty}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Customization Form */}
          {selectedTemplate && (
            <section className="customization-section">
              <h2 className="section-title">CUSTOMIZE YOUR PROMPT</h2>
              <div className="customization-form retro-screen">
                <div className="form-grid">
                  {getCustomizationFields(selectedTemplate.id).map((field) => (
                    <div key={field.name} className="form-group">
                      <label className="form-label">{field.label}</label>
                      <input
                        type="text"
                        className="form-input"
                        placeholder={field.placeholder}
                        value={customizations[field.name] || ''}
                        onChange={(e) => handleCustomizationChange(field.name, e.target.value)}
                      />
                    </div>
                  ))}
                </div>
                <button className="btn btn-primary generate-btn" onClick={generatePrompt}>
                  GENERATE PROMPT
                </button>
              </div>
            </section>
          )}

          {/* Generated Prompt */}
          {generatedPrompt && (
            <section className="prompt-output">
              <h2 className="section-title">GENERATED PROMPT</h2>
              <div className="prompt-container retro-screen">
                <pre className="prompt-text">{generatedPrompt}</pre>
                <div className="prompt-actions">
                  <button className="btn btn-secondary" onClick={copyToClipboard}>
                    COPY TO CLIPBOARD
                  </button>
                  <button className="btn btn-primary" onClick={() => navigate('/workflow')}>
                    CONTINUE TO WORKFLOW →
                  </button>
                </div>
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

// Helper function to get customization fields based on template
const getCustomizationFields = (templateId) => {
  const fieldSets = {
    'component-development': [
      { name: 'componentName', label: 'Component Name', placeholder: 'e.g., UserProfile' },
      { name: 'componentPurpose', label: 'Component Purpose', placeholder: 'e.g., Display user information and avatar' },
      { name: 'componentType', label: 'Component Type', placeholder: 'e.g., Functional component with hooks' },
      { name: 'props', label: 'Props Needed', placeholder: 'e.g., user object, onEdit callback' },
      { name: 'state', label: 'State Requirements', placeholder: 'e.g., loading state, edit mode toggle' },
      { name: 'interactions', label: 'User Interactions', placeholder: 'e.g., click to edit, hover effects' }
    ],
    'state-management': [
      { name: 'appType', label: 'Application Type', placeholder: 'e.g., e-commerce, dashboard, social media' },
      { name: 'dataComplexity', label: 'Data Complexity', placeholder: 'e.g., simple forms, nested objects, real-time data' },
      { name: 'stateSolution', label: 'State Solution', placeholder: 'e.g., Context API, Redux Toolkit, Zustand' },
      { name: 'globalState', label: 'Global State Needs', placeholder: 'e.g., user auth, shopping cart, app settings' }
    ]
  };

  return fieldSets[templateId] || [];
};

export default TemplateGenerator;
