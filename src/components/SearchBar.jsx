import { useState, useRef, useEffect } from 'react';
import { Search } from 'lucide-react';
import { getCitySuggestions } from '../services/weatherService';

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);

  // Derived suggestions based on query
  const suggestions = getCitySuggestions(query);

  // Handle outside click to close suggestions
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
      onSearch(query.trim());
      setIsOpen(false);
    }
  };

  const handleSelectCity = (cityName) => {
    setQuery(cityName);
    onSearch(cityName);
    setIsOpen(false);
  };

  return (
    <div className="search-bar-wrapper" ref={wrapperRef}>
      <form onSubmit={handleSubmit} className="search-form">
        <Search className="search-icon" size={17} />
        <input
          type="text"
          className="search-input"
          placeholder="Search city..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          aria-label="Search city"
          autoComplete="off"
        />
      </form>

      {/* Suggestion Dropdown */}
      {isOpen && suggestions.length > 0 && (
        <ul className="search-suggestions-list">
          {suggestions.map((city) => (
            <li
              key={city}
              className="suggestion-item"
              onMouseDown={() => handleSelectCity(city)}
            >
              <Search size={14} className="suggestion-icon" />
              <span>{city}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
