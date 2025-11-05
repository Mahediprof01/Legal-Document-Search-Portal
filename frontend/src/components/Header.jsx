import React from 'react';
import { BookOpen } from 'lucide-react';

export default function Header() {
  return (
    <header className="header">
      <div className="header-icon">
        <BookOpen size={60} strokeWidth={1.5} />
      </div>
      <h1 className="header-title">Legal Document Search Portal</h1>
      <p className="header-subtitle">Search and summarize legal documents with ease</p>
    </header>
  );
}
