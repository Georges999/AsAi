import React, { useState } from 'react';
import './Workflow.css';

const Workflow = () => {
  const [selectedWorkflow, setSelectedWorkflow] = useState('development');
  const [completedSteps, setCompletedSteps] = useState(new Set());

  const workflows = {
    development: {
      title: 'Development Workflow',
      description: 'Iterative development process with AI collaboration',
      icon: '⚡',
      steps: [
        {
          step: 1,
          title: 'Feature Planning',
          description: 'Break down features into implementable tasks',
          aiPrompt: 'Help me break down this feature: [feature description] into specific, implementable tasks for a [project type]. Include acceptance criteria and potential challenges.',
          expectedOutput: 'Detailed task breakdown with acceptance criteria',
          timeEstimate: '30-60 minutes',
          tips: [
            'Be specific about the feature requirements',
            'Include user stories and acceptance criteria',
            'Consider edge cases and error scenarios'
          ]
        },
        {
          step: 2,
          title: 'Implementation',
          description: 'Develop features with AI assistance',
          aiPrompt: 'I need to implement [specific task] in [technology]. Here\'s my current code: [code]. Please help me implement this feature following best practices.',
          expectedOutput: 'Working code implementation',
          timeEstimate: 'Variable based on complexity',
          tips: [
            'Provide complete context about your current setup',
            'Mention any constraints or requirements',
            'Ask for explanations of the proposed solutions'
          ]
        },
        {
          step: 3,
          title: 'Code Review & Optimization',
          description: 'Review and optimize implemented code',
          aiPrompt: 'Please review this code for [feature]: [code]. Check for: 1) Best practices adherence 2) Performance optimization opportunities 3) Security considerations 4) Code maintainability',
          expectedOutput: 'Optimized code with recommendations',
          timeEstimate: '30-45 minutes per feature',
          tips: [
            'Include the full context of your code',
            'Ask specific questions about areas of concern',
            'Request explanations for suggested improvements'
          ]
        }
      ]
    },
    debugging: {
      title: 'Debugging & Problem Solving',
      description: 'Systematic approach to debugging with AI assistance',
      icon: '🔍',
      steps: [
        {
          step: 1,
          title: 'Problem Identification',
          description: 'Clearly define and document the issue',
          aiPrompt: 'I\'m experiencing this issue: [describe problem]. Here\'s the error message: [error]. Here\'s the relevant code: [code]. Help me understand what\'s causing this problem.',
          expectedOutput: 'Clear problem diagnosis',
          timeEstimate: '15-30 minutes',
          tips: [
            'Include exact error messages',
            'Provide steps to reproduce the issue',
            'Share relevant code snippets'
          ]
        },
        {
          step: 2,
          title: 'Solution Development',
          description: 'Develop and test potential solutions',
          aiPrompt: 'Based on the problem diagnosis: [diagnosis], provide multiple solution approaches. Include: 1) Quick fixes 2) Long-term solutions 3) Prevention strategies',
          expectedOutput: 'Multiple solution options with trade-offs',
          timeEstimate: '30-90 minutes',
          tips: [
            'Ask for multiple solution approaches',
            'Understand the trade-offs of each solution',
            'Test solutions incrementally'
          ]
        },
        {
          step: 3,
          title: 'Prevention & Documentation',
          description: 'Document solution and prevent future occurrences',
          aiPrompt: 'Help me document the solution for [problem] and create guidelines to prevent similar issues in the future. Include debugging steps and best practices.',
          expectedOutput: 'Documentation and prevention guidelines',
          timeEstimate: '15-30 minutes',
          tips: [
            'Document the root cause and solution',
            'Create checklists for future reference',
            'Update your development practices'
          ]
        }
      ]
    },
    projectPlanning: {
      title: 'Project Planning & Setup',
      description: 'Initial project setup and architecture planning with AI assistance',
      icon: '📋',
      steps: [
        {
          step: 1,
          title: 'Define Project Requirements',
          description: 'Clarify project scope and requirements',
          aiPrompt: 'Help me define clear requirements for my [project type] that includes [brief description]. What questions should I answer to ensure I have a complete project specification?',
          expectedOutput: 'Comprehensive requirements document',
          timeEstimate: '1-2 hours',
          tips: [
            'Be thorough with functional requirements',
            'Consider non-functional requirements',
            'Define success criteria clearly'
          ]
        },
        {
          step: 2,
          title: 'Architecture Planning',
          description: 'Design system architecture and technology stack',
          aiPrompt: 'Based on these requirements: [requirements], suggest an appropriate technology stack and system architecture for a [project type]. Consider scalability, maintainability, and development time.',
          expectedOutput: 'Technology stack and architecture diagram',
          timeEstimate: '2-4 hours',
          tips: [
            'Consider your team\'s expertise',
            'Think about long-term maintenance',
            'Evaluate performance requirements'
          ]
        },
        {
          step: 3,
          title: 'Project Structure Setup',
          description: 'Create initial project structure and configuration',
          aiPrompt: 'Create a complete project structure for a [technology stack] application. Include folder organization, configuration files, and initial setup scripts.',
          expectedOutput: 'Complete project scaffolding',
          timeEstimate: '1-3 hours',
          tips: [
            'Follow established conventions',
            'Set up development tools early',
            'Create comprehensive documentation'
          ]
        }
      ]
    }
  };

  const toggleStepCompletion = (workflowKey, stepNumber) => {
    const stepId = `${workflowKey}-${stepNumber}`;
    const newCompleted = new Set(completedSteps);
    
    if (newCompleted.has(stepId)) {
      newCompleted.delete(stepId);
    } else {
      newCompleted.add(stepId);
    }
    
    setCompletedSteps(newCompleted);
  };

  const copyPromptToClipboard = async (prompt) => {
    try {
      await navigator.clipboard.writeText(prompt);
      alert('AI prompt copied to clipboard!');
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
    }
  };

  const currentWorkflow = workflows[selectedWorkflow];

  return (
    <div className="workflow-page fade-in">
      <div className="workflow-container">
        <header className="page-header">
          <h1 className="page-title glow">
            <span className="title-bracket">[</span>
            AI COLLABORATION WORKFLOWS
            <span className="title-bracket">]</span>
          </h1>
          <p className="page-description">
            Step-by-step workflows for effective AI-assisted development
          </p>
        </header>

        {/* Workflow Selection */}
        <section className="workflow-selection">
          <div className="workflow-tabs">
            {Object.entries(workflows).map(([key, workflow]) => (
              <button
                key={key}
                className={`workflow-tab ${selectedWorkflow === key ? 'active' : ''}`}
                onClick={() => setSelectedWorkflow(key)}
              >
                <span className="tab-icon">{workflow.icon}</span>
                <span className="tab-title">{workflow.title}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Current Workflow */}
        <section className="current-workflow">
          <div className="workflow-header retro-screen">
            <div className="workflow-info">
              <h2 className="workflow-title">
                {currentWorkflow.icon} {currentWorkflow.title}
              </h2>
              <p className="workflow-description">{currentWorkflow.description}</p>
            </div>
            <div className="workflow-progress">
              <span className="progress-text">
                {Array.from(completedSteps).filter(id => id.startsWith(selectedWorkflow)).length} / {currentWorkflow.steps.length} COMPLETED
              </span>
            </div>
          </div>

          <div className="workflow-steps">
            {currentWorkflow.steps.map((step) => {
              const stepId = `${selectedWorkflow}-${step.step}`;
              const isCompleted = completedSteps.has(stepId);
              
              return (
                <div key={step.step} className={`workflow-step retro-screen ${isCompleted ? 'completed' : ''}`}>
                  <div className="step-header">
                    <div className="step-number">
                      <span className="step-count">{step.step}</span>
                    </div>
                    <div className="step-info">
                      <h3 className="step-title">{step.title}</h3>
                      <p className="step-description">{step.description}</p>
                      <div className="step-meta">
                        <span className="time-estimate">⏱ {step.timeEstimate}</span>
                      </div>
                    </div>
                    <button
                      className={`completion-toggle ${isCompleted ? 'completed' : ''}`}
                      onClick={() => toggleStepCompletion(selectedWorkflow, step.step)}
                    >
                      {isCompleted ? '✓' : '○'}
                    </button>
                  </div>

                  <div className="step-content">
                    <div className="ai-prompt-section">
                      <h4 className="content-title">AI PROMPT TEMPLATE</h4>
                      <div className="prompt-container">
                        <pre className="prompt-text">{step.aiPrompt}</pre>
                        <button 
                          className="btn btn-secondary copy-prompt-btn"
                          onClick={() => copyPromptToClipboard(step.aiPrompt)}
                        >
                          COPY PROMPT
                        </button>
                      </div>
                    </div>

                    <div className="expected-output-section">
                      <h4 className="content-title">EXPECTED OUTPUT</h4>
                      <p className="expected-output">{step.expectedOutput}</p>
                    </div>

                    <div className="tips-section">
                      <h4 className="content-title">PRO TIPS</h4>
                      <ul className="tips-list">
                        {step.tips.map((tip, index) => (
                          <li key={index} className="tip-item">
                            <span className="tip-bullet">💡</span>
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Workflow;
