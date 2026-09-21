import WeatherIcon from './WeatherIcon';
import TemperatureGraph from './TemperatureGraph';

export default function HourlyForecast({ hourlyData = [] }) {
  return (
    <div className="hourly-forecast-card">
      <h3 className="card-title">Hourly Forecast</h3>
      
      <div className="hourly-content-container">
        {/* Row of hourly weather items */}
        <div className="hourly-items-row">
          {hourlyData.map((item, index) => (
            <div key={`hour-${index}`} className="hourly-col">
              <span className="hourly-time">{item.time}</span>
              <div className="hourly-icon-wrapper">
                <WeatherIcon condition={item.condition} size={22} />
              </div>
              <span className="hourly-temp">{item.temp}°</span>
            </div>
          ))}
        </div>

        {/* Temperature Spline Chart */}
        <TemperatureGraph hourlyData={hourlyData} />
      </div>
    </div>
  );
}
