import { useState, useRef, useEffect } from 'react';
import { Search, LocateFixed, RotateCw, Moon, Sun, Cloud, X } from 'lucide-react';
import { useWeather } from '../../context/WeatherContext';
import { POPULAR_CITIES } from '../../data/mockWeather';

export default function Header() {
  const {
    weather,
    isRefreshing,
    isLocating,
    settings,
    searchCity,
    useCurrentLocation,
    refreshWeather,
    toggleTheme,
    recentCities
  } = useWeather();

  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);

  // Suggestions combining recent queries and popular cities
  const combinedSuggestions = [
    ...new Set([...recentCities, ...POPULAR_CITIES])
  ].filter((city) =>
    !query.trim() || city.toLowerCase().includes(query.trim().toLowerCase())
  ).slice(0, 6);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      searchCity(query.trim());
      setIsOpen(false);
    }
  };

  const handleSelect = (cityName) => {
    setQuery('');
    searchCity(cityName);
    setIsOpen(false);
  };

  return (
    <header className="app-top-header">
      {/* Mobile-only logo */}
      <div className="mobile-brand">
        <div className="mobile-logo-icon">
          <Cloud size={20} />
        </div>
        <span className="mobile-brand-title">Weather</span>
      </div>

      {/* Global Search Bar */}
      <div className="header-search-box" ref={wrapperRef}>
        <form onSubmit={handleSubmit} className="header-search-form">
          <Search size={17} className="search-input-icon" />
          <input
            type="text"
            className="header-search-input"
            placeholder={weather?.city ? `Search city (Current: ${weather.city})...` : 'Search city...'}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsOpen(true);
            }}
            onFocus={() => setIsOpen(true)}
            aria-label="Search city"
            autoComplete="off"
          />
          {query && (
            <button
              type="button"
              className="clear-search-btn"
              onClick={() => setQuery('')}
              aria-label="Clear search"
            >
              <X size={14} />
            </button>
          )}
        </form>

        {isOpen && combinedSuggestions.length > 0 && (
          <ul className="search-dropdown-menu">
            <li className="dropdown-heading">Suggested Cities</li>
            {combinedSuggestions.map((cityName) => (
              <li
                key={cityName}
                className="dropdown-item"
                onMouseDown={() => handleSelect(cityName)}
              >
                <Search size={14} className="dropdown-item-icon" />
                <span>{cityName}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Action Controls */}
      <div className="header-right-actions">
        {/* Current Location Button */}
        <button
          type="button"
          className={`action-btn location-btn ${isLocating ? 'loading' : ''}`}
          onClick={useCurrentLocation}
          disabled={isLocating}
          title="Use Current Location (GPS)"
          aria-label="Use Current Location"
        >
          <LocateFixed size={16} className={`action-icon ${isLocating ? 'spin' : ''}`} />
          <span className="action-btn-text">
            {isLocating ? 'Locating...' : 'Current Location'}
          </span>
        </button>

        {/* Refresh Button */}
        <button
          type="button"
          className={`action-btn icon-only-btn refresh-action-btn ${isRefreshing ? 'refreshing' : ''}`}
          onClick={refreshWeather}
          disabled={isRefreshing}
          title="Refresh Live Weather Data"
          aria-label="Refresh Weather Data"
        >
          <RotateCw size={17} className={`action-icon ${isRefreshing ? 'spin' : ''}`} />
        </button>

        {/* Theme Toggle */}
        <button
          type="button"
          className="action-btn icon-only-btn theme-toggle-btn"
          onClick={toggleTheme}
          title={settings.theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          aria-label="Toggle Theme"
        >
          {settings.theme === 'dark' ? (
            <Moon size={17} className="action-icon moon" />
          ) : (
            <Sun size={17} className="action-icon sun" />
          )}
        </button>
      </div>
    </header>
  );
}
