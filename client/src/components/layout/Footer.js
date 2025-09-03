import React from 'react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer retro-screen">
      <div className="footer-content">
        <div className="footer-section">
          <p className="footer-text">
            <span className="bracket">[</span>
            ASAI v1.0.0 - AI SYSTEM ASSISTANCE INTERFACE
            <span className="bracket">]</span>
          </p>
        </div>
        
        <div className="footer-section">
          <p className="footer-text">
            © {currentYear} - OPTIMIZING HUMAN-AI COLLABORATION
          </p>
        </div>
        
        <div className="footer-section status-section">
          <div className="status-indicator">
            <span className="status-dot active"></span>
            <span className="status-text">SYSTEM ONLINE</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
