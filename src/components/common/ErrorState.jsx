import { AlertCircle, RotateCcw, Search, KeyRound, WifiOff } from 'lucide-react';
import { useWeather } from '../../context/WeatherContext';

export default function ErrorState({ error, onRetry }) {
  const { searchCity } = useWeather();
  const errText = error || 'Something went wrong while retrieving weather data.';
  const isKeyError = errText.toLowerCase().includes('api key') || errText.toLowerCase().includes('401');
  const isNetwork = errText.toLowerCase().includes('network') || errText.toLowerCase().includes('connect');

  return (
    <div className="error-state-panel">
      <div className="error-card-inner">
        <div className={`error-icon-bubble ${isKeyError ? 'key-error' : isNetwork ? 'network-error' : ''}`}>
          {isKeyError ? (
            <KeyRound size={36} />
          ) : isNetwork ? (
            <WifiOff size={36} />
          ) : (
            <AlertCircle size={36} />
          )}
        </div>

        <h2 className="error-card-title">
          {isKeyError ? 'API Key Authorization Notice' : isNetwork ? 'Network Connection Issue' : 'Weather Information Unavailable'}
        </h2>

        <p className="error-card-description">{errText}</p>

        <div className="error-card-buttons">
          {onRetry && (
            <button type="button" className="btn-error-primary" onClick={onRetry}>
              <RotateCcw size={16} />
              <span>Retry</span>
            </button>
          )}

          <button
            type="button"
            className="btn-error-secondary"
            onClick={() => searchCity('Pune')}
          >
            <Search size={16} />
            <span>Search Pune</span>
          </button>
        </div>
      </div>
    </div>
  );
}
