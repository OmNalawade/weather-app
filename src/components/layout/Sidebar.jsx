import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  CalendarDays,
  Clock,
  Map,
  Building2,
  Settings,
  Cloud
} from 'lucide-react';

const NAV_ITEMS = [
  { path: '/', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/forecast', label: 'Forecast', icon: CalendarDays },
  { path: '/hourly', label: 'Hourly', icon: Clock },
  { path: '/map', label: 'Weather Map', icon: Map },
  { path: '/cities', label: 'Cities', icon: Building2 },
  { path: '/settings', label: 'Settings', icon: Settings }
];

export default function Sidebar() {
  return (
    <aside className="app-sidebar" aria-label="Main Navigation">
      {/* Brand Header */}
      <div className="sidebar-brand">
        <div className="sidebar-logo-box">
          <Cloud className="sidebar-logo-icon" size={24} />
        </div>
        <div className="sidebar-brand-text">
          <span className="brand-name">Weather</span>
          <span className="brand-tag">Live Platform</span>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="sidebar-nav">
        <ul className="sidebar-menu">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.path} className="sidebar-item">
                <NavLink
                  to={item.path}
                  end={item.path === '/'}
                  className={({ isActive }) =>
                    `sidebar-link ${isActive ? 'active' : ''}`
                  }
                >
                  <Icon size={20} className="sidebar-link-icon" />
                  <span className="sidebar-link-label">{item.label}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Sidebar Footer */}
      <div className="sidebar-footer">
        <div className="api-badge">
          <span className="api-pulse-dot"></span>
          <span className="api-badge-text">OpenWeather Live</span>
        </div>
      </div>
    </aside>
  );
}
