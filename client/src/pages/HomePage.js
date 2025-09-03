import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="home-page fade-in">
      <div className="home-container">
        {/* Hero Section */}
        <section className="hero-section retro-screen">
          <div className="hero-content">
            <h1 className="hero-title glow">
              WELCOME TO ASAI
            </h1>
            <h2 className="hero-subtitle">
              AI SYSTEM ASSISTANCE INTERFACE
            </h2>
            <p className="hero-description">
              Master the art of AI-assisted coding. Learn how to effectively prompt, 
              collaborate with, and leverage AI coding assistants for maximum productivity.
            </p>
            <div className="hero-stats">
              <div className="stat-item">
                <span className="stat-number">7</span>
                <span className="stat-label">CORE MODULES</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">∞</span>
                <span className="stat-label">POSSIBILITIES</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">1</span>
                <span className="stat-label">GOAL</span>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Start Section */}
        <section className="quick-start-section">
          <div className="visual-separator">
            <span>QUICK START PROTOCOL</span>
          </div>
          <div className="highlight-box">
            <h3 className="important-text" style={{textAlign: 'center', marginBottom: 'var(--spacing-lg)'}}>
              Start Your AI Collaboration Journey
            </h3>
            <div className="quick-start-grid">
              <Link to="/project-selector" className="quick-start-card retro-screen pulse">
                <div className="card-icon">▣</div>
                <h4 className="card-title">1. SELECT PROJECT TYPE</h4>
                <p className="card-description">
                  Choose your project type to get tailored AI assistance strategies
                </p>
                <div className="card-status highlight">START HERE</div>
              </Link>

              <Link to="/template-generator" className="quick-start-card retro-screen">
                <div className="card-icon">≡</div>
                <h4 className="card-title">2. GENERATE PROMPTS</h4>
                <p className="card-description">
                  Get proven prompt templates that actually work
                </p>
                <div className="card-status">STEP 2</div>
              </Link>

              <Link to="/workflow" className="quick-start-card retro-screen">
                <div className="card-icon">→</div>
                <h4 className="card-title">3. FOLLOW WORKFLOW</h4>
                <p className="card-description">
                  Execute systematic AI collaboration strategies
                </p>
                <div className="card-status">STEP 3</div>
              </Link>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="features-section">
          <h3 className="section-title">
            <span className="title-bracket">[</span>
            SYSTEM CAPABILITIES
            <span className="title-bracket">]</span>
          </h3>
          <div className="features-grid">
            <div className="feature-card retro-screen">
              <div className="feature-icon">⌘</div>
              <h4 className="feature-title">FILE STRUCTURE</h4>
              <p className="feature-description">
                Visual project organization with AI-optimized structures
              </p>
            </div>

            <div className="feature-card retro-screen">
              <div className="feature-icon">⚠</div>
              <h4 className="feature-title">DEBUG ASSISTANT</h4>
              <p className="feature-description">
                Common error patterns and AI prompting solutions
              </p>
            </div>

            <div className="feature-card retro-screen">
              <div className="feature-icon">◊</div>
              <h4 className="feature-title">PROGRESS TRACKING</h4>
              <p className="feature-description">
                Monitor your AI collaboration skills development
              </p>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="cta-section">
          <div className="cta-content retro-screen highlight-box">
            <h3 className="cta-title important-text">READY TO MASTER AI COLLABORATION?</h3>
            <p className="cta-description">
              Stop struggling with unclear prompts. Learn the systematic approach that actually works.
              Start with your project type and get immediate, actionable guidance.
            </p>
            <div className="cta-actions">
              <Link to="/project-selector" className="btn btn-primary btn-large btn-highlight cta-button">
                🚀 BEGIN LEARNING JOURNEY
              </Link>
              <p className="cta-subtext">
                No signup required • Immediate access • Proven strategies
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomePage;
