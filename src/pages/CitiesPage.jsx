import { useState, useEffect } from 'react';
import {
  Building2,
  Search,
  RotateCcw,
  Sparkles
} from 'lucide-react';
import CityCard from '../components/cities/CityCard';
import { useWeather } from '../context/WeatherContext';
import { searchCitySummary } from '../services/weatherService';

const DEFAULT_EXPLORE_CITIES = [
  'Pune',
  'Mumbai',
  'Delhi',
  'Bangalore',
  'Hyderabad',
  'Chennai'
];

export default function CitiesPage() {
  const { weather } = useWeather();
  const [citiesData, setCitiesData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchedCityData, setSearchedCityData] = useState(null);
  const [searchError, setSearchError] = useState(null);
  const [isSearching, setIsSearching] = useState(false);

  const loadCities = async () => {
    setIsLoading(true);
    const results = [];
    for (const city of DEFAULT_EXPLORE_CITIES) {
      try {
        const summary = await searchCitySummary(city);
        results.push(summary);
      } catch (err) {
        console.warn(`Could not load preview for ${city}:`, err.message);
      }
    }
    setCitiesData(results);
    setIsLoading(false);
  };

  useEffect(() => {
    let ignore = false;
    async function initCities() {
      const results = [];
      for (const city of DEFAULT_EXPLORE_CITIES) {
        try {
          const summary = await searchCitySummary(city);
          results.push(summary);
        } catch (err) {
          console.warn(`Could not load preview for ${city}:`, err.message);
        }
      }
      if (!ignore) {
        setCitiesData(results);
        setIsLoading(false);
      }
    }
    initCities();
    return () => {
      ignore = true;
    };
  }, []);

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    setSearchError(null);

    try {
      const summary = await searchCitySummary(searchQuery.trim());
      setSearchedCityData(summary);
      setSearchError(null);
    } catch (err) {
      setSearchError(err.message || 'City could not be found.');
      setSearchedCityData(null);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="cities-page-container">
      {/* Header */}
      <div className="page-header-row">
        <div className="page-title-group">
          <div className="page-title-badge">
            <Building2 size={20} />
          </div>
          <div>
            <h1 className="page-main-title">City Weather Explorer</h1>
            <p className="page-subtitle">
              Discover, compare, and monitor live meteorological conditions across major global metropolises
            </p>
          </div>
        </div>

        <button
          type="button"
          className="refresh-cities-btn"
          onClick={loadCities}
          disabled={isLoading}
          title="Reload Live City Weather"
        >
          <RotateCcw size={16} className={isLoading ? 'spin' : ''} />
          <span>Refresh All</span>
        </button>
      </div>

      {/* Global City Search Bar in Page */}
      <div className="cities-search-card">
        <form onSubmit={handleSearchSubmit} className="cities-search-form">
          <Search size={18} className="cities-search-icon" />
          <input
            type="text"
            className="cities-search-input"
            placeholder="Search any global city (e.g. London, Tokyo, San Francisco, Dubai)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="cities-search-btn" disabled={isSearching}>
            {isSearching ? 'Searching...' : 'Explore City'}
          </button>
        </form>

        {searchError && (
          <div className="cities-search-error">
            <span>{searchError}</span>
          </div>
        )}

        {searchedCityData && (
          <div className="searched-result-section">
            <div className="result-badge">
              <Sparkles size={14} />
              <span>Search Result</span>
            </div>
            <div className="cities-cards-grid">
              <CityCard
                data={searchedCityData}
                isSelected={weather?.city?.toLowerCase() === searchedCityData.city.toLowerCase()}
              />
            </div>
          </div>
        )}
      </div>

      {/* Featured / Popular Cities Section */}
      <div className="featured-cities-section">
        <div className="section-heading-row">
          <h2 className="section-title">Major Metropolises (Live Telemetry)</h2>
          <span className="section-meta">Click any city to view its full weather dashboard</span>
        </div>

        {isLoading ? (
          <div className="cities-skeleton-grid">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="city-skeleton-card">
                <div className="skeleton-line w-32 h-5 mb-3"></div>
                <div className="skeleton-line w-20 h-8 mb-4"></div>
                <div className="skeleton-line w-full h-4"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="cities-cards-grid">
            {citiesData.map((city) => (
              <CityCard
                key={city.city}
                data={city}
                isSelected={weather?.city?.toLowerCase() === city.city.toLowerCase()}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
