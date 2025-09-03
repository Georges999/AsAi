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
            id: 'projectSetup',
            title: 'Project Setup & Architecture',
            description: 'Comprehensive project setup with clear structure and requirements',
            category: 'setup',
            difficulty: 'beginner'
          },
          {
            id: 'componentDevelopment',
            title: 'Component Development',
            description: 'Creating robust, reusable React components with best practices',
            category: 'development',
            difficulty: 'intermediate'
          },
          {
            id: 'stateManagement',
            title: 'State Management Strategy',
            description: 'Implementing scalable state management with clear patterns',
            category: 'architecture',
            difficulty: 'advanced'
          },
          {
            id: 'apiIntegration',
            title: 'API Integration & Data Fetching',
            description: 'Robust patterns for API calls, caching, and error handling',
            category: 'data-fetching',
            difficulty: 'intermediate'
          },
          {
            id: 'performanceOptimization',
            title: 'Performance Optimization',
            description: 'Identifying and fixing performance bottlenecks systematically',
            category: 'performance',
            difficulty: 'advanced'
          }
        ],
        'express-api': [
          {
            id: 'projectSetup',
            title: 'Express.js API Project Setup',
            description: 'Comprehensive backend API setup with scalable architecture',
            category: 'setup',
            difficulty: 'beginner'
          },
          {
            id: 'endpointDevelopment',
            title: 'API Endpoint Development',
            description: 'Creating production-ready API endpoints with comprehensive error handling',
            category: 'development',
            difficulty: 'intermediate'
          },
          {
            id: 'databaseIntegration',
            title: 'Database Integration',
            description: 'Robust database operations with proper error handling and performance',
            category: 'database',
            difficulty: 'intermediate'
          }
        ],
        'mobile-app': [
          {
            id: 'projectSetup',
            title: 'Mobile App Setup',
            description: 'Cross-platform mobile development setup and architecture',
            category: 'setup',
            difficulty: 'intermediate'
          },
          {
            id: 'uiDevelopment',
            title: 'Mobile UI Development',
            description: 'Creating responsive, native-feeling user interfaces',
            category: 'development',
            difficulty: 'intermediate'
          },
          {
            id: 'deviceIntegration',
            title: 'Device API Integration',
            description: 'Accessing device features and native functionality',
            category: 'native',
            difficulty: 'advanced'
          }
        ],
        'game-dev': [
          {
            id: 'gameArchitecture',
            title: 'Game Architecture Setup',
            description: 'Core game structure and development environment',
            category: 'setup',
            difficulty: 'intermediate'
          },
          {
            id: 'gameplayMechanics',
            title: 'Gameplay Mechanics',
            description: 'Implementing core game mechanics and systems',
            category: 'development',
            difficulty: 'advanced'
          },
          {
            id: 'performanceOptimization',
            title: 'Game Performance',
            description: 'Optimizing game performance and resource management',
            category: 'performance',
            difficulty: 'advanced'
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
      'componentDevelopment': `I need help building a React component. Let me give you complete context so you can provide the best solution.

COMPONENT CONTEXT:
- Component name: [componentName]
- Where it's used: [componentUsage]
- Business purpose: [businessPurpose]
- User interactions: [userInteractions]

TECHNICAL REQUIREMENTS:
- Data it receives: [dataStructure]
- State it manages: [stateRequirements]
- Events it emits: [eventHandlers]
- External dependencies: [dependencies]

DESIGN REQUIREMENTS:
- Visual behavior: [visualBehavior]
- Responsive needs: [responsiveNeeds]
- Accessibility: [accessibilityNeeds]
- Performance: [performanceNeeds]

EDGE CASES TO HANDLE:
- [edgeCase1]
- [edgeCase2]

WHAT I NEED FROM YOU:
1. Complete component code with TypeScript interfaces
2. Proper error handling for all edge cases
3. Loading and success states for async operations
4. Accessibility attributes and keyboard support
5. Performance optimizations (memo, useMemo, useCallback as needed)
6. CSS/styling approach that matches my requirements
7. Example usage of the component
8. Unit test examples covering main scenarios

CURRENT CODEBASE CONTEXT:
- Using: [techStack]
- Existing patterns: [patterns]
- Code style: [codeStyle]

Here's any existing related code for context:
[pasteExistingCode]`,

      'stateManagement': `I need help designing a state management solution for my React application. Let me provide comprehensive context so you can recommend the best approach.

APPLICATION CONTEXT:
- App type: [appType]
- User base: [userBase]
- Data complexity: [dataComplexity]
- Current pain points: [painPoints]

DATA FLOW ANALYSIS:
- Global state needs: [globalState]
- Shared between components: [sharedState]
- Local to features: [localState]
- API data caching: [apiCaching]

TECHNICAL CONSTRAINTS:
- Team experience: [teamExperience]
- Performance requirements: [performanceReqs]
- Bundle size concerns: [bundleSize]
- Testing approach: [testingApproach]

SPECIFIC CHALLENGES:
- Async operations: [asyncChallenges]
- Data synchronization: [syncChallenges]
- State persistence: [persistenceNeeds]
- Cross-component communication: [communicationNeeds]

CURRENT CODEBASE:
- Framework: [framework]
- Existing patterns: [existingPatterns]
- Architecture: [architecture]

WHAT I NEED FROM YOU:
1. Recommend the best state management approach for my specific needs
2. Complete implementation with TypeScript types
3. Folder structure and file organization for state logic
4. Custom hooks for accessing and updating state
5. Patterns for handling async operations and caching
6. Performance optimization strategies
7. Testing patterns for state logic
8. Migration strategy if coming from existing state management
9. Common pitfalls to avoid with the recommended approach

Please explain your reasoning for the recommended approach and provide alternative solutions if there are trade-offs to consider.`,

      'apiIntegration': `I need help implementing API integration in my React application. Here's the complete context so you can provide the most effective solution.

API CONTEXT:
- API type: [apiType]
- Authentication: [authMethod]
- Data patterns: [dataPatterns]
- Error handling needs: [errorHandling]

USER EXPERIENCE REQUIREMENTS:
- Loading states: [loadingStates]
- Error recovery: [errorRecovery]
- Performance: [performanceReqs]
- Accessibility: [accessibilityReqs]

TECHNICAL REQUIREMENTS:
- React version: [reactVersion]
- State management: [stateManagement]
- TypeScript needs: [typescriptNeeds]
- Testing approach: [testingApproach]

SPECIFIC CHALLENGES:
- Data synchronization: [syncChallenges]
- Complex flows: [complexFlows]
- Error scenarios: [errorScenarios]
- Performance optimization: [perfOptimization]

CURRENT SETUP:
- Existing API client: [apiClient]
- Error handling patterns: [errorPatterns]
- State management: [currentState]

WHAT I NEED FROM YOU:
1. Recommend the best data fetching approach for my needs
2. Complete implementation with TypeScript interfaces
3. Custom hooks for common API patterns (CRUD, search, pagination)
4. Error handling strategy with user-friendly recovery options
5. Loading and success state management
6. Caching strategy for better performance
7. Testing patterns for API integration
8. Best practices for handling edge cases

Include examples of:
- A complete data fetching hook
- Error boundary for API failures
- Loading states in components
- Optimistic updates pattern`
    };

    return templates[templateId] || `I need help with ${templateId} for my project. Let me provide you with comprehensive context to get the best solution.

PROJECT CONTEXT:
- Project type: [projectType]
- Specific challenge: [specificChallenge]
- Current setup: [currentSetup]
- Goals: [goals]

TECHNICAL REQUIREMENTS:
- Technologies: [technologies]
- Constraints: [constraints]
- Performance requirements: [performance]

WHAT I NEED:
- [requirement1]
- [requirement2]
- [requirement3]

Please provide a complete solution with explanations and best practices.`;
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
    'componentDevelopment': [
      { name: 'componentName', label: 'Component Name', placeholder: 'e.g., ProductCard, UserProfile, SearchBar' },
      { name: 'componentUsage', label: 'Where It\'s Used', placeholder: 'e.g., Product catalog page, search results, user dashboard' },
      { name: 'businessPurpose', label: 'Business Purpose', placeholder: 'e.g., Display product info and allow users to add to cart' },
      { name: 'userInteractions', label: 'User Interactions', placeholder: 'e.g., Click to view details, hover effects, add to cart button' },
      { name: 'dataStructure', label: 'Data It Receives', placeholder: 'e.g., Product object with name, price, image, description' },
      { name: 'stateRequirements', label: 'State It Manages', placeholder: 'e.g., Loading state for add-to-cart, expanded description toggle' }
    ],
    'stateManagement': [
      { name: 'appType', label: 'Application Type', placeholder: 'e.g., Multi-tenant SaaS dashboard, E-commerce platform' },
      { name: 'userBase', label: 'User Base', placeholder: 'e.g., 1000+ concurrent users, Small team collaboration' },
      { name: 'dataComplexity', label: 'Data Complexity', placeholder: 'e.g., Nested user permissions, real-time notifications' },
      { name: 'painPoints', label: 'Current Pain Points', placeholder: 'e.g., Props drilling 5 levels deep, State scattered across components' },
      { name: 'globalState', label: 'Global State Needs', placeholder: 'e.g., User authentication, theme preferences, notification queue' },
      { name: 'teamExperience', label: 'Team Experience', placeholder: 'e.g., Comfortable with hooks, new to Redux' }
    ],
    'apiIntegration': [
      { name: 'apiType', label: 'API Type', placeholder: 'e.g., REST API, GraphQL, Multiple REST endpoints' },
      { name: 'authMethod', label: 'Authentication', placeholder: 'e.g., JWT tokens with refresh, OAuth 2.0, API keys' },
      { name: 'dataPatterns', label: 'Data Patterns', placeholder: 'e.g., CRUD operations, Real-time updates, File uploads' },
      { name: 'errorHandling', label: 'Error Handling Needs', placeholder: 'e.g., Network errors, Authentication failures, Rate limiting' },
      { name: 'loadingStates', label: 'Loading States', placeholder: 'e.g., Skeleton screens for initial load, Spinners for actions' },
      { name: 'performanceReqs', label: 'Performance Requirements', placeholder: 'e.g., Cache API responses, Optimistic updates, Background refresh' }
    ],
    'projectSetup': [
      { name: 'projectPurpose', label: 'Project Purpose', placeholder: 'e.g., E-commerce platform for small businesses' },
      { name: 'targetUsers', label: 'Target Users', placeholder: 'e.g., Business owners who need to manage inventory' },
      { name: 'keyFeatures', label: 'Key Features', placeholder: 'e.g., User authentication, product catalog, shopping cart' },
      { name: 'timeline', label: 'Timeline', placeholder: 'e.g., 3 months for MVP, 6 months for full version' },
      { name: 'teamSize', label: 'Team Size', placeholder: 'e.g., 2 developers, 1 designer' },
      { name: 'experienceLevel', label: 'Experience Level', placeholder: 'e.g., Intermediate with React, new to state management' }
    ],
    'performanceOptimization': [
      { name: 'specificIssues', label: 'Specific Issues', placeholder: 'e.g., Slow scrolling with large lists, Lag when typing in forms' },
      { name: 'measurements', label: 'Performance Measurements', placeholder: 'e.g., Initial load takes 8 seconds, FCP over 3 seconds' },
      { name: 'userImpact', label: 'User Impact', placeholder: 'e.g., Users complaining about slow responses, High bounce rate' },
      { name: 'appType', label: 'Application Type', placeholder: 'e.g., Dashboard with real-time data, E-commerce with filters' },
      { name: 'dataVolume', label: 'Data Volume', placeholder: 'e.g., 1000+ items in lists, Real-time updates every 5 seconds' }
    ]
  };

  return fieldSets[templateId] || [
    { name: 'projectType', label: 'Project Type', placeholder: 'e.g., Web app, Mobile app, API' },
    { name: 'specificChallenge', label: 'Specific Challenge', placeholder: 'e.g., What you\'re trying to accomplish' },
    { name: 'currentSetup', label: 'Current Setup', placeholder: 'e.g., Technologies you\'re already using' },
    { name: 'goals', label: 'Goals', placeholder: 'e.g., What you want to achieve' }
  ];
};

export default TemplateGenerator;
