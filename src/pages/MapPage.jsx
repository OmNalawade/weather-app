import { Map as MapIcon } from 'lucide-react';
import WeatherMap from '../components/map/WeatherMap';
import { useWeather } from '../context/WeatherContext';

export default function MapPage() {
  const { weather } = useWeather();

  return (
    <div className="map-page-container">
      <div className="page-header-row">
        <div className="page-title-group">
          <div className="page-title-badge">
            <MapIcon size={20} />
          </div>
          <div>
            <h1 className="page-main-title">Interactive Weather Radar & Map</h1>
            <p className="page-subtitle">
              Live geographic atmospheric telemetry for {weather?.city || 'current location'}
            </p>
          </div>
        </div>
      </div>

      <WeatherMap />
    </div>
  );
}
