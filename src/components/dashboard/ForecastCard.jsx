import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import WeatherIcon from '../common/WeatherIcon';
import { useWeather } from '../../context/WeatherContext';
import { convertTemperature } from '../../utils/formatters';

export default function ForecastCard() {
  const { weather, settings } = useWeather();
  if (!weather || !weather.fiveDayForecast) return null;

  return (
    <div className="forecast-card">
      <div className="forecast-card-header">
        <h2 className="card-title">5 Day Forecast</h2>
        <Link to="/forecast" className="forecast-more-link" title="View detailed 5-day forecast">
          <span>Details</span>
          <ArrowRight size={14} />
        </Link>
      </div>

      <div className="forecast-list">
        {weather.fiveDayForecast.map((item, index) => {
          const high = convertTemperature(item.high, settings.tempUnit);
          const low = convertTemperature(item.low, settings.tempUnit);

          return (
            <div key={`${item.day}-${index}`} className="forecast-item">
              <span className="forecast-day">{item.day}</span>
              <div className="forecast-icon-wrapper">
                <WeatherIcon condition={item.condition} icon={item.icon} isNight={item.isNight} size={22} />
              </div>
              <div className="forecast-temps">
                <span className="temp-high">{high}°</span>
                <span className="temp-low">{low}°</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
