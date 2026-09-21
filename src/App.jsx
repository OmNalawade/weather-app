import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { WeatherProvider } from './context/WeatherProvider';
import AppLayout from './components/layout/AppLayout';
import DashboardPage from './pages/DashboardPage';
import ForecastPage from './pages/ForecastPage';
import HourlyPage from './pages/HourlyPage';
import MapPage from './pages/MapPage';
import CitiesPage from './pages/CitiesPage';
import SettingsPage from './pages/SettingsPage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  return (
    <WeatherProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<DashboardPage />} />
            <Route path="forecast" element={<ForecastPage />} />
            <Route path="hourly" element={<HourlyPage />} />
            <Route path="map" element={<MapPage />} />
            <Route path="cities" element={<CitiesPage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </WeatherProvider>
  );
}
