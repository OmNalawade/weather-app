import ForecastItem from './ForecastItem';

export default function Forecast({ forecast = [] }) {
  return (
    <div className="forecast-card">
      <h3 className="card-title">5 Day Forecast</h3>
      <div className="forecast-list">
        {forecast.map((item, index) => (
          <ForecastItem
            key={`${item.day}-${index}`}
            day={item.day}
            condition={item.condition}
            high={item.high}
            low={item.low}
          />
        ))}
      </div>
    </div>
  );
}
