import { Wind, Droplets, Gauge, Thermometer } from 'lucide-react';

/**
 * Bottom 4 weather stats: Wind, Humidity, Pressure, Feels Like
 */
export default function WeatherStats({ windSpeed, windDirection, humidity, pressure, feelsLike }) {
  const stats = [
    {
      id: 'wind',
      icon: Wind,
      label: 'Wind',
      value: windSpeed || '14 km/h',
      sublabel: windDirection || 'NE'
    },
    {
      id: 'humidity',
      icon: Droplets,
      label: 'Humidity',
      value: humidity || '65%',
      sublabel: null
    },
    {
      id: 'pressure',
      icon: Gauge,
      label: 'Pressure',
      value: pressure || '1012 hPa',
      sublabel: null
    },
    {
      id: 'feelsLike',
      icon: Thermometer,
      label: 'Feels Like',
      value: feelsLike || '30°C',
      sublabel: null
    }
  ];

  return (
    <div className="weather-stats-grid">
      {stats.map((item) => {
        const IconComponent = item.icon;
        return (
          <div key={item.id} className="stat-item">
            <div className="stat-icon-wrapper">
              <IconComponent className="stat-icon" size={20} strokeWidth={2} />
            </div>
            <div className="stat-details">
              <span className="stat-label">{item.label}</span>
              <div className="stat-value-row">
                <span className="stat-value">{item.value}</span>
              </div>
              {item.sublabel && <span className="stat-sublabel">{item.sublabel}</span>}
            </div>
          </div>
        );
      })}
    </div>
  );
}
