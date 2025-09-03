const express = require('express');
const router = express.Router();

// Template data organized by project type and use case
const promptTemplates = {
  'react-app': {
    projectSetup: {
      title: 'React Project Setup & Architecture',
      description: 'Comprehensive project setup with clear structure and requirements',
      template: `I need your help setting up a React application. Let me provide you with complete context so you can give me the best guidance.

PROJECT CONTEXT:
- App purpose: [e.g., "E-commerce platform for small businesses"]
- Target users: [e.g., "Business owners who need to manage inventory and orders"]
- Key features needed: [e.g., "User authentication, product catalog, shopping cart, order management"]
- Timeline: [e.g., "3 months for MVP"]

TECHNICAL CONTEXT:
- Team size: [e.g., "2 developers, 1 designer"]
- Experience level: [e.g., "Intermediate with React, new to state management"]
- Performance requirements: [e.g., "Should handle 100+ products smoothly"]
- Device targets: [e.g., "Desktop primary, mobile responsive"]

SPECIFIC REQUIREMENTS:
- State management: [e.g., "Need something simpler than Redux but more powerful than useState"]
- Styling approach: [e.g., "Prefer CSS modules, need consistent theming"]
- Testing needs: [e.g., "Unit tests for business logic, component tests for UI"]
- API integration: [e.g., "REST API, need error handling and loading states"]

WHAT I NEED FROM YOU:
1. Recommend the best technology stack for my specific requirements
2. Create a complete folder structure that will scale with the project
3. Provide package.json with exact versions and explanations for each dependency
4. Include setup instructions for development environment
5. Suggest file naming conventions and code organization patterns
6. Identify potential challenges early and how to address them

CONSTRAINTS:
- [e.g., "Must use TypeScript", "No external UI libraries", "Budget for hosting is limited"]

Please ask me clarifying questions if you need more information to give me the best recommendations.`,
      category: 'setup',
      tags: ['react', 'setup', 'project-structure', 'architecture']
    },
    componentDevelopment: {
      title: 'React Component Development',
      description: 'Creating robust, reusable React components with best practices',
      template: `I need help building a React component. Let me give you complete context so you can provide the best solution.

COMPONENT CONTEXT:
- Component name: [e.g., "ProductCard"]
- Where it's used: [e.g., "Product catalog page, search results, user favorites"]
- Business purpose: [e.g., "Display product info and allow users to add to cart"]
- User interactions: [e.g., "Click to view details, hover for quick actions, add to cart button"]

TECHNICAL REQUIREMENTS:
- Data it receives: [e.g., "Product object with name, price, image, description, availability"]
- State it manages: [e.g., "Loading state for add-to-cart, expanded description toggle"]
- Events it emits: [e.g., "onAddToCart(productId), onViewDetails(productId)"]
- External dependencies: [e.g., "Uses shopping cart context, calls product API"]

DESIGN REQUIREMENTS:
- Visual behavior: [e.g., "Card layout with image, price prominently displayed, subtle hover effects"]
- Responsive needs: [e.g., "Stack vertically on mobile, 3-column grid on desktop"]
- Accessibility: [e.g., "Screen reader friendly, keyboard navigable, high contrast support"]
- Performance: [e.g., "Image lazy loading, memoize if used in large lists"]

EDGE CASES TO HANDLE:
- [e.g., "Missing product image", "Out of stock items", "Very long product names"]
- [e.g., "Slow network for add-to-cart", "User not logged in"]

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
- Using: [e.g., "React 18, TypeScript, CSS Modules, React Query for API calls"]
- Existing patterns: [e.g., "All components use custom hooks for business logic"]
- Code style: [e.g., "Functional components, explicit return types, ESLint with strict rules"]

Here's any existing related code for context:
[Paste any existing related components, hooks, or types that this component should integrate with]`,
      category: 'development',
      tags: ['react', 'components', 'development', 'typescript']
    },
    stateManagement: {
      title: 'React State Management Strategy',
      description: 'Implementing scalable state management with clear patterns',
      template: `I need help designing a state management solution for my React application. Let me provide comprehensive context so you can recommend the best approach.

APPLICATION CONTEXT:
- App type: [e.g., "Multi-tenant SaaS dashboard"]
- User base: [e.g., "100+ concurrent users per tenant"]
- Data complexity: [e.g., "Nested user permissions, real-time notifications, large datasets"]
- Current pain points: [e.g., "Props drilling 5 levels deep", "State scattered across components"]

DATA FLOW ANALYSIS:
- Global state needs: [e.g., "User authentication, theme preferences, notification queue"]
- Shared between components: [e.g., "Shopping cart, selected filters, form drafts"]
- Local to features: [e.g., "Modal states, form validation, temporary UI states"]
- API data caching: [e.g., "User profiles, product catalogs, search results"]

TECHNICAL CONSTRAINTS:
- Team experience: [e.g., "Comfortable with hooks, new to Redux"]
- Performance requirements: [e.g., "Page load under 2s, smooth scrolling with 1000+ items"]
- Bundle size concerns: [e.g., "Mobile-first, need to minimize JS payload"]
- Testing approach: [e.g., "Unit tests for business logic, integration tests for data flow"]

SPECIFIC CHALLENGES:
- Async operations: [e.g., "Optimistic updates for better UX, handling network failures"]
- Data synchronization: [e.g., "Real-time updates via WebSocket, conflict resolution"]
- State persistence: [e.g., "Save user preferences, recover form data on page refresh"]
- Cross-component communication: [e.g., "Toast notifications, modal management"]

CURRENT CODEBASE:
- Framework: [e.g., "React 18 with TypeScript"]
- Existing patterns: [e.g., "Custom hooks for API calls, context for theme"]
- Architecture: [e.g., "Feature-based folder structure, shared components library"]

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
      category: 'state-management',
      tags: ['react', 'state', 'redux', 'context', 'architecture']
    },
    apiIntegration: {
      title: 'React API Integration & Data Fetching',
      description: 'Robust patterns for API calls, caching, and error handling',
      template: `I need help implementing API integration in my React application. Here's the complete context so you can provide the most effective solution.

API CONTEXT:
- API type: [e.g., "REST API", "GraphQL", "Multiple REST endpoints"]
- Authentication: [e.g., "JWT tokens with refresh", "OAuth 2.0", "API keys"]
- Data patterns: [e.g., "CRUD operations", "Real-time updates", "File uploads"]
- Error handling needs: [e.g., "Network errors", "Authentication failures", "Rate limiting"]

USER EXPERIENCE REQUIREMENTS:
- Loading states: [e.g., "Skeleton screens for initial load", "Spinners for actions"]
- Error recovery: [e.g., "Retry mechanisms", "Offline support", "User-friendly error messages"]
- Performance: [e.g., "Cache API responses", "Optimistic updates", "Background refresh"]
- Accessibility: [e.g., "Screen reader announcements for state changes"]

TECHNICAL REQUIREMENTS:
- React version: [e.g., "React 18 with Suspense"]
- State management: [e.g., "Redux Toolkit Query", "React Query", "SWR", "Custom hooks"]
- TypeScript needs: [e.g., "Strong typing for API responses", "Generic hooks"]
- Testing approach: [e.g., "Mock API calls", "Integration tests", "Error scenario testing"]

SPECIFIC CHALLENGES:
- Data synchronization: [e.g., "Multiple components using same data", "Real-time updates"]
- Complex flows: [e.g., "Multi-step forms with API validation", "Dependent API calls"]
- Error scenarios: [e.g., "Partial failures", "Network timeouts", "Invalid responses"]
- Performance optimization: [e.g., "Debounced search", "Pagination", "Infinite scroll"]

CURRENT SETUP:
- Existing API client: [e.g., "Axios with interceptors", "Fetch with custom wrapper"]
- Error handling patterns: [e.g., "Toast notifications", "Form validation", "Global error boundary"]
- State management: [e.g., "Context for user data", "Local state for forms"]

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
- Optimistic updates pattern`,
      category: 'data-fetching',
      tags: ['react', 'api', 'data-fetching', 'performance']
    },
    performanceOptimization: {
      title: 'React Performance Optimization',
      description: 'Identifying and fixing performance bottlenecks systematically',
      template: `I'm experiencing performance issues in my React application and need systematic help to identify and fix them.

CURRENT PERFORMANCE PROBLEMS:
- Specific issues: [e.g., "Slow scrolling with large lists", "Lag when typing in forms", "Memory leaks"]
- Measurements: [e.g., "Initial load takes 8 seconds", "FCP over 3 seconds", "Memory usage grows continuously"]
- User impact: [e.g., "Users complaining about slow responses", "High bounce rate on mobile"]
- When it happens: [e.g., "After 5 minutes of usage", "With more than 100 list items", "On slower devices"]

APPLICATION CONTEXT:
- App type: [e.g., "Dashboard with real-time data", "E-commerce with product filters"]
- Data volume: [e.g., "1000+ items in lists", "Real-time updates every 5 seconds", "Large images"]
- User patterns: [e.g., "Users keep app open for hours", "Frequent navigation", "Multiple tabs"]
- Device targets: [e.g., "Primarily mobile", "Desktop-first", "Wide range of devices"]

CURRENT IMPLEMENTATION:
- React version: [e.g., "React 18 with concurrent features"]
- State management: [e.g., "Redux with large normalized state", "Multiple contexts"]
- Component patterns: [e.g., "Mostly functional components", "Heavy use of useEffect"]
- Bundle size: [e.g., "2MB initial bundle", "Code splitting implemented", "Tree shaking enabled"]

SPECIFIC AREAS OF CONCERN:
- Re-rendering issues: [e.g., "Components re-render unnecessarily", "Expensive calculations on every render"]
- Memory usage: [e.g., "Event listeners not cleaned up", "Large objects in state"]
- Network performance: [e.g., "Multiple API calls", "Large payload sizes", "No caching"]
- Bundle optimization: [e.g., "Large dependencies", "Unused code", "Inefficient imports"]

TOOLS AND CONSTRAINTS:
- Available tools: [e.g., "React DevTools Profiler", "Chrome DevTools", "Lighthouse"]
- Browser support: [e.g., "Chrome/Firefox/Safari", "IE11 support needed"]
- Development constraints: [e.g., "Can't change API structure", "Must maintain backward compatibility"]

WHAT I NEED FROM YOU:
1. Systematic approach to identify performance bottlenecks
2. Specific techniques for my types of issues
3. Code examples showing before/after optimizations
4. Performance monitoring setup
5. Bundle optimization strategies
6. Memory leak detection and prevention
7. Testing approach for performance regressions
8. Metrics to track and improvement targets

Please prioritize solutions based on impact and implementation difficulty. Include measurement strategies so I can validate improvements.`,
      category: 'performance',
      tags: ['react', 'performance', 'optimization', 'profiling']
    }
  },
  'express-api': {
    projectSetup: {
      title: 'Express.js API Project Setup',
      description: 'Comprehensive backend API setup with scalable architecture',
      template: `I need help setting up a robust Express.js API. Let me provide complete context so you can recommend the best architecture and practices.

PROJECT CONTEXT:
- API purpose: [e.g., "E-commerce backend serving web and mobile apps"]
- Expected users: [e.g., "5000+ registered users, 500 concurrent at peak"]
- Business requirements: [e.g., "Handle orders, inventory, user management, payment processing"]
- Timeline: [e.g., "MVP in 2 months, production ready in 4 months"]

TECHNICAL REQUIREMENTS:
- Database needs: [e.g., "PostgreSQL for transactions, Redis for caching, S3 for file storage"]
- Authentication: [e.g., "JWT with refresh tokens, role-based permissions, OAuth integration"]
- External integrations: [e.g., "Stripe payments, SendGrid emails, AWS services"]
- Performance targets: [e.g., "Response times under 200ms, 99.9% uptime"]

TEAM CONTEXT:
- Team size: [e.g., "3 backend developers, 2 frontend developers"]
- Experience level: [e.g., "Intermediate with Node.js, familiar with REST APIs"]
- DevOps setup: [e.g., "Docker, AWS deployment, CI/CD with GitHub Actions"]
- Testing approach: [e.g., "Unit tests required, integration tests preferred"]

SPECIFIC CHALLENGES:
- Security requirements: [e.g., "PCI compliance for payments", "GDPR compliance for user data"]
- Scalability needs: [e.g., "Need to handle 10x traffic growth", "Microservices architecture"]
- Data complexity: [e.g., "Complex business rules", "Real-time inventory updates"]
- Integration constraints: [e.g., "Legacy system integration", "Third-party API rate limits"]

DEVELOPMENT CONSTRAINTS:
- Technology preferences: [e.g., "TypeScript required", "Prefer PostgreSQL over NoSQL"]
- Infrastructure limitations: [e.g., "AWS only", "Specific compliance requirements"]
- Budget considerations: [e.g., "Minimize third-party service costs", "Open source preferred"]

WHAT I NEED FROM YOU:
1. Recommend optimal project architecture for my requirements
2. Complete folder structure that supports team collaboration
3. Package.json with exact dependencies and explanations
4. Database schema design and migration strategy
5. Middleware setup for security, logging, and error handling
6. Authentication and authorization implementation
7. Testing strategy and setup
8. Deployment and environment configuration
9. Performance monitoring and logging setup
10. Best practices for code organization and team collaboration

Please explain your architectural decisions and provide alternative approaches if there are trade-offs to consider.`,
      category: 'setup',
      tags: ['express', 'api', 'setup', 'backend', 'architecture']
    },
    endpointDevelopment: {
      title: 'Express.js API Endpoint Development',
      description: 'Creating production-ready API endpoints with comprehensive error handling',
      template: `I need help implementing Express.js endpoints for a specific resource. Here's the complete context to ensure you provide the most robust solution.

RESOURCE CONTEXT:
- Resource name: [e.g., "Product"]
- Business purpose: [e.g., "Manage product catalog for e-commerce platform"]
- Data relationships: [e.g., "Belongs to Category, has many Reviews, associated with Inventory"]
- User roles: [e.g., "Admin can CRUD, Customers can read, Vendors can update their products"]

DATA MODEL:
- Core fields: [e.g., "id, name, description, price, categoryId, vendorId, status, createdAt"]
- Validation rules: [e.g., "Name required max 100 chars, price positive number, status enum"]
- Business constraints: [e.g., "Cannot delete product with active orders", "Price changes need approval"]
- Relationships: [e.g., "Foreign keys to users and categories", "Many-to-many with tags"]

ENDPOINT REQUIREMENTS:
- Operations needed: [e.g., "CRUD + search + bulk operations + status changes"]
- URL structure: [e.g., "RESTful: /api/products, /api/products/:id, /api/products/search"]
- Query capabilities: [e.g., "Filter by category, sort by price/date, pagination, search by name"]
- Request/Response format: [Provide examples of expected JSON structures]

TECHNICAL CONTEXT:
- Database: [e.g., "PostgreSQL with Prisma ORM"]
- Authentication: [e.g., "JWT middleware, role-based access control"]
- Validation: [e.g., "Joi schemas for request validation"]
- File handling: [e.g., "Image uploads for product photos via multer"]

BUSINESS LOGIC:
- Complex operations: [e.g., "Price changes trigger notification to subscribers"]
- Workflow requirements: [e.g., "New products need approval before going live"]
- Integration needs: [e.g., "Update inventory system on product changes"]
- Audit requirements: [e.g., "Log all product modifications for compliance"]

QUALITY REQUIREMENTS:
- Performance targets: [e.g., "List endpoints under 100ms, search under 200ms"]
- Error handling: [e.g., "User-friendly errors, proper HTTP status codes, error logging"]
- Security: [e.g., "SQL injection prevention, rate limiting, input sanitization"]
- Testing: [e.g., "Unit tests for business logic, integration tests for endpoints"]

CURRENT SETUP:
- Existing middleware: [e.g., "Authentication, logging, CORS already configured"]
- Database setup: [e.g., "Connection pool configured, migration system in place"]
- Error handling pattern: [e.g., "Global error handler with structured error responses"]

WHAT I NEED FROM YOU:
1. Complete endpoint implementations with proper middleware stack
2. Request validation schemas with comprehensive error messages
3. Database operations with error handling and transactions where needed
4. Response formatting with consistent structure
5. Authentication and authorization logic
6. Comprehensive error handling for all failure scenarios
7. Performance optimizations (caching, query optimization)
8. Unit and integration test examples
9. API documentation examples
10. Best practices for maintainable code

Include specific examples of:
- Input validation with detailed error responses
- Database operations with transaction handling
- Proper HTTP status codes for different scenarios
- Security middleware implementation
- Performance monitoring and logging`,
      category: 'development',
      tags: ['express', 'endpoints', 'rest', 'api', 'validation']
    },
    databaseIntegration: {
      title: 'Express.js Database Integration',
      description: 'Robust database operations with proper error handling and performance',
      template: `I need help implementing database integration for my Express.js API. Let me provide comprehensive context for the best solution.

DATABASE CONTEXT:
- Database type: [e.g., "PostgreSQL for ACID transactions", "MongoDB for flexible schemas"]
- Data size: [e.g., "Expected 1M+ records per table", "Complex relationships"]
- Performance requirements: [e.g., "Sub-100ms queries", "Handle 1000+ concurrent connections"]
- Consistency needs: [e.g., "Strong consistency for financial data", "Eventual consistency acceptable"]

TECHNICAL SETUP:
- ORM/ODM choice: [e.g., "Prisma for type safety", "Mongoose for MongoDB", "Raw SQL for performance"]
- Connection management: [e.g., "Connection pooling requirements", "Read/write replicas"]
- Migration strategy: [e.g., "Database versioning", "Zero-downtime deployments"]
- Environment management: [e.g., "Development, staging, production configurations"]

DATA OPERATIONS:
- Query patterns: [e.g., "Complex joins", "Full-text search", "Aggregation pipelines"]
- Transaction requirements: [e.g., "Multi-table operations", "Distributed transactions"]
- Caching strategy: [e.g., "Redis for frequently accessed data", "Application-level caching"]
- Real-time needs: [e.g., "Change streams", "Event-driven updates"]

BUSINESS REQUIREMENTS:
- Data integrity: [e.g., "Foreign key constraints", "Business rule validation"]
- Audit trail: [e.g., "Track all data changes", "User action logging"]
- Backup strategy: [e.g., "Point-in-time recovery", "Cross-region backups"]
- Compliance: [e.g., "GDPR data deletion", "PCI DSS requirements"]

PERFORMANCE CHALLENGES:
- Query optimization: [e.g., "Slow queries on large datasets", "N+1 query problems"]
- Indexing strategy: [e.g., "Composite indexes", "Full-text search indexes"]
- Data growth handling: [e.g., "Partitioning strategy", "Archival policies"]
- Monitoring needs: [e.g., "Query performance tracking", "Connection pool monitoring"]

CURRENT PAIN POINTS:
- Specific issues: [e.g., "Slow dashboard queries", "Timeout errors under load"]
- Error scenarios: [e.g., "Connection failures", "Deadlock handling"]
- Maintenance challenges: [e.g., "Schema changes", "Data migration complexity"]

WHAT I NEED FROM YOU:
1. Database connection setup with proper error handling
2. ORM/ODM configuration with best practices
3. Migration system setup and versioning strategy
4. Query optimization techniques for my specific use cases
5. Transaction handling patterns for complex operations
6. Caching implementation for improved performance
7. Error handling for database failures
8. Monitoring and logging setup
9. Testing strategy for database operations
10. Security best practices for database access

Include examples of:
- Connection pooling configuration
- Complex query optimization
- Transaction handling with rollback scenarios
- Caching patterns for different data types
- Database testing with fixtures and mocks`,
      category: 'database',
      tags: ['express', 'database', 'orm', 'performance', 'transactions']
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
