import React, { useState } from 'react';
import './Troubleshooting.css';

const Troubleshooting = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedIssue, setSelectedIssue] = useState(null);

  const troubleshootingData = [
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
[Describe specific symptoms]

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
      solutions: [
        'Check dependency arrays in useEffect hooks',
        'Ensure state updates are immutable',
        'Use React.memo() for expensive components',
        'Verify key props in lists are unique and stable'
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
      solutions: [
        'Configure CORS properly on the backend',
        'Include proper authentication headers',
        'Implement retry logic with exponential backoff',
        'Add comprehensive error handling'
      ]
    },
    {
      id: 'state-management-complexity',
      title: 'State Management Complexity',
      category: 'react',
      difficulty: 'advanced',
      description: 'Managing complex application state and data flow',
      symptoms: [
        'State updates not reflecting in UI',
        'Prop drilling becoming unmanageable',
        'Synchronization issues between components',
        'Performance problems with state updates'
      ],
      aiPromptTemplate: `I'm struggling with state management in my application:

Current approach:
[Context API/Redux/Zustand/etc.]

State structure:
[Describe your current state organization]

Problem description:
[Explain the specific state management issue]

Application requirements:
[What the state needs to accomplish]

Please provide:
1. Analysis of the current approach
2. Recommended state management solution
3. Implementation example with best practices
4. Migration strategy if needed`,
      solutions: [
        'Choose appropriate state management tool for complexity',
        'Normalize state structure to avoid nesting',
        'Use selectors to optimize re-renders',
        'Implement proper action creators and reducers'
      ]
    }
  ];

  const categories = [
    { id: 'all', label: 'ALL ISSUES' },
    { id: 'react', label: 'REACT' },
    { id: 'general', label: 'GENERAL' },
    { id: 'api', label: 'API' }
  ];

  const filteredIssues = selectedCategory === 'all' 
    ? troubleshootingData 
    : troubleshootingData.filter(issue => issue.category === selectedCategory);

  const copyPromptToClipboard = async (template) => {
    try {
      await navigator.clipboard.writeText(template);
      alert('AI prompt template copied to clipboard!');
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
    }
  };

  return (
    <div className="troubleshooting-page fade-in">
      <div className="troubleshooting-container">
        <header className="page-header">
          <h1 className="page-title glow">
            <span className="title-bracket">[</span>
            DEBUG ASSISTANT
            <span className="title-bracket">]</span>
          </h1>
          <p className="page-description">
            Common coding issues and AI prompting strategies to solve them effectively.
          </p>
        </header>

        {/* Category Filter */}
        <section className="category-filter">
          <div className="filter-buttons">
            {categories.map((category) => (
              <button
                key={category.id}
                className={`filter-btn ${selectedCategory === category.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.label}
              </button>
            ))}
          </div>
        </section>

        {/* Issues List */}
        <section className="issues-section">
          <div className="issues-grid">
            {filteredIssues.map((issue) => (
              <div
                key={issue.id}
                className={`issue-card retro-screen ${selectedIssue?.id === issue.id ? 'expanded' : ''}`}
                onClick={() => setSelectedIssue(selectedIssue?.id === issue.id ? null : issue)}
              >
                <div className="issue-header">
                  <h3 className="issue-title">{issue.title}</h3>
                  <div className="issue-meta">
                    <span className={`difficulty-badge ${issue.difficulty}`}>
                      {issue.difficulty.toUpperCase()}
                    </span>
                    <span className="category-badge">{issue.category.toUpperCase()}</span>
                  </div>
                </div>
                
                <p className="issue-description">{issue.description}</p>

                <div className="symptoms-preview">
                  <strong>Common symptoms:</strong>
                  <span className="symptom-count">
                    {issue.symptoms.length} symptoms identified
                  </span>
                </div>

                {selectedIssue?.id === issue.id && (
                  <div className="issue-details">
                    <div className="symptoms-section">
                      <h4 className="detail-title">SYMPTOMS</h4>
                      <ul className="symptoms-list">
                        {issue.symptoms.map((symptom, index) => (
                          <li key={index} className="symptom-item">
                            <span className="symptom-bullet">⚠</span>
                            {symptom}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="prompt-section">
                      <h4 className="detail-title">AI PROMPT TEMPLATE</h4>
                      <div className="prompt-container">
                        <pre className="prompt-text">{issue.aiPromptTemplate}</pre>
                        <button 
                          className="btn btn-secondary copy-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            copyPromptToClipboard(issue.aiPromptTemplate);
                          }}
                        >
                          COPY PROMPT
                        </button>
                      </div>
                    </div>

                    <div className="solutions-section">
                      <h4 className="detail-title">COMMON SOLUTIONS</h4>
                      <ul className="solutions-list">
                        {issue.solutions.map((solution, index) => (
                          <li key={index} className="solution-item">
                            <span className="solution-bullet">✓</span>
                            {solution}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Troubleshooting;
