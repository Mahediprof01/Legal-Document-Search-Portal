import React from 'react';
import DocumentCard from './DocumentCard';

export default function ResultsList({ documents, query, total }) {
  return (
    <div className="results-container">
      <div className="results-header">
        <h2 className="results-title">Search Results</h2>
        <div className="results-meta">
          {query && <span className="results-query">Query: "{query}"</span>}
          <span className="results-count">{total || documents.length} documents found</span>
        </div>
      </div>

      <div className="documents-grid">
        {documents.map((doc) => (
          <DocumentCard key={doc.id} doc={doc} />
        ))}
      </div>
    </div>
  );
}
