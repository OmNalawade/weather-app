import {
  Settings as SettingsIcon,
  Moon,
  Sun,
  Thermometer,
  Wind,
  ShieldCheck,
  RotateCcw
} from 'lucide-react';
import { useWeather } from '../context/WeatherContext';

export default function SettingsPage() {
  const { settings, updateSettings, showToast } = useWeather();

  const handleThemeChange = (newTheme) => {
    updateSettings({ theme: newTheme });
    showToast(`Switched to ${newTheme === 'dark' ? 'Dark' : 'Light'} theme`);
  };

  const handleTempUnitChange = (unit) => {
    updateSettings({ tempUnit: unit });
    showToast(`Temperature unit set to ${unit === 'celsius' ? 'Celsius (°C)' : 'Fahrenheit (°F)'}`);
  };

  const handleWindUnitChange = (unit) => {
    updateSettings({ windUnit: unit });
    showToast(`Wind speed unit set to ${unit === 'kmh' ? 'km/h' : 'mph'}`);
  };

  const handleResetDefaults = () => {
    updateSettings({
      tempUnit: 'celsius',
      windUnit: 'kmh',
      theme: 'dark'
    });
    showToast('Settings reset to default values.');
  };

  return (
    <div className="settings-page-container">
      {/* Header */}
      <div className="page-header-row">
        <div className="page-title-group">
          <div className="page-title-badge">
            <SettingsIcon size={20} />
          </div>
          <div>
            <h1 className="page-main-title">Preferences & Settings</h1>
            <p className="page-subtitle">
              Configure units, visual appearance, and application defaults
            </p>
          </div>
        </div>

        <button
          type="button"
          className="btn-reset-settings"
          onClick={handleResetDefaults}
          title="Reset to factory defaults"
        >
          <RotateCcw size={15} />
          <span>Reset Defaults</span>
        </button>
      </div>

      <div className="settings-sections-list">
        {/* Section 1: Appearance Theme */}
        <div className="settings-group-card">
          <div className="group-header">
            <div className="group-header-text">
              <h2 className="group-title">Theme & Appearance</h2>
              <p className="group-desc">
                Select your preferred color scheme for the application interface
              </p>
            </div>
          </div>

          <div className="settings-options-grid">
            <button
              type="button"
              className={`setting-choice-card ${settings.theme === 'dark' ? 'active' : ''}`}
              onClick={() => handleThemeChange('dark')}
            >
              <div className="choice-icon-box dark-icon">
                <Moon size={22} />
              </div>
              <div className="choice-text">
                <span className="choice-title">Dark Mode</span>
                <span className="choice-desc">Deep obsidian navy with glowing atmospheric accents</span>
              </div>
              <div className="choice-radio">
                <div className="radio-inner"></div>
              </div>
            </button>

            <button
              type="button"
              className={`setting-choice-card ${settings.theme === 'light' ? 'active' : ''}`}
              onClick={() => handleThemeChange('light')}
            >
              <div className="choice-icon-box light-icon">
                <Sun size={22} />
              </div>
              <div className="choice-text">
                <span className="choice-title">Light Mode</span>
                <span className="choice-desc">Crisp slate gray with clean high-contrast typography</span>
              </div>
              <div className="choice-radio">
                <div className="radio-inner"></div>
              </div>
            </button>
          </div>
        </div>

        {/* Section 2: Temperature Scale */}
        <div className="settings-group-card">
          <div className="group-header">
            <div className="group-header-text">
              <h2 className="group-title">Temperature Unit</h2>
              <p className="group-desc">
                Standard unit used for all live temperatures, forecasts, and thermal graphs
              </p>
            </div>
          </div>

          <div className="settings-options-grid">
            <button
              type="button"
              className={`setting-choice-card ${settings.tempUnit === 'celsius' ? 'active' : ''}`}
              onClick={() => handleTempUnitChange('celsius')}
            >
              <div className="choice-icon-box temp-icon">
                <Thermometer size={22} />
              </div>
              <div className="choice-text">
                <span className="choice-title">Celsius (°C)</span>
                <span className="choice-desc">Metric scale (Default international standard)</span>
              </div>
              <div className="choice-radio">
                <div className="radio-inner"></div>
              </div>
            </button>

            <button
              type="button"
              className={`setting-choice-card ${settings.tempUnit === 'fahrenheit' ? 'active' : ''}`}
              onClick={() => handleTempUnitChange('fahrenheit')}
            >
              <div className="choice-icon-box temp-icon">
                <Thermometer size={22} />
              </div>
              <div className="choice-text">
                <span className="choice-title">Fahrenheit (°F)</span>
                <span className="choice-desc">Imperial scale (Common in the United States)</span>
              </div>
              <div className="choice-radio">
                <div className="radio-inner"></div>
              </div>
            </button>
          </div>
        </div>

        {/* Section 3: Wind Velocity */}
        <div className="settings-group-card">
          <div className="group-header">
            <div className="group-header-text">
              <h2 className="group-title">Wind Velocity Unit</h2>
              <p className="group-desc">
                Preferred velocity metrics for atmospheric wind speed
              </p>
            </div>
          </div>

          <div className="settings-options-grid">
            <button
              type="button"
              className={`setting-choice-card ${settings.windUnit === 'kmh' ? 'active' : ''}`}
              onClick={() => handleWindUnitChange('kmh')}
            >
              <div className="choice-icon-box wind-icon">
                <Wind size={22} />
              </div>
              <div className="choice-text">
                <span className="choice-title">Kilometers per hour (km/h)</span>
                <span className="choice-desc">Standard metric wind speed representation</span>
              </div>
              <div className="choice-radio">
                <div className="radio-inner"></div>
              </div>
            </button>

            <button
              type="button"
              className={`setting-choice-card ${settings.windUnit === 'mph' ? 'active' : ''}`}
              onClick={() => handleWindUnitChange('mph')}
            >
              <div className="choice-icon-box wind-icon">
                <Wind size={22} />
              </div>
              <div className="choice-text">
                <span className="choice-title">Miles per hour (mph)</span>
                <span className="choice-desc">Imperial wind measurement unit</span>
              </div>
              <div className="choice-radio">
                <div className="radio-inner"></div>
              </div>
            </button>
          </div>
        </div>

        {/* Section 4: Data & Security Information */}
        <div className="settings-group-card info-card">
          <div className="info-badge-row">
            <ShieldCheck size={20} className="text-emerald-400" />
            <h3 className="info-heading">Client-Side Persistence & Privacy</h3>
          </div>
          <p className="info-desc">
            All your unit preferences and recent search queries are stored locally in your browser via <code className="settings-code">localStorage</code>. No personal information or location coordinates are ever transferred to external tracking services.
          </p>
        </div>
      </div>
    </div>
  );
}
