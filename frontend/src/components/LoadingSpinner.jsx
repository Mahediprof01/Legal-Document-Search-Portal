import React from 'react';
import { Loader } from 'lucide-react';

export default function LoadingSpinner() {
  return (
    <div className="loading-container">
      <div className="loading-spinner-large">
        <Loader size={50} />
      </div>
      <p className="loading-text">Searching legal documents...</p>
    </div>
  );
}
