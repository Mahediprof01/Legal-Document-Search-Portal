import React, { useState } from 'react';
import { Search, Loader } from 'lucide-react';

export default function SearchBar({ onSearch, isLoading }) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) {
      return;
    }
    onSearch(trimmed);
  };

  return (
    <div className="search-section">
      <form onSubmit={handleSubmit} className="search-form">
        <div className="search-input-wrapper">
          <input
            type="text"
            className="search-input"
            placeholder="Enter your legal query (e.g., 'employment contract', 'privacy compliance', 'merger checklist')"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            disabled={isLoading}
            maxLength={500}
          />
          <button 
            type="submit" 
            className="search-button"
            disabled={isLoading || !query.trim()}
          >
            {isLoading ? (
              <Loader size={20} className="loading-spinner" />
            ) : (
              <>
                <Search size={20} />
                <span>Search</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
