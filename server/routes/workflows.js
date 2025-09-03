const express = require('express');
const router = express.Router();

// AI collaboration workflows for different phases
const workflows = {
  projectPlanning: {
    title: 'Project Planning & Setup',
    description: 'Initial project setup and architecture planning with AI assistance',
    steps: [
      {
        step: 1,
        title: 'Define Project Requirements',
        description: 'Clarify project scope and requirements',
        aiPrompt: 'Help me define clear requirements for my [project type] that includes [brief description]. What questions should I answer to ensure I have a complete project specification?',
        expectedOutput: 'Comprehensive requirements document',
        timeEstimate: '1-2 hours'
      },
      {
        step: 2,
        title: 'Architecture Planning',
        description: 'Design system architecture and technology stack',
        aiPrompt: 'Based on these requirements: [requirements], suggest an appropriate technology stack and system architecture for a [project type]. Consider scalability, maintainability, and development time.',
        expectedOutput: 'Technology stack and architecture diagram',
        timeEstimate: '2-4 hours'
      },
      {
        step: 3,
        title: 'Project Structure Setup',
        description: 'Create initial project structure and configuration',
        aiPrompt: 'Create a complete project structure for a [technology stack] application. Include folder organization, configuration files, and initial setup scripts.',
        expectedOutput: 'Complete project scaffolding',
        timeEstimate: '1-3 hours'
      }
    ]
  },
  development: {
    title: 'Development Workflow',
    description: 'Iterative development process with AI collaboration',
    steps: [
      {
        step: 1,
        title: 'Feature Planning',
        description: 'Break down features into implementable tasks',
        aiPrompt: 'Help me break down this feature: [feature description] into specific, implementable tasks for a [project type]. Include acceptance criteria and potential challenges.',
        expectedOutput: 'Detailed task breakdown with acceptance criteria',
        timeEstimate: '30-60 minutes'
      },
      {
        step: 2,
        title: 'Implementation',
        description: 'Develop features with AI assistance',
        aiPrompt: 'I need to implement [specific task] in [technology]. Here\'s my current code: [code]. Please help me implement this feature following best practices.',
        expectedOutput: 'Working code implementation',
        timeEstimate: 'Variable based on complexity'
      },
      {
        step: 3,
        title: 'Code Review & Optimization',
        description: 'Review and optimize implemented code',
        aiPrompt: 'Please review this code for [feature]: [code]. Check for: 1) Best practices adherence 2) Performance optimization opportunities 3) Security considerations 4) Code maintainability',
        expectedOutput: 'Optimized code with recommendations',
        timeEstimate: '30-45 minutes per feature'
      }
    ]
  },
  debugging: {
    title: 'Debugging & Problem Solving',
    description: 'Systematic approach to debugging with AI assistance',
    steps: [
      {
        step: 1,
        title: 'Problem Identification',
        description: 'Clearly define and document the issue',
        aiPrompt: 'I\'m experiencing this issue: [describe problem]. Here\'s the error message: [error]. Here\'s the relevant code: [code]. Help me understand what\'s causing this problem.',
        expectedOutput: 'Clear problem diagnosis',
        timeEstimate: '15-30 minutes'
      },
      {
        step: 2,
        title: 'Solution Development',
        description: 'Develop and test potential solutions',
        aiPrompt: 'Based on the problem diagnosis: [diagnosis], provide multiple solution approaches. Include: 1) Quick fixes 2) Long-term solutions 3) Prevention strategies',
        expectedOutput: 'Multiple solution options with trade-offs',
        timeEstimate: '30-90 minutes'
      },
      {
        step: 3,
        title: 'Prevention & Documentation',
        description: 'Document solution and prevent future occurrences',
        aiPrompt: 'Help me document the solution for [problem] and create guidelines to prevent similar issues in the future. Include debugging steps and best practices.',
        expectedOutput: 'Documentation and prevention guidelines',
        timeEstimate: '15-30 minutes'
      }
    ]
  }
};

// GET /api/workflows - Get all workflows
router.get('/', (req, res) => {
  try {
    res.json({
      success: true,
      data: workflows,
      message: 'Workflows retrieved successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve workflows',
      message: error.message
    });
  }
});

// GET /api/workflows/:workflowType - Get specific workflow
router.get('/:workflowType', (req, res) => {
  try {
    const { workflowType } = req.params;
    const workflow = workflows[workflowType];
    
    if (!workflow) {
      return res.status(404).json({
        success: false,
        error: 'Workflow not found',
        message: `No workflow found for type: ${workflowType}`
      });
    }
    
    res.json({
      success: true,
      data: workflow,
      message: 'Workflow retrieved successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve workflow',
      message: error.message
    });
  }
});

module.exports = router;
