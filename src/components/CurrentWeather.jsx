import { MapPin, RotateCw } from 'lucide-react';
import WeatherStats from './WeatherStats';
import WeatherVisual from './WeatherVisual';

export default function CurrentWeather({ weatherData, onRefresh, isRefreshing }) {
  if (!weatherData) return null;

  const {
    city,
    country,
    date,
    temperature,
    condition,
    high,
    low,
    windSpeed,
    windDirection,
    humidity,
    pressure,
    feelsLike
  } = weatherData;

  return (
    <div className="current-weather-card">
      {/* Background visual atmospheric effect */}
      <WeatherVisual
        condition={condition}
        isNight={weatherData.isNight}
        icon={weatherData.icon}
        conditionCode={weatherData.conditionCode}
      />

      {/* Foreground Content */}
      <div className="current-weather-content">
        {/* Top Header: Location, Date, and Refresh button */}
        <div className="current-weather-header">
          <div className="location-date-group">
            <div className="location-badge">
              <MapPin size={18} className="location-pin-icon" />
              <h2 className="location-title">
                {city}{country ? `, ${country}` : ''}
              </h2>
            </div>
            <p className="current-date">{date}</p>
          </div>

          <button
            type="button"
            className={`refresh-btn ${isRefreshing ? 'refreshing' : ''}`}
            onClick={onRefresh}
            title="Refresh weather data"
            aria-label="Refresh weather data"
          >
            <RotateCw size={18} className="refresh-icon" />
          </button>
        </div>

        {/* Middle Section: Temp & Conditions */}
        <div className="current-temp-section">
          <div className="temp-display">
            <div className="temp-number-wrapper">
              <span className="temp-number">{temperature}</span>
              <span className="temp-unit">°C</span>
            </div>
            <div className="condition-text">{condition}</div>
            <div className="temp-high-low">
              <span>H: {high}°</span>
              <span className="separator"></span>
              <span>L: {low}°</span>
            </div>
          </div>
        </div>

        {/* Bottom Section: 4 Metrics */}
        <WeatherStats
          windSpeed={windSpeed}
          windDirection={windDirection}
          humidity={humidity}
          pressure={pressure}
          feelsLike={feelsLike}
        />
      </div>
    </div>
  );
}
