import React from 'react';
import { AlertCircle } from 'lucide-react';

export default function ErrorBanner({ message }) {
  if (!message) {
    return null;
  }

  return (
    <div className="error-message" role="alert">
      <div className="error-icon">
        <AlertCircle size={24} />
      </div>
      <p>{message}</p>
    </div>
  );
}
