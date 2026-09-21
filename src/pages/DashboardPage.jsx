import { useWeather } from '../context/WeatherContext';
import CurrentWeatherCard from '../components/dashboard/CurrentWeatherCard';
import ForecastCard from '../components/dashboard/ForecastCard';
import HourlyChart from '../components/dashboard/HourlyChart';
import WeatherDetails from '../components/dashboard/WeatherDetails';
import LoadingState from '../components/common/LoadingState';
import ErrorState from '../components/common/ErrorState';
import EmptyState from '../components/common/EmptyState';

export default function DashboardPage() {
  const { weather, isLoading, error, refreshWeather } = useWeather();

  if (isLoading) {
    return <LoadingState type="dashboard" />;
  }

  if (error) {
    return <ErrorState error={error} onRetry={refreshWeather} />;
  }

  if (!weather) {
    return <EmptyState />;
  }

  return (
    <div className="dashboard-page">
      {/* Top 2 Columns: Hero Weather & 5-Day Forecast */}
      <div className="dashboard-hero-grid">
        <CurrentWeatherCard />
        <ForecastCard />
      </div>

      {/* Hourly Forecast & Spline Chart */}
      <HourlyChart />

      {/* Atmospheric Highlights Details */}
      <WeatherDetails />
    </div>
  );
}
