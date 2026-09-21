export default function Loading() {
  return (
    <div className="loading-skeleton-container" aria-label="Loading weather data">
      {/* Top 2 Columns */}
      <div className="main-weather-grid">
        {/* Current Weather Skeleton */}
        <div className="skeleton-card skeleton-current-card">
          <div className="skeleton-header">
            <div className="skeleton-line skeleton-title"></div>
            <div className="skeleton-line skeleton-subtitle"></div>
          </div>
          
          <div className="skeleton-middle">
            <div className="skeleton-temp"></div>
            <div className="skeleton-line skeleton-condition"></div>
            <div className="skeleton-line skeleton-minmax"></div>
          </div>

          <div className="skeleton-stats-row">
            <div className="skeleton-stat-block"></div>
            <div className="skeleton-stat-block"></div>
            <div className="skeleton-stat-block"></div>
            <div className="skeleton-stat-block"></div>
          </div>
        </div>

        {/* 5 Day Forecast Skeleton */}
        <div className="skeleton-card skeleton-forecast-card">
          <div className="skeleton-line skeleton-heading"></div>
          <div className="skeleton-forecast-list">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="skeleton-forecast-row"></div>
            ))}
          </div>
        </div>
      </div>

      {/* Hourly Forecast Skeleton */}
      <div className="skeleton-card skeleton-hourly-card">
        <div className="skeleton-line skeleton-heading"></div>
        <div className="skeleton-hourly-row">
          {[1, 2, 3, 4, 6].map((i) => (
            <div key={i} className="skeleton-hourly-item"></div>
          ))}
        </div>
        <div className="skeleton-graph-area"></div>
      </div>
    </div>
  );
}
