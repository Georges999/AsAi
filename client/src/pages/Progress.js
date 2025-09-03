import React, { useState, useEffect } from 'react';
import './Progress.css';

const Progress = () => {
  const [userProgress, setUserProgress] = useState({
    projectProgress: {
      'project-setup': { completed: 2, total: 4 },
      'core-development': { completed: 1, total: 4 },
      'testing-optimization': { completed: 0, total: 4 },
      'deployment': { completed: 0, total: 4 }
    },
    skillLevels: {
      'ai-prompting': 2,
      'problem-solving': 3
    },
    overallProgress: 25
  });

  const [selectedPhase, setSelectedPhase] = useState(null);

  const phases = [
    {
      id: 'project-setup',
      title: 'Project Setup & Planning',
      description: 'Initial project configuration and planning phase',
      weight: 15,
      color: 'var(--primary-green)',
      milestones: [
        'Requirements defined',
        'Technology stack selected',
        'Project structure created',
        'Development environment configured'
      ]
    },
    {
      id: 'core-development',
      title: 'Core Development',
      description: 'Main feature development phase',
      weight: 50,
      color: 'var(--warning-amber)',
      milestones: [
        'Basic architecture implemented',
        'Core features developed',
        'API integration completed',
        'User interface finalized'
      ]
    },
    {
      id: 'testing-optimization',
      title: 'Testing & Optimization',
      description: 'Quality assurance and performance optimization',
      weight: 20,
      color: 'var(--info-cyan)',
      milestones: [
        'Unit tests implemented',
        'Integration testing completed',
        'Performance optimized',
        'Security review conducted'
      ]
    },
    {
      id: 'deployment',
      title: 'Deployment & Launch',
      description: 'Production deployment and launch activities',
      weight: 15,
      color: 'var(--error-red)',
      milestones: [
        'Production environment configured',
        'Application deployed',
        'Monitoring implemented',
        'Documentation completed'
      ]
    }
  ];

  const skills = [
    {
      id: 'ai-prompting',
      title: 'AI Prompting Skills',
      description: 'Effectiveness in communicating with AI assistants',
      levels: [
        { level: 1, title: 'Basic Questions', description: 'Can ask simple questions and understand responses' },
        { level: 2, title: 'Context Provision', description: 'Provides relevant context and examples in prompts' },
        { level: 3, title: 'Structured Prompting', description: 'Uses templates and structured approaches' },
        { level: 4, title: 'Advanced Collaboration', description: 'Effectively iterates and refines with AI assistance' },
        { level: 5, title: 'Expert Integration', description: 'Seamlessly integrates AI into development workflow' }
      ]
    },
    {
      id: 'problem-solving',
      title: 'Problem Solving',
      description: 'Ability to break down and solve complex problems',
      levels: [
        { level: 1, title: 'Issue Identification', description: 'Can identify when problems occur' },
        { level: 2, title: 'Problem Description', description: 'Can clearly describe issues and symptoms' },
        { level: 3, title: 'Solution Research', description: 'Knows how to research and find solutions' },
        { level: 4, title: 'Solution Implementation', description: 'Can implement and test solutions effectively' },
        { level: 5, title: 'Prevention Planning', description: 'Develops strategies to prevent future issues' }
      ]
    }
  ];

  const getPhaseProgress = (phaseId) => {
    const progress = userProgress.projectProgress[phaseId];
    return progress ? (progress.completed / progress.total) * 100 : 0;
  };

  const getSkillProgress = (skillId) => {
    const level = userProgress.skillLevels[skillId];
    return level ? (level / 5) * 100 : 0;
  };

  const updateMilestone = (phaseId, milestoneIndex, completed) => {
    // In a real app, this would update the backend
    setUserProgress(prev => {
      const newProgress = { ...prev };
      const currentCompleted = newProgress.projectProgress[phaseId].completed;
      
      if (completed && milestoneIndex >= currentCompleted) {
        newProgress.projectProgress[phaseId].completed = milestoneIndex + 1;
      } else if (!completed && milestoneIndex < currentCompleted) {
        newProgress.projectProgress[phaseId].completed = milestoneIndex;
      }
      
      return newProgress;
    });
  };

  return (
    <div className="progress-page fade-in">
      <div className="progress-container">
        <header className="page-header">
          <h1 className="page-title glow">
            <span className="title-bracket">[</span>
            PROGRESS TRACKING
            <span className="title-bracket">]</span>
          </h1>
          <p className="page-description">
            Monitor your development journey and AI collaboration skills
          </p>
        </header>

        {/* Overall Progress */}
        <section className="overall-progress-section">
          <div className="overall-progress-card retro-screen">
            <h2 className="section-title">OVERALL PROGRESS</h2>
            <div className="overall-stats">
              <div className="progress-circle">
                <div className="circle-content">
                  <span className="progress-percentage">{userProgress.overallProgress}%</span>
                  <span className="progress-label">COMPLETE</span>
                </div>
              </div>
              <div className="progress-details">
                <div className="detail-item">
                  <span className="detail-label">PROJECT STATUS:</span>
                  <span className="detail-value">IN DEVELOPMENT</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">NEXT MILESTONE:</span>
                  <span className="detail-value">API Integration</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">ESTIMATED COMPLETION:</span>
                  <span className="detail-value">4-6 weeks</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Project Phases */}
        <section className="phases-section">
          <h2 className="section-title">PROJECT PHASES</h2>
          <div className="phases-grid">
            {phases.map((phase) => {
              const progress = getPhaseProgress(phase.id);
              const phaseData = userProgress.projectProgress[phase.id];
              
              return (
                <div
                  key={phase.id}
                  className={`phase-card retro-screen ${selectedPhase === phase.id ? 'expanded' : ''}`}
                  onClick={() => setSelectedPhase(selectedPhase === phase.id ? null : phase.id)}
                >
                  <div className="phase-header">
                    <h3 className="phase-title">{phase.title}</h3>
                    <div className="phase-progress">
                      <div className="progress-bar">
                        <div 
                          className="progress-fill"
                          style={{ 
                            width: `${progress}%`,
                            backgroundColor: phase.color
                          }}
                        ></div>
                      </div>
                      <span className="progress-text">
                        {phaseData.completed}/{phaseData.total}
                      </span>
                    </div>
                  </div>
                  
                  <p className="phase-description">{phase.description}</p>
                  
                  {selectedPhase === phase.id && (
                    <div className="phase-details">
                      <h4 className="milestones-title">MILESTONES</h4>
                      <div className="milestones-list">
                        {phase.milestones.map((milestone, index) => {
                          const isCompleted = index < phaseData.completed;
                          return (
                            <div
                              key={index}
                              className={`milestone-item ${isCompleted ? 'completed' : ''}`}
                              onClick={(e) => {
                                e.stopPropagation();
                                updateMilestone(phase.id, index, !isCompleted);
                              }}
                            >
                              <span className="milestone-checkbox">
                                {isCompleted ? '✓' : '○'}
                              </span>
                              <span className="milestone-text">{milestone}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Skills Progress */}
        <section className="skills-section">
          <h2 className="section-title">SKILL DEVELOPMENT</h2>
          <div className="skills-grid">
            {skills.map((skill) => {
              const currentLevel = userProgress.skillLevels[skill.id];
              const progress = getSkillProgress(skill.id);
              
              return (
                <div key={skill.id} className="skill-card retro-screen">
                  <div className="skill-header">
                    <h3 className="skill-title">{skill.title}</h3>
                    <div className="skill-level">
                      LEVEL {currentLevel}/5
                    </div>
                  </div>
                  
                  <p className="skill-description">{skill.description}</p>
                  
                  <div className="skill-progress">
                    <div className="progress-bar">
                      <div 
                        className="progress-fill"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="skill-levels">
                    {skill.levels.map((level) => (
                      <div
                        key={level.level}
                        className={`level-item ${currentLevel >= level.level ? 'achieved' : ''}`}
                      >
                        <span className="level-number">{level.level}</span>
                        <div className="level-info">
                          <span className="level-title">{level.title}</span>
                          <span className="level-description">{level.description}</span>
                        </div>
                      </div>
                    ))}
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

export default Progress;
