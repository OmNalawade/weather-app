import { Link } from 'react-router-dom';
import { ArrowRight, Droplets } from 'lucide-react';
import WeatherIcon from '../common/WeatherIcon';
import { useWeather } from '../../context/WeatherContext';
import { convertTemperature } from '../../utils/formatters';

export default function HourlyChart() {
  const { weather, settings } = useWeather();
  const hourlyData = weather?.hourlyForecast || [];
  if (hourlyData.length === 0) return null;

  // Display first 6 intervals on dashboard
  const displayItems = hourlyData.slice(0, 6);

  const convertedTemps = displayItems.map((item) =>
    convertTemperature(item.temp, settings.tempUnit)
  );

  const minTemp = Math.min(...convertedTemps);
  const maxTemp = Math.max(...convertedTemps);
  const tempRange = Math.max(maxTemp - minTemp, 1);

  const svgWidth = 1000;
  const svgHeight = 90;
  const paddingTop = 22;
  const paddingBottom = 26;

  const points = displayItems.map((item, index) => {
    const x = ((index + 0.5) / displayItems.length) * svgWidth;
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
    <div className="hourly-forecast-card">
      <div className="hourly-card-header">
        <h2 className="card-title">Hourly Forecast</h2>
        <Link to="/hourly" className="forecast-more-link" title="View 24-hour detailed breakdown">
          <span>24h Details</span>
          <ArrowRight size={14} />
        </Link>
      </div>

      <div className="hourly-content-container">
        <div className="hourly-items-row">
          {displayItems.map((item, index) => {
            const tempVal = convertedTemps[index];
            return (
              <div key={`hour-${index}`} className="hourly-col">
                <span className="hourly-time">{item.time}</span>
                <div className="hourly-icon-wrapper">
                  <WeatherIcon condition={item.condition} icon={item.icon} isNight={item.isNight} size={22} />
                </div>
                <span className="hourly-temp">{tempVal}°</span>
                {item.precipitationChance > 0 && (
                  <div className="hourly-pop-badge">
                    <Droplets size={10} className="pop-icon" />
                    <span>{item.precipitationChance}%</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Spline temperature line */}
        <div className="temperature-graph-wrapper">
          <svg
            viewBox={`0 0 ${svgWidth} ${svgHeight}`}
            className="temperature-graph-svg"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="dashboardCurveGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.22" />
                <stop offset="60%" stopColor="#38bdf8" stopOpacity="0.08" />
                <stop offset="100%" stopColor="#0284c7" stopOpacity="0" />
              </linearGradient>

              <filter id="dashboardLineGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="0" stdDeviation="2.5" floodColor="#38bdf8" floodOpacity="0.6" />
              </filter>
            </defs>

            <path d={fillAreaPath} fill="url(#dashboardCurveGrad)" />

            <path
              d={linePath}
              fill="none"
              stroke="#5b93d3"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#dashboardLineGlow)"
            />

            {points.map((pt, idx) => (
              <g key={`pt-${idx}`}>
                <circle cx={pt.x} cy={pt.y} r="6" fill="#60a5fa" fillOpacity="0.3" />
                <circle cx={pt.x} cy={pt.y} r="3.5" fill="#ffffff" stroke="#3b82f6" strokeWidth="2" />
              </g>
            ))}
          </svg>
        </div>
      </div>
    </div>
  );
}
