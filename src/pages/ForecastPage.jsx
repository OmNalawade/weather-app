import { useState } from 'react';
import {
  CalendarDays,
  Droplets,
  Wind,
  Gauge,
  Cloud,
  Sunrise,
  Sunset,
  CloudRain,
  CheckCircle2
} from 'lucide-react';
import { useWeather } from '../context/WeatherContext';
import WeatherIcon from '../components/common/WeatherIcon';
import LoadingState from '../components/common/LoadingState';
import ErrorState from '../components/common/ErrorState';
import EmptyState from '../components/common/EmptyState';
import {
  formatTemperature,
  convertWindSpeed
} from '../utils/formatters';

export default function ForecastPage() {
  const { weather, isLoading, error, refreshWeather, settings } = useWeather();
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);

  if (isLoading) {
    return <LoadingState type="dashboard" />;
  }

  if (error) {
    return <ErrorState error={error} onRetry={refreshWeather} />;
  }

  if (!weather || !weather.fiveDayForecast || weather.fiveDayForecast.length === 0) {
    return <EmptyState />;
  }

  const days = weather.fiveDayForecast;
  const selectedDay = days[selectedDayIndex] || days[0];

  const high = formatTemperature(selectedDay.high, settings.tempUnit);
  const low = formatTemperature(selectedDay.low, settings.tempUnit);
  const windVal = `${convertWindSpeed(selectedDay.windSpeedKmh, settings.windUnit)} ${settings.windUnit === 'mph' ? 'mph' : 'km/h'}`;

  return (
    <div className="forecast-page-container">
      <div className="page-header-row">
        <div className="page-title-group">
          <div className="page-title-badge">
            <CalendarDays size={20} />
          </div>
          <div>
            <h1 className="page-main-title">5-Day Extended Forecast</h1>
            <p className="page-subtitle">
              Detailed multi-day meteorological forecast for {weather.city}, {weather.country}
            </p>
          </div>
        </div>
      </div>

      {/* 5 Day Selection Cards Grid */}
      <div className="forecast-days-grid">
        {days.map((item, idx) => {
          const isSelected = idx === selectedDayIndex;
          const dayHigh = formatTemperature(item.high, settings.tempUnit);
          const dayLow = formatTemperature(item.low, settings.tempUnit);

          return (
            <div
              key={item.dateKey || idx}
              className={`forecast-day-card ${isSelected ? 'selected' : ''}`}
              onClick={() => setSelectedDayIndex(idx)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && setSelectedDayIndex(idx)}
            >
              <div className="forecast-card-top">
                <span className="forecast-card-day">{item.day}</span>
                {isSelected && <CheckCircle2 size={16} className="selected-indicator" />}
              </div>

              <div className="forecast-card-icon">
                <WeatherIcon condition={item.condition} icon={item.icon} isNight={item.isNight} size={32} />
              </div>

              <div className="forecast-card-condition">{item.condition}</div>

              <div className="forecast-card-temps">
                <span className="temp-h">{dayHigh}</span>
                <span className="temp-l">{dayLow}</span>
              </div>

              {item.precipitationChance > 0 && (
                <div className="forecast-card-rain">
                  <CloudRain size={12} />
                  <span>{item.precipitationChance}% rain</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Selected Day Detailed Breakdown Panel */}
      <div className="forecast-detail-panel">
        <div className="panel-header">
          <div>
            <span className="panel-tag">Selected Day Breakdown</span>
            <h2 className="panel-title">
              {selectedDay.day} — {selectedDay.fullDate || selectedDay.dateKey}
            </h2>
          </div>
          <div className="panel-summary-badge">
            <WeatherIcon condition={selectedDay.condition} icon={selectedDay.icon} isNight={selectedDay.isNight} size={24} />
            <span>{selectedDay.description || selectedDay.condition}</span>
          </div>
        </div>

        <div className="forecast-metrics-grid">
          <div className="metric-box">
            <div className="metric-box-header">
              <span className="metric-label">High / Low Range</span>
            </div>
            <div className="metric-box-val">
              <span className="high-text">{high}</span>
              <span className="range-slash">/</span>
              <span className="low-text">{low}</span>
            </div>
            <span className="metric-box-sub">Diurnal temperature spread</span>
          </div>

          <div className="metric-box">
            <div className="metric-box-header">
              <span className="metric-label">Precipitation Chance</span>
              <CloudRain size={16} className="text-sky-400" />
            </div>
            <div className="metric-box-val">{selectedDay.precipitationChance}%</div>
            <span className="metric-box-sub">Probability of rainfall</span>
          </div>

          <div className="metric-box">
            <div className="metric-box-header">
              <span className="metric-label">Humidity</span>
              <Droplets size={16} className="text-blue-400" />
            </div>
            <div className="metric-box-val">{selectedDay.humidity}%</div>
            <span className="metric-box-sub">Average relative humidity</span>
          </div>

          <div className="metric-box">
            <div className="metric-box-header">
              <span className="metric-label">Average Wind</span>
              <Wind size={16} className="text-teal-400" />
            </div>
            <div className="metric-box-val">{windVal}</div>
            <span className="metric-box-sub">Forecasted wind velocity</span>
          </div>

          <div className="metric-box">
            <div className="metric-box-header">
              <span className="metric-label">Barometric Pressure</span>
              <Gauge size={16} className="text-indigo-400" />
            </div>
            <div className="metric-box-val">{selectedDay.pressure} hPa</div>
            <span className="metric-box-sub">Sea-level atmospheric pressure</span>
          </div>

          <div className="metric-box">
            <div className="metric-box-header">
              <span className="metric-label">Cloud Coverage</span>
              <Cloud size={16} className="text-slate-300" />
            </div>
            <div className="metric-box-val">{selectedDay.cloudiness}%</div>
            <span className="metric-box-sub">Sky cloud obscuration</span>
          </div>

          <div className="metric-box">
            <div className="metric-box-header">
              <span className="metric-label">Sunrise</span>
              <Sunrise size={16} className="text-amber-400" />
            </div>
            <div className="metric-box-val">{weather.sunrise || '--'}</div>
            <span className="metric-box-sub">Morning twilight</span>
          </div>

          <div className="metric-box">
            <div className="metric-box-header">
              <span className="metric-label">Sunset</span>
              <Sunset size={16} className="text-orange-400" />
            </div>
            <div className="metric-box-val">{weather.sunset || '--'}</div>
            <span className="metric-box-sub">Evening dusk</span>
          </div>
        </div>
      </div>
    </div>
  );
}
