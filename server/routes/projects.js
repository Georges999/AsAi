const express = require('express');
const router = express.Router();

// Sample project data - In a real app, this would come from a database
const projectTypes = [
  {
    id: 'react-app',
    title: 'React Web App',
    category: 'frontend',
    technologies: ['React', 'JavaScript', 'HTML', 'CSS'],
    difficulty: 'intermediate',
    estimatedHours: '40-160',
    description: 'Build modern single-page applications with React ecosystem',
    keyFeatures: [
      'Component-based architecture',
      'State management with hooks',
      'React Router for navigation',
      'API integration patterns'
    ],
    commonChallenges: [
      'State management complexity',
      'Component re-rendering optimization',
      'Handling async operations',
      'Managing component lifecycle'
    ]
  },
  {
    id: 'express-api',
    title: 'Express.js API',
    category: 'backend',
    technologies: ['Node.js', 'Express', 'JavaScript', 'REST'],
    difficulty: 'intermediate',
    estimatedHours: '20-80',
    description: 'Create robust RESTful APIs and backend services',
    keyFeatures: [
      'RESTful endpoint design',
      'Middleware implementation',
      'Database integration',
      'Authentication & authorization'
    ],
    commonChallenges: [
      'Error handling patterns',
      'Request validation',
      'Database query optimization',
      'Security implementation'
    ]
  },
  {
    id: 'mobile-app',
    title: 'Mobile Application',
    category: 'mobile',
    technologies: ['React Native', 'Flutter', 'JavaScript', 'Dart'],
    difficulty: 'advanced',
    estimatedHours: '80-320',
    description: 'Cross-platform mobile applications with native feel',
    keyFeatures: [
      'Native component usage',
      'Device API integration',
      'Platform-specific optimizations',
      'App store deployment'
    ],
    commonChallenges: [
      'Platform differences handling',
      'Performance optimization',
      'Device permission management',
      'App store approval process'
    ]
  }
];

// GET /api/projects - Get all project types
router.get('/', (req, res) => {
  try {
    res.json({
      success: true,
      data: projectTypes,
      message: 'Project types retrieved successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve project types',
      message: error.message
    });
  }
});

// GET /api/projects/:id - Get specific project type
router.get('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const project = projectTypes.find(p => p.id === id);
    
    if (!project) {
      return res.status(404).json({
        success: false,
        error: 'Project type not found',
        message: `No project type exists with ID: ${id}`
      });
    }
    
    res.json({
      success: true,
      data: project,
      message: 'Project type retrieved successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve project type',
      message: error.message
    });
  }
});

// GET /api/projects/category/:category - Get projects by category
router.get('/category/:category', (req, res) => {
  try {
    const { category } = req.params;
    const projects = projectTypes.filter(p => p.category === category);
    
    res.json({
      success: true,
      data: projects,
      message: `Projects in category '${category}' retrieved successfully`,
      count: projects.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve projects by category',
      message: error.message
    });
  }
});

// POST /api/projects/validate - Validate project selection
router.post('/validate', (req, res) => {
  try {
    const { projectId, userLevel } = req.body;
    
    if (!projectId) {
      return res.status(400).json({
        success: false,
        error: 'Project ID is required',
        message: 'Please provide a valid project ID'
      });
    }
    
    const project = projectTypes.find(p => p.id === projectId);
    
    if (!project) {
      return res.status(404).json({
        success: false,
        error: 'Invalid project type',
        message: 'The specified project type does not exist'
      });
    }
    
    // Simple validation logic
    const recommendations = [];
    
    if (userLevel === 'beginner' && project.difficulty === 'advanced') {
      recommendations.push('Consider starting with an intermediate project first');
      recommendations.push('Review prerequisite concepts before beginning');
    }
    
    if (userLevel === 'intermediate' && project.difficulty === 'beginner') {
      recommendations.push('This project might be too simple for your skill level');
      recommendations.push('Consider adding advanced features to increase challenge');
    }
    
    res.json({
      success: true,
      data: {
        project,
        isValid: true,
        recommendations,
        estimatedDifficulty: project.difficulty,
        suggestedPrerequisites: project.technologies
      },
      message: 'Project validation completed'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Validation failed',
      message: error.message
    });
  }
});

module.exports = router;
