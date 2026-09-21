import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import MobileNav from './MobileNav';
import { useWeather } from '../../context/WeatherContext';

export default function AppLayout() {
  const { toastMessage } = useWeather();

  return (
    <div className="app-shell">
      {/* Toast Notification Alert */}
      {toastMessage && (
        <div className="global-toast" role="status" aria-live="polite">
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Persistent Desktop Sidebar */}
      <Sidebar />

      {/* Main Application Area */}
      <div className="app-main-wrapper">
        <Header />
        
        <main className="app-page-container">
          <Outlet />
        </main>

        {/* Mobile Navigation Bar */}
        <MobileNav />
      </div>
    </div>
  );
}
