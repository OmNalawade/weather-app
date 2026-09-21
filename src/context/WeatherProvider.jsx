import { useState, useEffect, useCallback } from 'react';
import { WeatherContext } from './WeatherContext';
import {
  getCurrentWeather,
  getWeatherByCoordinates
} from '../services/weatherService';

const DEFAULT_SETTINGS = {
  tempUnit: 'celsius', // 'celsius' | 'fahrenheit'
  windUnit: 'kmh',     // 'kmh' | 'mph'
  theme: 'dark'        // 'dark' | 'light'
};

export function WeatherProvider({ children }) {
  // Load settings from localStorage
  const [settings, setSettings] = useState(() => {
    try {
      const saved = localStorage.getItem('weather_app_settings');
      return saved ? { ...DEFAULT_SETTINGS, ...JSON.parse(saved) } : DEFAULT_SETTINGS;
    } catch {
      return DEFAULT_SETTINGS;
    }
  });

  // Recent cities search history
  const [recentCities, setRecentCities] = useState(() => {
    try {
      const saved = localStorage.getItem('weather_app_recents');
      return saved ? JSON.parse(saved) : ['Pune', 'Mumbai', 'Delhi', 'Bangalore'];
    } catch {
      return ['Pune', 'Mumbai', 'Delhi', 'Bangalore'];
    }
  });

  const [weather, setWeather] = useState(null);
  const [currentCityName, setCurrentCityName] = useState(() => {
    return localStorage.getItem('weather_app_last_city') || 'Pune';
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const [error, setError] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  // Sync theme to <html> tag and localStorage
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', settings.theme);
    try {
      localStorage.setItem('weather_app_settings', JSON.stringify(settings));
    } catch {
      // storage quota
    }
  }, [settings]);

  // Sync recent cities to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('weather_app_recents', JSON.stringify(recentCities));
    } catch {
      // storage quota
    }
  }, [recentCities]);

  // Show transient toast message
  const showToast = useCallback((msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 4500);
  }, []);

  const addRecentCity = useCallback((cityName) => {
    if (!cityName) return;
    setRecentCities((prev) => {
      const filtered = prev.filter((c) => c.toLowerCase() !== cityName.toLowerCase());
      return [cityName, ...filtered].slice(0, 6);
    });
  }, []);

  // Fetch weather for a city
  const searchCity = useCallback(async (cityName, isSilent = false) => {
    if (!cityName || !cityName.trim()) return;
    const cleanCity = cityName.trim();

    if (isSilent) {
      setIsRefreshing(true);
    } else {
      setIsLoading(true);
      setError(null);
    }

    try {
      const data = await getCurrentWeather(cleanCity);
      setWeather(data);
      setCurrentCityName(data.city);
      addRecentCity(data.city);
      try {
        localStorage.setItem('weather_app_last_city', data.city);
      } catch {
        // storage
      }
      setError(null);
    } catch (err) {
      setError(err.message || 'Unable to retrieve weather data.');
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, [addRecentCity]);

  // Fetch weather by coordinates (Geolocation)
  const useCurrentLocation = useCallback(async () => {
    if (!navigator.geolocation) {
      showToast('Geolocation is not supported by your web browser.');
      return;
    }

    setIsLocating(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          setIsLoading(true);
          const data = await getWeatherByCoordinates(latitude, longitude);
          setWeather(data);
          setCurrentCityName(data.city);
          addRecentCity(data.city);
          try {
            localStorage.setItem('weather_app_last_city', data.city);
          } catch {
            // storage
          }
          setError(null);
          showToast(`Located: ${data.city}${data.country ? `, ${data.country}` : ''}`);
        } catch (err) {
          setError(err.message || 'Unable to fetch weather for your coordinates.');
        } finally {
          setIsLoading(false);
          setIsLocating(false);
        }
      },
      (geoError) => {
        setIsLocating(false);
        let msg = 'Unable to access your current location.';
        if (geoError.code === geoError.PERMISSION_DENIED) {
          msg = 'Location permission was denied. Please search for your city manually.';
        } else if (geoError.code === geoError.POSITION_UNAVAILABLE) {
          msg = 'Location information is unavailable on your device.';
        } else if (geoError.code === geoError.TIMEOUT) {
          msg = 'The request to obtain your location timed out.';
        }
        showToast(msg);
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  }, [addRecentCity, showToast]);

  // Refresh current city
  const refreshWeather = useCallback(() => {
    if (weather?.coordinates?.lat && weather?.coordinates?.lon) {
      searchCity(currentCityName, true);
    } else if (currentCityName) {
      searchCity(currentCityName, true);
    }
  }, [weather, currentCityName, searchCity]);

  // Toggle theme
  const toggleTheme = useCallback(() => {
    setSettings((prev) => ({
      ...prev,
      theme: prev.theme === 'dark' ? 'light' : 'dark'
    }));
  }, []);

  // Update specific settings
  const updateSettings = useCallback((newSettings) => {
    setSettings((prev) => ({
      ...prev,
      ...newSettings
    }));
  }, []);

  // Initial load on mount without synchronous setState in effect
  useEffect(() => {
    let ignore = false;
    const initialCity = currentCityName || 'Pune';

    getCurrentWeather(initialCity)
      .then((data) => {
        if (!ignore) {
          setWeather(data);
          setCurrentCityName(data.city);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        if (!ignore) {
          setError(err.message || 'Unable to retrieve weather data.');
          setIsLoading(false);
        }
      });

    return () => {
      ignore = true;
    };
  }, [currentCityName]);

  const value = {
    weather,
    currentCityName,
    isLoading,
    isRefreshing,
    isLocating,
    error,
    toastMessage,
    settings,
    recentCities,
    searchCity,
    useCurrentLocation,
    refreshWeather,
    toggleTheme,
    updateSettings,
    showToast,
    clearError: () => setError(null)
  };

  return (
    <WeatherContext.Provider value={value}>
      {children}
    </WeatherContext.Provider>
  );
}

export default WeatherProvider;
