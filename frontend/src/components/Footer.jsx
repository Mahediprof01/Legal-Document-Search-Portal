import React from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <p>Legal Document Search Portal © {currentYear} | Professional Legal Research Tool</p>
    </footer>
  );
}
