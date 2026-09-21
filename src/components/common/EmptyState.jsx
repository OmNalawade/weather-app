import { useState } from 'react';
import { Search, LocateFixed, CloudSun } from 'lucide-react';
import { useWeather } from '../../context/WeatherContext';

export default function EmptyState() {
  const { searchCity, useCurrentLocation, isLocating } = useWeather();
  const [cityInput, setCityInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (cityInput.trim()) {
      searchCity(cityInput.trim());
    }
  };

  return (
    <div className="empty-state-card">
      <div className="empty-icon-glow">
        <CloudSun size={52} className="empty-cloud-icon" />
      </div>

      <h2 className="empty-headline">Check the weather anywhere</h2>
      <p className="empty-subtext">
        Search for any global city or use your device geolocation to view real-time atmospheric conditions, live 5-day forecasts, and hourly trends.
      </p>

      <form onSubmit={handleSubmit} className="empty-search-form">
        <div className="empty-input-group">
          <Search size={18} className="empty-search-icon" />
          <input
            type="text"
            className="empty-search-input"
            placeholder="Search for a city (e.g. Pune, Tokyo, New York)..."
            value={cityInput}
            onChange={(e) => setCityInput(e.target.value)}
          />
          <button type="submit" className="empty-submit-btn">
            Explore
          </button>
        </div>
      </form>

      <div className="empty-actions-divider">
        <span>OR</span>
      </div>

      <button
        type="button"
        className={`empty-location-btn ${isLocating ? 'locating' : ''}`}
        onClick={useCurrentLocation}
        disabled={isLocating}
      >
        <LocateFixed size={18} className={isLocating ? 'spin' : ''} />
        <span>{isLocating ? 'Detecting Location...' : 'Use Current Location'}</span>
      </button>

      <div className="empty-quick-pills">
        <span className="pills-label">Popular searches:</span>
        {['Pune', 'Mumbai', 'Delhi', 'Bangalore', 'London', 'Tokyo'].map((city) => (
          <button
            key={city}
            type="button"
            className="quick-city-pill"
            onClick={() => searchCity(city)}
          >
            {city}
          </button>
        ))}
      </div>
    </div>
  );
}
