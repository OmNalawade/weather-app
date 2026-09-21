import {
  Droplets,
  Wind,
  Compass,
  Gauge,
  Eye,
  Cloud,
  Sunrise,
  Sunset
} from 'lucide-react';
import { useWeather } from '../../context/WeatherContext';
import {
  convertWindSpeed,
  formatVisibility
} from '../../utils/formatters';

export default function WeatherDetails() {
  const { weather, settings } = useWeather();
  if (!weather) return null;

  const windSpeed = convertWindSpeed(weather.windSpeedKmh, settings.windUnit);
  const windUnit = settings.windUnit === 'mph' ? 'mph' : 'km/h';
  const visibility = formatVisibility(weather.visibilityMeters, settings.tempUnit);

  const detailItems = [
    {
      id: 'humidity',
      label: 'Humidity',
      value: `${weather.humidity}%`,
      sub: weather.humidity > 70 ? 'High moisture' : weather.humidity < 35 ? 'Dry air' : 'Comfortable',
      icon: Droplets,
      color: 'text-sky-400'
    },
    {
      id: 'wind',
      label: 'Wind Speed',
      value: `${windSpeed} ${windUnit}`,
      sub: `${weather.windDirection} (${weather.windDeg || 0}°)`,
      icon: Wind,
      color: 'text-teal-400'
    },
    {
      id: 'pressure',
      label: 'Pressure',
      value: `${weather.pressure} hPa`,
      sub: weather.pressure >= 1013 ? 'Normal/High' : 'Low pressure',
      icon: Gauge,
      color: 'text-blue-400'
    },
    {
      id: 'visibility',
      label: 'Visibility',
      value: visibility,
      sub: weather.visibilityMeters >= 10000 ? 'Clear distance' : 'Reduced visibility',
      icon: Eye,
      color: 'text-indigo-400'
    },
    {
      id: 'cloudiness',
      label: 'Cloud Cover',
      value: `${weather.cloudiness}%`,
      sub: weather.cloudiness > 75 ? 'Overcast' : weather.cloudiness > 25 ? 'Partly cloudy' : 'Clear sky',
      icon: Cloud,
      color: 'text-slate-300'
    },
    {
      id: 'direction',
      label: 'Wind Direction',
      value: weather.windDirection,
      sub: `Angle: ${weather.windDeg ?? 0}°`,
      icon: Compass,
      color: 'text-cyan-400'
    },
    {
      id: 'sunrise',
      label: 'Sunrise',
      value: weather.sunrise || '--',
      sub: 'Dawn',
      icon: Sunrise,
      color: 'text-amber-400'
    },
    {
      id: 'sunset',
      label: 'Sunset',
      value: weather.sunset || '--',
      sub: 'Dusk',
      icon: Sunset,
      color: 'text-orange-400'
    }
  ];

  return (
    <div className="weather-details-section">
      <h2 className="section-title">Atmospheric Highlights</h2>
      <div className="details-grid">
        {detailItems.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.id} className="detail-card">
              <div className="detail-card-top">
                <span className="detail-card-label">{item.label}</span>
                <div className={`detail-card-icon ${item.color}`}>
                  <Icon size={18} strokeWidth={2} />
                </div>
              </div>
              <div className="detail-card-value">{item.value}</div>
              <span className="detail-card-sub">{item.sub}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
