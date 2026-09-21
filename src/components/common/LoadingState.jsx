export default function LoadingState({ type = 'dashboard' }) {
  if (type === 'cards') {
    return (
      <div className="skeleton-grid-cards">
        {[1, 2, 3, 4, 5, 6].map((n) => (
          <div key={n} className="skeleton-item-card">
            <div className="skeleton-line w-40 h-5 mb-3"></div>
            <div className="skeleton-line w-20 h-10 mb-4"></div>
            <div className="skeleton-line w-full h-4 mb-2"></div>
            <div className="skeleton-line w-3/4 h-4"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="skeleton-dashboard-wrapper" aria-label="Loading weather data">
      <div className="skeleton-top-grid">
        <div className="skeleton-hero-card">
          <div className="skeleton-line w-48 h-6 mb-2"></div>
          <div className="skeleton-line w-32 h-4 mb-6"></div>
          <div className="skeleton-line w-36 h-20 mb-4"></div>
          <div className="skeleton-line w-28 h-6 mb-8"></div>
          <div className="skeleton-metrics-row">
            <div className="skeleton-metric-pill"></div>
            <div className="skeleton-metric-pill"></div>
            <div className="skeleton-metric-pill"></div>
            <div className="skeleton-metric-pill"></div>
          </div>
        </div>

        <div className="skeleton-forecast-panel">
          <div className="skeleton-line w-36 h-6 mb-4"></div>
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="skeleton-forecast-pill mb-2"></div>
          ))}
        </div>
      </div>

      <div className="skeleton-bottom-panel">
        <div className="skeleton-line w-40 h-6 mb-4"></div>
        <div className="skeleton-chart-box"></div>
      </div>
    </div>
  );
}
