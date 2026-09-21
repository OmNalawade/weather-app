import { AlertCircle, RotateCcw, Search } from 'lucide-react';

export default function ErrorMessage({ message, onRetry, onDefaultCity }) {
  return (
    <div className="error-card-container">
      <div className="error-card">
        <div className="error-icon-box">
          <AlertCircle size={36} className="error-icon" />
        </div>
        <h3 className="error-title">Weather Unavailable</h3>
        <p className="error-description">
          {message || 'Something went wrong while retrieving the weather data. Please check your query or connection.'}
        </p>
        
        <div className="error-actions">
          {onRetry && (
            <button type="button" className="btn-retry" onClick={onRetry}>
              <RotateCcw size={16} />
              <span>Try Again</span>
            </button>
          )}
          {onDefaultCity && (
            <button type="button" className="btn-default-city" onClick={onDefaultCity}>
              <Search size={16} />
              <span>Show Pune Weather</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
