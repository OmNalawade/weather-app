import { MapPin, RotateCw } from 'lucide-react';
import WeatherVisual from '../common/WeatherVisual';
import { useWeather } from '../../context/WeatherContext';
import {
  convertTemperature,
  convertWindSpeed,
  formatTemperature
} from '../../utils/formatters';

export default function CurrentWeatherCard() {
  const { weather, refreshWeather, isRefreshing, settings } = useWeather();
  if (!weather) return null;

  const tempVal = convertTemperature(weather.temperature, settings.tempUnit);
  const feelsLikeVal = formatTemperature(weather.feelsLike, settings.tempUnit);
  const highVal = convertTemperature(weather.high, settings.tempUnit);
  const lowVal = convertTemperature(weather.low, settings.tempUnit);
  const windVal = convertWindSpeed(weather.windSpeedKmh, settings.windUnit);
  const windUnitLabel = settings.windUnit === 'mph' ? 'mph' : 'km/h';

  return (
    <div className="current-weather-card">
      <WeatherVisual
        condition={weather.condition}
        isNight={weather.isNight}
        icon={weather.icon}
        conditionCode={weather.conditionCode}
      />

      <div className="current-weather-content">
        {/* Header: Location & Refresh */}
        <div className="current-weather-header">
          <div className="location-date-group">
            <div className="location-badge">
              <MapPin size={18} className="location-pin-icon" />
              <h1 className="location-title">
                {weather.city}{weather.country ? `, ${weather.country}` : ''}
              </h1>
            </div>
            <p className="current-date">{weather.date}</p>
          </div>

          <button
            type="button"
            className={`refresh-btn ${isRefreshing ? 'refreshing' : ''}`}
            onClick={refreshWeather}
            title="Refresh weather data"
            aria-label="Refresh weather data"
          >
            <RotateCw size={17} className="refresh-icon" />
          </button>
        </div>

        {/* Middle: Large Temp & Condition */}
        <div className="current-temp-section">
          <div className="temp-display">
            <div className="temp-number-wrapper">
              <span className="temp-number">{tempVal}</span>
              <span className="temp-unit">°{settings.tempUnit === 'fahrenheit' ? 'F' : 'C'}</span>
            </div>
            <div className="condition-text">{weather.condition}</div>
            <div className="temp-high-low">
              <span>H: {highVal}°</span>
              <span className="separator"></span>
              <span>L: {lowVal}°</span>
            </div>
          </div>
        </div>

        {/* Quick Highlights Bar */}
        <div className="weather-stats-grid">
          <div className="stat-item">
            <div className="stat-details">
              <span className="stat-label">Wind</span>
              <div className="stat-value-row">
                <span className="stat-value">{windVal} {windUnitLabel}</span>
              </div>
              <span className="stat-sublabel">{weather.windDirection}</span>
            </div>
          </div>

          <div className="stat-item">
            <div className="stat-details">
              <span className="stat-label">Humidity</span>
              <div className="stat-value-row">
                <span className="stat-value">{weather.humidity}%</span>
              </div>
            </div>
          </div>

          <div className="stat-item">
            <div className="stat-details">
              <span className="stat-label">Pressure</span>
              <div className="stat-value-row">
                <span className="stat-value">{weather.pressure} hPa</span>
              </div>
            </div>
          </div>

          <div className="stat-item">
            <div className="stat-details">
              <span className="stat-label">Feels Like</span>
              <div className="stat-value-row">
                <span className="stat-value">{feelsLikeVal}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
