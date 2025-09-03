const express = require('express');
const router = express.Router();

// Template data organized by project type and use case
const promptTemplates = {
  'react-app': {
    projectSetup: {
      title: 'React Project Setup',
      description: 'Initial project structure and configuration',
      template: `I need to create a React application with the following requirements:

PROJECT SCOPE:
- [Describe your app's main purpose and target users]
- [List key features you want to implement]

TECHNICAL REQUIREMENTS:
- React version: [18+ recommended]
- State management: [useState/useReducer/Redux/Zustand]
- Routing: [React Router if multi-page]
- Styling: [CSS Modules/Styled Components/Tailwind]
- API integration: [REST/GraphQL/None]

STRUCTURE REQUEST:
Please create a well-organized folder structure with:
1. Component organization (containers vs presentational)
2. Custom hooks directory
3. Utility functions folder
4. Assets and styling organization
5. Configuration files setup

Also provide:
- Package.json with essential dependencies
- Basic routing setup if needed
- Initial component structure
- Development environment configuration`,
      category: 'setup',
      tags: ['react', 'setup', 'project-structure']
    },
    componentDevelopment: {
      title: 'React Component Development',
      description: 'Creating and optimizing React components',
      template: `I need to create a React component with the following specifications:

COMPONENT DETAILS:
- Component name: [ComponentName]
- Purpose: [What this component does]
- Type: [Functional/Class component preference]

PROPS AND STATE:
- Expected props: [List prop names, types, and purposes]
- Internal state needed: [What state variables are required]
- Default values: [Any default props or initial state]

FUNCTIONALITY:
- User interactions: [onClick, onChange, onSubmit, etc.]
- Side effects: [API calls, subscriptions, timers]
- Lifecycle needs: [componentDidMount equivalent, cleanup]

REQUIREMENTS:
- Accessibility: [ARIA labels, keyboard navigation]
- Performance: [Memoization needs, optimization requirements]
- Testing: [What scenarios should be testable]
- Styling: [CSS approach and responsive requirements]

Please include:
1. Complete component code with TypeScript if possible
2. Custom hooks if reusable logic exists
3. Error boundary considerations
4. Loading and error states
5. Unit test examples`,
      category: 'development',
      tags: ['react', 'components', 'development']
    },
    stateManagement: {
      title: 'React State Management',
      description: 'Managing application state effectively',
      template: `I need help implementing state management for my React application:

APPLICATION CONTEXT:
- App type: [e-commerce, dashboard, social media, etc.]
- Data complexity: [Simple forms / Complex nested data / Real-time updates]
- User interactions: [What triggers state changes]

STATE REQUIREMENTS:
- Global state needs: [User auth, app settings, shared data]
- Local state patterns: [Form data, UI state, temporary data]
- Data flow: [Parent-child communication patterns]

CHOSEN APPROACH:
- State solution: [Context API / Redux Toolkit / Zustand / Jotai]
- Why this choice: [Performance / Simplicity / Team familiarity]

SPECIFIC NEEDS:
- Async operations: [API calls, data fetching patterns]
- State persistence: [localStorage, sessionStorage requirements]
- State synchronization: [Real-time updates, optimistic updates]
- Performance optimization: [Preventing unnecessary re-renders]

Please provide:
1. Complete state management setup
2. Action creators and reducers (if using Redux)
3. Custom hooks for state access
4. Best practices for this specific use case
5. Common pitfalls to avoid`,
      category: 'state-management',
      tags: ['react', 'state', 'redux', 'context']
    }
  },
  'express-api': {
    projectSetup: {
      title: 'Express.js API Setup',
      description: 'Initial API project structure and configuration',
      template: `I need to create an Express.js API with the following requirements:

PROJECT SCOPE:
- API purpose: [REST API for web app / Mobile backend / Microservice]
- Expected scale: [Small project / Medium business / Enterprise]
- Authentication needs: [JWT / OAuth / Session-based / None]

TECHNICAL STACK:
- Database: [MongoDB / PostgreSQL / MySQL / SQLite]
- ORM/ODM: [Mongoose / Prisma / Sequelize / TypeORM]
- Additional services: [Redis / Email / File upload / Payment processing]

API FEATURES:
- Core endpoints: [List main resource endpoints needed]
- File handling: [Image upload / Document processing / Static files]
- Real-time features: [WebSockets / Server-sent events / None]

REQUIREMENTS:
- Environment setup: [Development / Staging / Production configurations]
- Security measures: [CORS / Rate limiting / Input validation / HTTPS]
- Documentation: [Swagger / Postman collection preferred]
- Testing approach: [Unit tests / Integration tests / Load testing]

Please provide:
1. Complete project structure with organized folders
2. Package.json with essential dependencies
3. Environment configuration setup
4. Basic middleware implementation
5. Database connection and model setup
6. Error handling and logging configuration`,
      category: 'setup',
      tags: ['express', 'api', 'setup', 'backend']
    },
    endpointDevelopment: {
      title: 'Express.js Endpoint Development',
      description: 'Creating robust API endpoints',
      template: `I need to create Express.js endpoints for the following resource:

RESOURCE DETAILS:
- Resource name: [User / Product / Order / etc.]
- Data model: [Describe the data structure and relationships]
- Business logic: [What operations are needed on this resource]

ENDPOINT REQUIREMENTS:
- HTTP methods needed: [GET / POST / PUT / PATCH / DELETE]
- URL structure: [RESTful paths preferred]
- Query parameters: [Filtering / Sorting / Pagination needs]
- Request/Response format: [JSON structure examples]

FUNCTIONALITY:
- Validation rules: [Required fields / Data types / Format constraints]
- Authentication: [Public / Protected endpoints / Role-based access]
- Database operations: [CRUD / Complex queries / Transactions]
- External integrations: [Third-party APIs / File processing]

QUALITY REQUIREMENTS:
- Error handling: [Specific error scenarios to handle]
- Performance: [Caching / Database optimization needs]
- Security: [Input sanitization / Rate limiting / Access control]
- Documentation: [API documentation preferences]

Please include:
1. Complete route definitions with middleware
2. Request validation schemas
3. Database query implementations
4. Error handling for all scenarios
5. Response formatting and status codes
6. Unit test examples for each endpoint`,
      category: 'development',
      tags: ['express', 'endpoints', 'rest', 'api']
    }
  }
};

// GET /api/templates - Get all templates
router.get('/', (req, res) => {
  try {
    const { projectType, category } = req.query;
    
    let templates = promptTemplates;
    
    // Filter by project type if specified
    if (projectType && templates[projectType]) {
      templates = { [projectType]: templates[projectType] };
    }
    
    // Filter by category if specified
    if (category) {
      const filteredTemplates = {};
      Object.keys(templates).forEach(projType => {
        filteredTemplates[projType] = {};
        Object.keys(templates[projType]).forEach(templateKey => {
          if (templates[projType][templateKey].category === category) {
            filteredTemplates[projType][templateKey] = templates[projType][templateKey];
          }
        });
      });
      templates = filteredTemplates;
    }
    
    res.json({
      success: true,
      data: templates,
      message: 'Templates retrieved successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve templates',
      message: error.message
    });
  }
});

// GET /api/templates/:projectType - Get templates for specific project type
router.get('/:projectType', (req, res) => {
  try {
    const { projectType } = req.params;
    const templates = promptTemplates[projectType];
    
    if (!templates) {
      return res.status(404).json({
        success: false,
        error: 'Project type not found',
        message: `No templates found for project type: ${projectType}`
      });
    }
    
    res.json({
      success: true,
      data: templates,
      message: `Templates for ${projectType} retrieved successfully`
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve templates',
      message: error.message
    });
  }
});

// GET /api/templates/:projectType/:templateId - Get specific template
router.get('/:projectType/:templateId', (req, res) => {
  try {
    const { projectType, templateId } = req.params;
    
    const projectTemplates = promptTemplates[projectType];
    if (!projectTemplates) {
      return res.status(404).json({
        success: false,
        error: 'Project type not found',
        message: `No templates found for project type: ${projectType}`
      });
    }
    
    const template = projectTemplates[templateId];
    if (!template) {
      return res.status(404).json({
        success: false,
        error: 'Template not found',
        message: `Template '${templateId}' not found for project type '${projectType}'`
      });
    }
    
    res.json({
      success: true,
      data: template,
      message: 'Template retrieved successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve template',
      message: error.message
    });
  }
});

// POST /api/templates/customize - Customize template based on user input
router.post('/customize', (req, res) => {
  try {
    const { projectType, templateId, customizations } = req.body;
    
    if (!projectType || !templateId) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields',
        message: 'Project type and template ID are required'
      });
    }
    
    const template = promptTemplates[projectType]?.[templateId];
    if (!template) {
      return res.status(404).json({
        success: false,
        error: 'Template not found',
        message: 'The specified template does not exist'
      });
    }
    
    // Create customized template
    let customizedTemplate = template.template;
    
    // Replace placeholders with user customizations
    if (customizations) {
      Object.keys(customizations).forEach(key => {
        const placeholder = `[${key}]`;
        const value = customizations[key] || `[Please specify ${key}]`;
        customizedTemplate = customizedTemplate.replace(new RegExp(placeholder.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), value);
      });
    }
    
    res.json({
      success: true,
      data: {
        ...template,
        customizedTemplate,
        originalTemplate: template.template,
        appliedCustomizations: customizations
      },
      message: 'Template customized successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to customize template',
      message: error.message
    });
  }
});

module.exports = router;
