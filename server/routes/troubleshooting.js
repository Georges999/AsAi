const express = require('express');
const router = express.Router();

// Common troubleshooting scenarios and AI prompting solutions
const troubleshootingGuides = [
  {
    id: 'react-render-issues',
    title: 'React Component Rendering Problems',
    category: 'react',
    difficulty: 'intermediate',
    description: 'Component not updating, infinite re-renders, or performance issues',
    symptoms: [
      'Component not re-rendering when state changes',
      'Infinite loop of re-renders',
      'UI freezing or becoming unresponsive',
      'Props not updating child components'
    ],
    aiPromptTemplate: `I'm experiencing React rendering issues with the following symptoms:
[Describe specific symptoms from the list above]

Current component code:
[Paste your component code here]

State management approach:
[useState/useReducer/Redux/etc.]

When this happens:
[Describe the user actions that trigger the issue]

Please help me:
1. Identify the root cause of the rendering issue
2. Provide a corrected version of the code
3. Explain why the original code caused problems
4. Suggest best practices to prevent similar issues`,
    commonSolutions: [
      'Check dependency arrays in useEffect hooks',
      'Ensure state updates are immutable',
      'Use React.memo() for expensive components',
      'Verify key props in lists are unique and stable'
    ],
    preventionTips: [
      'Always include all dependencies in useEffect arrays',
      'Use functional state updates when new state depends on previous state',
      'Avoid creating objects/arrays in render functions',
      'Use useCallback and useMemo for optimization'
    ]
  },
  {
    id: 'api-integration-errors',
    title: 'API Integration and Network Errors',
    category: 'general',
    difficulty: 'beginner',
    description: 'Problems with API calls, CORS errors, and data fetching',
    symptoms: [
      'CORS policy blocking requests',
      'API returns 401/403 errors',
      'Network requests timing out',
      'Data not loading or showing as undefined'
    ],
    aiPromptTemplate: `I'm having trouble with API integration in my application:

Error details:
[Copy the exact error message here]

API endpoint:
[URL and HTTP method]

Request code:
[Paste your fetch/axios code]

Expected vs actual behavior:
[What should happen vs what actually happens]

Please help me:
1. Diagnose the specific issue
2. Provide corrected code with proper error handling
3. Explain the cause of the problem
4. Suggest best practices for API integration`,
    commonSolutions: [
      'Configure CORS properly on the backend',
      'Include proper authentication headers',
      'Implement retry logic with exponential backoff',
      'Add comprehensive error handling'
    ],
    preventionTips: [
      'Always handle both network and application errors',
      'Use environment variables for API URLs',
      'Implement loading states for better UX',
      'Test API endpoints independently before integration'
    ]
  }
];

// GET /api/troubleshooting - Get all troubleshooting guides
router.get('/', (req, res) => {
  try {
    const { category, difficulty } = req.query;
    
    let guides = troubleshootingGuides;
    
    if (category) {
      guides = guides.filter(guide => guide.category === category);
    }
    
    if (difficulty) {
      guides = guides.filter(guide => guide.difficulty === difficulty);
    }
    
    res.json({
      success: true,
      data: guides,
      message: 'Troubleshooting guides retrieved successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve troubleshooting guides',
      message: error.message
    });
  }
});

// GET /api/troubleshooting/:id - Get specific troubleshooting guide
router.get('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const guide = troubleshootingGuides.find(g => g.id === id);
    
    if (!guide) {
      return res.status(404).json({
        success: false,
        error: 'Guide not found',
        message: `No troubleshooting guide found with ID: ${id}`
      });
    }
    
    res.json({
      success: true,
      data: guide,
      message: 'Troubleshooting guide retrieved successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve troubleshooting guide',
      message: error.message
    });
  }
});

module.exports = router;
