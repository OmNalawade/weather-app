import { useState } from 'react';
import {
  Clock,
  Droplets,
  Wind,
  Cloud,
  CloudRain,
  Compass,
  Gauge
} from 'lucide-react';
import { useWeather } from '../context/WeatherContext';
import WeatherIcon from '../components/common/WeatherIcon';
import LoadingState from '../components/common/LoadingState';
import ErrorState from '../components/common/ErrorState';
import EmptyState from '../components/common/EmptyState';
import {
  convertTemperature,
  formatTemperature,
  convertWindSpeed
} from '../utils/formatters';

export default function HourlyPage() {
  const { weather, isLoading, error, refreshWeather, settings } = useWeather();
  const [activeHourIndex, setActiveHourIndex] = useState(0);

  if (isLoading) {
    return <LoadingState type="dashboard" />;
  }

  if (error) {
    return <ErrorState error={error} onRetry={refreshWeather} />;
  }

  if (!weather || !weather.hourlyForecast || weather.hourlyForecast.length === 0) {
    return <EmptyState />;
  }

  const hours = weather.hourlyForecast;
  const activeHour = hours[activeHourIndex] || hours[0];

  // Chart data
  const convertedTemps = hours.map((h) => convertTemperature(h.temp, settings.tempUnit));
  const minTemp = Math.min(...convertedTemps);
  const maxTemp = Math.max(...convertedTemps);
  const tempRange = Math.max(maxTemp - minTemp, 1);

  const svgWidth = 1000;
  const svgHeight = 160;
  const paddingTop = 36;
  const paddingBottom = 40;

  const points = hours.map((item, index) => {
    const x = ((index + 0.5) / hours.length) * svgWidth;
    const val = convertedTemps[index];
    const normalized = (val - minTemp) / tempRange;
    const y = svgHeight - paddingBottom - normalized * (svgHeight - paddingTop - paddingBottom);
    return { x, y, temp: val, item };
  });

  const getSplinePath = (pts) => {
    if (pts.length === 0) return '';
    if (pts.length === 1) return `M ${pts[0].x} ${pts[0].y}`;

    let path = `M ${pts[0].x} ${pts[0].y}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = i > 0 ? pts[i - 1] : pts[i];
      const p1 = pts[i];
      const p2 = pts[i + 1];
      const p3 = i !== pts.length - 2 ? pts[i + 2] : p2;

      const cp1x = p1.x + (p2.x - p0.x) / 6;
      const cp1y = p1.y + (p2.y - p0.y) / 6;
      const cp2x = p2.x - (p3.x - p1.x) / 6;
      const cp2y = p2.y - (p3.y - p1.y) / 6;

      path += ` C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;
    }
    return path;
  };

  const linePath = getSplinePath(points);
  const fillAreaPath = `${linePath} L ${points[points.length - 1].x} ${svgHeight} L ${points[0].x} ${svgHeight} Z`;

  return (
    <div className="hourly-page-container">
      {/* Header */}
      <div className="page-header-row">
        <div className="page-title-group">
          <div className="page-title-badge">
            <Clock size={20} />
          </div>
          <div>
            <h1 className="page-main-title">24-Hour Weather Outlook</h1>
            <p className="page-subtitle">
              Continuous atmospheric timeline and trend analysis for {weather.city}, {weather.country}
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Temperature Spline Chart Panel */}
      <div className="hourly-chart-panel">
        <div className="chart-panel-header">
          <div>
            <span className="chart-tag">Interactive Temperature Spline</span>
            <h2 className="chart-headline">Thermal Progression</h2>
          </div>
          <div className="chart-legend">
            <span className="legend-dot"></span>
            <span>Temperature (°{settings.tempUnit === 'fahrenheit' ? 'F' : 'C'})</span>
          </div>
        </div>

        <div className="interactive-chart-viewport">
          <svg
            viewBox={`0 0 ${svgWidth} ${svgHeight}`}
            className="hourly-full-svg"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="fullHourlyGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.28" />
                <stop offset="50%" stopColor="#2563eb" stopOpacity="0.12" />
                <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0" />
              </linearGradient>

              <filter id="fullLineGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#38bdf8" floodOpacity="0.7" />
              </filter>
            </defs>

            {/* Area Fill */}
            <path d={fillAreaPath} fill="url(#fullHourlyGrad)" />

            {/* Glowing Line */}
            <path
              d={linePath}
              fill="none"
              stroke="#60a5fa"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#fullLineGlow)"
            />

            {/* Time labels and interactive nodes */}
            {points.map((pt, idx) => {
              const isActive = idx === activeHourIndex;
              return (
                <g
                  key={`pt-${idx}`}
                  className="chart-point-group"
                  onClick={() => setActiveHourIndex(idx)}
                  style={{ cursor: 'pointer' }}
                >
                  {/* Vertical guide line on active */}
                  {isActive && (
                    <line
                      x1={pt.x}
                      y1={0}
                      x2={pt.x}
                      y2={svgHeight}
                      stroke="rgba(56, 189, 248, 0.4)"
                      strokeDasharray="4 3"
                    />
                  )}

                  {/* Temp label text */}
                  <text
                    x={pt.x}
                    y={pt.y - 12}
                    textAnchor="middle"
                    fill={isActive ? '#ffffff' : '#94a3b8'}
                    fontSize="13"
                    fontWeight="700"
                  >
                    {pt.temp}°
                  </text>

                  {/* Outer circle */}
                  <circle
                    cx={pt.x}
                    cy={pt.y}
                    r={isActive ? 8 : 5}
                    fill="#38bdf8"
                    fillOpacity={isActive ? 0.4 : 0.2}
                  />

                  {/* Inner node */}
                  <circle
                    cx={pt.x}
                    cy={pt.y}
                    r={isActive ? 5 : 3.5}
                    fill="#ffffff"
                    stroke="#2563eb"
                    strokeWidth="2"
                  />
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      {/* Detailed Hourly Cards List */}
      <div className="hourly-items-grid">
        {hours.map((hourItem, idx) => {
          const isSelected = idx === activeHourIndex;
          const tempVal = formatTemperature(hourItem.temp, settings.tempUnit);
          const feelsVal = formatTemperature(hourItem.feelsLike, settings.tempUnit);
          const windVal = `${convertWindSpeed(hourItem.windSpeedKmh, settings.windUnit)} ${settings.windUnit === 'mph' ? 'mph' : 'km/h'}`;

          return (
            <div
              key={hourItem.dt || idx}
              className={`hourly-row-card ${isSelected ? 'selected' : ''}`}
              onClick={() => setActiveHourIndex(idx)}
            >
              <div className="hour-col-time">
                <span className="hour-pill-time">{hourItem.time}</span>
                <span className="hour-pill-date">{hourItem.fullTime}</span>
              </div>

              <div className="hour-col-condition">
                <WeatherIcon condition={hourItem.condition} icon={hourItem.icon} isNight={hourItem.isNight} size={28} />
                <div className="hour-condition-text">
                  <span className="condition-primary">{hourItem.condition}</span>
                  <span className="condition-desc">{hourItem.description}</span>
                </div>
              </div>

              <div className="hour-col-temp">
                <span className="hour-main-temp">{tempVal}</span>
                <span className="hour-feels">Feels {feelsVal}</span>
              </div>

              <div className="hour-metrics-cluster">
                <div className="cluster-stat">
                  <Droplets size={14} className="text-sky-400" />
                  <span>{hourItem.humidity}%</span>
                </div>
                <div className="cluster-stat">
                  <Wind size={14} className="text-teal-400" />
                  <span>{windVal} ({hourItem.windDirection})</span>
                </div>
                <div className="cluster-stat">
                  <Cloud size={14} className="text-slate-300" />
                  <span>{hourItem.cloudiness}%</span>
                </div>
                {hourItem.precipitationChance > 0 && (
                  <div className="cluster-stat rain-chance">
                    <CloudRain size={14} className="text-blue-400" />
                    <span>{hourItem.precipitationChance}% ({hourItem.rainVolumeMm}mm)</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Active Hour Snapshot Card */}
      {activeHour && (
        <div className="hour-snapshot-footer">
          <div className="snapshot-header">
            <h3>Hour Focus: {activeHour.fullTime}</h3>
            <span className="snapshot-condition">{activeHour.description}</span>
          </div>

          <div className="snapshot-grid">
            <div className="snapshot-cell">
              <span className="cell-label">Wind Direction</span>
              <div className="cell-val">
                <Compass size={16} />
                <span>{activeHour.windDirection}</span>
              </div>
            </div>
            <div className="snapshot-cell">
              <span className="cell-label">Barometric Pressure</span>
              <div className="cell-val">
                <Gauge size={16} />
                <span>{activeHour.pressure} hPa</span>
              </div>
            </div>
            <div className="snapshot-cell">
              <span className="cell-label">Rain Volume</span>
              <div className="cell-val">
                <CloudRain size={16} />
                <span>{activeHour.rainVolumeMm} mm / 3h</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
