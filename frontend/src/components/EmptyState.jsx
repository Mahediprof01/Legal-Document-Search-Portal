import React from 'react';
import { BookOpen } from 'lucide-react';

export default function EmptyState() {
  return (
    <div className="empty-state">
      <div className="empty-icon">
        <BookOpen size={80} strokeWidth={1} opacity={0.6} />
      </div>
      <h3 className="empty-title">Ready to Search</h3>
      <p className="empty-text">Enter a legal query above to find relevant documents and summaries</p>
    </div>
  );
}
