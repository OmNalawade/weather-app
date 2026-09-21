import { useNavigate } from 'react-router-dom';
import { MapPin, Wind, Droplets, ArrowUpRight } from 'lucide-react';
import WeatherIcon from '../common/WeatherIcon';
import { useWeather } from '../../context/WeatherContext';
import {
  formatTemperature,
  convertWindSpeed
} from '../../utils/formatters';

export default function CityCard({ data, isSelected }) {
  const navigate = useNavigate();
  const { searchCity, settings } = useWeather();
  if (!data) return null;

  const temp = formatTemperature(data.temperature, settings.tempUnit);
  const high = formatTemperature(data.high, settings.tempUnit);
  const low = formatTemperature(data.low, settings.tempUnit);
  const windVal = `${convertWindSpeed(data.windSpeedKmh, settings.windUnit)} ${settings.windUnit === 'mph' ? 'mph' : 'km/h'}`;

  const handleSelect = () => {
    searchCity(data.city);
    navigate('/');
  };

  return (
    <div
      className={`city-explorer-card ${isSelected ? 'active-selected' : ''}`}
      onClick={handleSelect}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && handleSelect()}
    >
      <div className="city-card-header">
        <div className="city-name-group">
          <div className="city-title-row">
            <MapPin size={16} className="city-pin-icon" />
            <h3 className="city-name">{data.city}</h3>
          </div>
          {data.country && <span className="city-country">{data.country}</span>}
        </div>

        <button
          type="button"
          className="city-view-btn"
          aria-label={`View weather for ${data.city}`}
        >
          <ArrowUpRight size={16} />
        </button>
      </div>

      <div className="city-card-body">
        <div className="city-temp-col">
          <span className="city-temp">{temp}</span>
          <span className="city-condition">{data.condition}</span>
          <div className="city-highlow">
            <span>H: {high}</span>
            <span>L: {low}</span>
          </div>
        </div>

        <div className="city-icon-box">
          <WeatherIcon condition={data.condition} icon={data.icon} isNight={data.isNight} size={36} />
        </div>
      </div>

      <div className="city-card-footer">
        <div className="city-stat">
          <Droplets size={14} className="stat-icon" />
          <span>{data.humidity}%</span>
        </div>
        <div className="city-stat">
          <Wind size={14} className="stat-icon" />
          <span>{windVal}</span>
        </div>
      </div>
    </div>
  );
}
