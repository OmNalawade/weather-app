import { Cloud, LocateFixed } from 'lucide-react';
import SearchBar from './SearchBar';
import ThemeToggle from './ThemeToggle';

export default function Header({
  onSearch,
  onUseCurrentLocation,
  isLocating,
  theme,
  onToggleTheme
}) {
  return (
    <header className="app-header">
      {/* LEFT: Logo & Title */}
      <div className="brand-group">
        <div className="brand-logo-icon">
          <Cloud size={24} className="cloud-logo-svg" />
        </div>
        <h1 className="brand-title">Weather</h1>
      </div>

      {/* CENTER: Search Bar */}
      <div className="header-search-container">
        <SearchBar onSearch={onSearch} />
      </div>

      {/* RIGHT: Current Location & Theme Toggle */}
      <div className="header-actions">
        <button
          type="button"
          className={`location-action-btn ${isLocating ? 'locating' : ''}`}
          onClick={onUseCurrentLocation}
          disabled={isLocating}
          title="Detect and use current location"
        >
          <LocateFixed size={16} className={`location-btn-icon ${isLocating ? 'spin' : ''}`} />
          <span className="location-btn-text">
            {isLocating ? 'Locating...' : 'Use Current Location'}
          </span>
        </button>

        <ThemeToggle theme={theme} onToggle={onToggleTheme} />
      </div>
    </header>
  );
}
