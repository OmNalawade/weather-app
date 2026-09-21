import WeatherIcon from './WeatherIcon';

export default function ForecastItem({ day, condition, high, low }) {
  return (
    <div className="forecast-item">
      <span className="forecast-day">{day}</span>
      <div className="forecast-icon-wrapper">
        <WeatherIcon condition={condition} size={22} />
      </div>
      <div className="forecast-temps">
        <span className="temp-high">{high}°</span>
        <span className="temp-low">{low}°</span>
      </div>
    </div>
  );
}
