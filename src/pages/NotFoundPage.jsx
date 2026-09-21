import { Link } from 'react-router-dom';
import { Compass, Home } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="not-found-container">
      <div className="not-found-card">
        <div className="not-found-icon-box">
          <Compass size={44} className="not-found-icon" />
        </div>
        <h1 className="not-found-title">404 - Page Not Found</h1>
        <p className="not-found-desc">
          The weather coordinates or route you are navigating to does not exist.
        </p>
        <Link to="/" className="btn-not-found-home">
          <Home size={16} />
          <span>Return to Dashboard</span>
        </Link>
      </div>
    </div>
  );
}
