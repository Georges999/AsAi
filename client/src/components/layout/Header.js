import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'HOME', icon: '◆' },
    { path: '/project-selector', label: 'PROJECTS', icon: '▣' },
    { path: '/template-generator', label: 'TEMPLATES', icon: '≡' },
    { path: '/file-structure', label: 'STRUCTURE', icon: '⌘' },
    { path: '/troubleshooting', label: 'DEBUG', icon: '⚠' },
    { path: '/workflow', label: 'WORKFLOW', icon: '→' },
    { path: '/progress', label: 'PROGRESS', icon: '◊' }
  ];

  return (
    <header className="header retro-screen">
      <div className="header-content">
        <div className="logo-section">
          <h1 className="logo glow">
            <span className="logo-bracket">[</span>
            <span className="logo-text">ASAI</span>
            <span className="logo-bracket">]</span>
          </h1>
          <p className="tagline">AI SYSTEM ASSISTANCE INTERFACE</p>
        </div>
        
        <nav className="nav-section">
          <ul className="nav-list">
            {navItems.map((item) => (
              <li key={item.path} className="nav-item">
                <Link 
                  to={item.path} 
                  className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
                >
                  <span className="nav-icon">{item.icon}</span>
                  <span className="nav-label">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
