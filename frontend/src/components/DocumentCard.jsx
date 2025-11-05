import React from 'react';
import { Calendar } from 'lucide-react';

export default function DocumentCard({ doc }) {
  const getDocumentTypeColor = (documentType) => {
    const typeColorMapping = {
      'Case Law': '#8b6f47',
      'Contract Template': '#5a7c8b',
      'Legal Analysis': '#7a7a7a',
      'Legal Guide': '#6b5b4d',
      'Regulatory Guide': '#5d5d5d'
    };
    return typeColorMapping[documentType] || '#666';
  };

  const formattedDate = new Date(doc.date_filed).toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  const relevancePercentage = (doc.relevance_score * 100).toFixed(0);

  return (
    <div className="document-card">
      <div className="document-header">
        <div 
          className="document-type-badge" 
          style={{ backgroundColor: getDocumentTypeColor(doc.document_type) }}
        >
          {doc.document_type}
        </div>
        <div className="relevance-score">
          <span className="score-label">Relevance</span>
          <span className="score-value">{relevancePercentage}%</span>
        </div>
      </div>
      <h3 className="document-title">{doc.title}</h3>
      <p className="document-summary">{doc.summary}</p>
      <div className="document-footer">
        <div className="document-meta">
          <span className="meta-icon">
            <Calendar size={18} />
          </span>
          <span className="meta-text">Filed: {formattedDate}</span>
        </div>
      </div>
    </div>
  );
}
