const express = require('express');
const router = express.Router();

// File structure templates for different project types
const fileStructures = {
  'react-app': {
    name: 'React Application Structure',
    structure: {
      'src/': {
        'components/': {
          'common/': ['Button.js', 'Input.js', 'Modal.js'],
          'layout/': ['Header.js', 'Footer.js', 'Sidebar.js'],
          'features/': ['UserProfile/', 'Dashboard/', 'Settings/']
        },
        'hooks/': ['useAuth.js', 'useLocalStorage.js', 'useApi.js'],
        'pages/': ['Home.js', 'About.js', 'Contact.js'],
        'services/': ['api.js', 'auth.js', 'storage.js'],
        'utils/': ['helpers.js', 'constants.js', 'validators.js'],
        'styles/': ['globals.css', 'variables.css', 'components.css'],
        'assets/': ['images/', 'icons/', 'fonts/']
      },
      'public/': ['index.html', 'favicon.ico', 'manifest.json'],
      'package.json': null,
      '.gitignore': null,
      'README.md': null
    },
    recommendations: [
      'Keep components small and focused on single responsibilities',
      'Use custom hooks for reusable logic',
      'Organize features in their own directories',
      'Separate business logic from UI components'
    ]
  },
  'express-api': {
    name: 'Express.js API Structure',
    structure: {
      'src/': {
        'controllers/': ['userController.js', 'authController.js', 'productController.js'],
        'models/': ['User.js', 'Product.js', 'Order.js'],
        'routes/': ['users.js', 'auth.js', 'products.js'],
        'middleware/': ['auth.js', 'validation.js', 'errorHandler.js'],
        'services/': ['emailService.js', 'paymentService.js', 'fileService.js'],
        'utils/': ['database.js', 'logger.js', 'helpers.js'],
        'config/': ['database.js', 'server.js', 'environment.js']
      },
      'tests/': ['unit/', 'integration/', 'fixtures/'],
      'docs/': ['api.md', 'setup.md'],
      'package.json': null,
      '.env.example': null,
      'server.js': null
    },
    recommendations: [
      'Follow MVC pattern for clear separation of concerns',
      'Use middleware for cross-cutting concerns',
      'Implement proper error handling at all levels',
      'Keep database logic in models or services'
    ]
  }
};

// GET /api/structures - Get all file structures
router.get('/', (req, res) => {
  try {
    res.json({
      success: true,
      data: fileStructures,
      message: 'File structures retrieved successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve file structures',
      message: error.message
    });
  }
});

// GET /api/structures/:projectType - Get structure for specific project type
router.get('/:projectType', (req, res) => {
  try {
    const { projectType } = req.params;
    const structure = fileStructures[projectType];
    
    if (!structure) {
      return res.status(404).json({
        success: false,
        error: 'Project type not found',
        message: `No file structure found for project type: ${projectType}`
      });
    }
    
    res.json({
      success: true,
      data: structure,
      message: `File structure for ${projectType} retrieved successfully`
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve file structure',
      message: error.message
    });
  }
});

module.exports = router;
