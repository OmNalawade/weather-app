import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  CalendarDays,
  Clock,
  Map,
  Building2,
  Settings
} from 'lucide-react';

const NAV_ITEMS = [
  { path: '/', label: 'Home', icon: LayoutDashboard },
  { path: '/forecast', label: 'Forecast', icon: CalendarDays },
  { path: '/hourly', label: 'Hourly', icon: Clock },
  { path: '/map', label: 'Map', icon: Map },
  { path: '/cities', label: 'Cities', icon: Building2 },
  { path: '/settings', label: 'Settings', icon: Settings }
];

export default function MobileNav() {
  return (
    <nav className="mobile-nav-bar" aria-label="Mobile Navigation">
      {NAV_ITEMS.map((item) => {
        const Icon = item.icon;
        return (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/'}
            className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
          >
            <Icon size={18} className="mobile-nav-icon" />
            <span className="mobile-nav-label">{item.label}</span>
          </NavLink>
        );
      })}
    </nav>
  );
}
