import { useState, useEffect, useRef, useCallback } from 'react';
import {
  MapPin,
  LocateFixed,
  Search,
  AlertCircle,
  RotateCcw,
  Layers,
  Sparkles
} from 'lucide-react';
import { useWeather } from '../../context/WeatherContext';
import { formatTemperature, convertWindSpeed } from '../../utils/formatters';

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
const OPENWEATHER_API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

// Subtle Dark Mode Map Style for Google Maps
const DARK_MAP_STYLE = [
  { elementType: 'geometry', stylers: [{ color: '#101927' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#101927' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#94a3b8' }] },
  {
    featureType: 'administrative.locality',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#cbd5e1' }]
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#64748b' }]
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [{ color: '#142334' }]
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#60a5fa' }]
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{ color: '#1e293b' }]
  },
  {
    featureType: 'road',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#0f172a' }]
  },
  {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#94a3b8' }]
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [{ color: '#2b3952' }]
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#172236' }]
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#f8fafc' }]
  },
  {
    featureType: 'transit',
    elementType: 'geometry',
    stylers: [{ color: '#182438' }]
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{ color: '#09101d' }]
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#38bdf8' }]
  },
  {
    featureType: 'water',
    elementType: 'labels.text.stroke',
    stylers: [{ color: '#09101d' }]
  }
];

const WEATHER_OVERLAYS = [
  { id: 'none', label: 'None (Clean Map)' },
  { id: 'temp_new', label: 'Temperature Radar' },
  { id: 'clouds_new', label: 'Cloud Radar' },
  { id: 'precipitation_new', label: 'Precipitation Radar' },
  { id: 'wind_new', label: 'Wind Velocity Radar' }
];

/**
 * Robust loader for Google Maps JavaScript API script
 */
function loadGoogleMaps(apiKey) {
  return new Promise((resolve, reject) => {
    if (window.google && window.google.maps) {
      resolve(window.google);
      return;
    }

    const scriptId = 'google-maps-sdk-script';
    const existingScript = document.getElementById(scriptId);

    if (existingScript) {
      if (window.google && window.google.maps) {
        resolve(window.google);
      } else {
        existingScript.addEventListener('load', () => resolve(window.google));
        existingScript.addEventListener('error', () =>
          reject(new Error('Failed to load Google Maps SDK.'))
        );
      }
      return;
    }

    const script = document.createElement('script');
    script.id = scriptId;
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&v=weekly`;
    script.async = true;
    script.defer = true;

    script.onload = () => {
      if (window.google && window.google.maps) {
        resolve(window.google);
      } else {
        reject(new Error('Google Maps loaded, but google.maps is unavailable.'));
      }
    };

    script.onerror = () => {
      reject(new Error('Network error loading Google Maps JavaScript API.'));
    };

    document.head.appendChild(script);
  });
}

export default function WeatherMap() {
  const {
    weather,
    settings,
    searchCity,
    useCurrentLocation,
    isLocating
  } = useWeather();

  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markerRef = useRef(null);
  const infoWindowRef = useRef(null);
  const overlayRef = useRef(null);

  const [mapStatus, setMapStatus] = useState(() =>
    !GOOGLE_MAPS_API_KEY ? 'error' : 'loading'
  );
  const [errorMessage, setErrorMessage] = useState(() =>
    !GOOGLE_MAPS_API_KEY
      ? 'Google Maps API Key is missing. Please set VITE_GOOGLE_MAPS_API_KEY in your .env file.'
      : null
  );

  const [searchQuery, setSearchQuery] = useState('');
  const [activeOverlay, setActiveOverlay] = useState('none');
  const [mapType, setMapType] = useState('roadmap'); // 'roadmap' | 'satellite' | 'hybrid' | 'terrain'
  const [retryKey, setRetryKey] = useState(0);

  // Safe coordinates
  const lat = typeof weather?.coordinates?.lat === 'number' ? weather.coordinates.lat : 18.5204;
  const lon = typeof weather?.coordinates?.lon === 'number' ? weather.coordinates.lon : 73.8567;
  const cityName = weather?.city || 'Pune';
  const country = weather?.country || '';

  // Generate InfoWindow HTML content
  const createInfoWindowContent = useCallback(() => {
    const tempStr = weather ? formatTemperature(weather.temperature, settings.tempUnit) : '--';
    const feelsStr = weather ? formatTemperature(weather.feelsLike, settings.tempUnit) : '--';
    const highStr = weather ? formatTemperature(weather.high, settings.tempUnit) : '--';
    const lowStr = weather ? formatTemperature(weather.low, settings.tempUnit) : '--';
    const windStr = weather
      ? `${convertWindSpeed(weather.windSpeedKmh, settings.windUnit)} ${settings.windUnit === 'mph' ? 'mph' : 'km/h'}`
      : '--';

    return `
      <div style="font-family: 'Plus Jakarta Sans', system-ui, sans-serif; color: #0f172a; padding: 6px; min-width: 200px;">
        <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 6px;">
          <span style="display: inline-block; width: 8px; height: 8px; border-radius: 50%; background: #0284c7;"></span>
          <strong style="font-size: 15px; font-weight: 700; color: #0f172a;">${cityName}${country ? `, ${country}` : ''}</strong>
        </div>
        <div style="display: flex; align-items: baseline; gap: 8px; margin-bottom: 6px;">
          <span style="font-size: 24px; font-weight: 800; color: #0284c7; line-height: 1;">${tempStr}</span>
          <span style="font-size: 13px; font-weight: 600; color: #475569;">${weather?.condition || ''}</span>
        </div>
        <div style="font-size: 12px; color: #64748b; margin-bottom: 8px;">
          <span>H: ${highStr}</span> • <span>L: ${lowStr}</span> • <span>Feels ${feelsStr}</span>
        </div>
        <div style="border-top: 1px solid #e2e8f0; padding-top: 6px; font-size: 12px; color: #475569; display: flex; justify-content: space-between;">
          <span>Humidity: <strong>${weather?.humidity ?? '--'}%</strong></span>
          <span>Wind: <strong>${windStr}</strong></span>
        </div>
      </div>
    `;
  }, [weather, settings, cityName, country]);

  // Handle Google Maps authentication error without crashing the app
  useEffect(() => {
    window.gm_authFailure = () => {
      setMapStatus('error');
      setErrorMessage(
        'Google Maps authorization error (InvalidKeyOrUnauthorizedURL). Please verify that your Google Maps API key has the Maps JavaScript API enabled.'
      );
    };

    return () => {
      delete window.gm_authFailure;
    };
  }, []);

  // Initialize and mount Google Maps instance
  useEffect(() => {
    let isCancelled = false;

    if (!GOOGLE_MAPS_API_KEY) {
      return () => {
        isCancelled = true;
      };
    }

    loadGoogleMaps(GOOGLE_MAPS_API_KEY)
      .then((google) => {
        if (isCancelled || !mapRef.current) return;

        const mapOptions = {
          center: { lat, lng: lon },
          zoom: 10,
          mapTypeId: mapType,
          styles: settings.theme === 'dark' && mapType === 'roadmap' ? DARK_MAP_STYLE : null,
          zoomControl: true,
          mapTypeControl: false,
          scaleControl: true,
          streetViewControl: false,
          rotateControl: false,
          fullscreenControl: true
        };

        const map = new google.maps.Map(mapRef.current, mapOptions);
        mapInstanceRef.current = map;

        // Add Marker
        const marker = new google.maps.Marker({
          position: { lat, lng: lon },
          map,
          title: `${cityName} Weather`,
          animation: google.maps.Animation.DROP
        });
        markerRef.current = marker;

        // Add InfoWindow
        const infoWindow = new google.maps.InfoWindow({
          content: createInfoWindowContent(),
          maxWidth: 300
        });
        infoWindowRef.current = infoWindow;

        marker.addListener('click', () => {
          infoWindow.open(map, marker);
        });

        infoWindow.open(map, marker);
        setMapStatus('ready');
      })
      .catch((err) => {
        if (isCancelled) return;
        setMapStatus('error');
        setErrorMessage(
          err.message || 'Unable to initialize Google Maps. Please check your network or API Key.'
        );
      });

    return () => {
      isCancelled = true;
    };
  }, [retryKey]); // eslint-disable-line react-hooks/exhaustive-deps

  // Pan and reposition marker when active coordinates update
  useEffect(() => {
    if (mapInstanceRef.current && markerRef.current) {
      const newPos = { lat, lng: lon };
      mapInstanceRef.current.panTo(newPos);
      markerRef.current.setPosition(newPos);

      if (infoWindowRef.current) {
        infoWindowRef.current.setContent(createInfoWindowContent());
        infoWindowRef.current.open(mapInstanceRef.current, markerRef.current);
      }
    }
  }, [lat, lon, createInfoWindowContent]);

  // Update map dark/light styling on theme change
  useEffect(() => {
    if (mapInstanceRef.current) {
      if (mapType === 'roadmap') {
        mapInstanceRef.current.setOptions({
          styles: settings.theme === 'dark' ? DARK_MAP_STYLE : null
        });
      }
    }
  }, [settings.theme, mapType]);

  // Switch Map Type
  const handleMapTypeChange = (newType) => {
    setMapType(newType);
    if (mapInstanceRef.current && window.google) {
      mapInstanceRef.current.setMapTypeId(newType);
      if (newType === 'roadmap') {
        mapInstanceRef.current.setOptions({
          styles: settings.theme === 'dark' ? DARK_MAP_STYLE : null
        });
      } else {
        mapInstanceRef.current.setOptions({ styles: null });
      }
    }
  };

  // Weather overlay tile layer on Google Maps
  useEffect(() => {
    if (!mapInstanceRef.current || !window.google) return;

    const map = mapInstanceRef.current;

    if (overlayRef.current) {
      map.overlayMapTypes.clear();
      overlayRef.current = null;
    }

    if (activeOverlay !== 'none' && OPENWEATHER_API_KEY) {
      try {
        const weatherMapType = new window.google.maps.ImageMapType({
          getTileUrl: function (coord, zoom) {
            return `https://tile.openweathermap.org/map/${activeOverlay}/${zoom}/${coord.x}/${coord.y}.png?appid=${OPENWEATHER_API_KEY}`;
          },
          tileSize: new window.google.maps.Size(256, 256),
          maxZoom: 18,
          name: activeOverlay,
          opacity: 0.6
        });

        overlayRef.current = weatherMapType;
        map.overlayMapTypes.push(weatherMapType);
      } catch (err) {
        console.warn('Weather overlay notice:', err);
      }
    }
  }, [activeOverlay]);

  // Search city from map toolbar
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      searchCity(searchQuery.trim());
      setSearchQuery('');
    }
  };

  return (
    <div className="weather-map-page-container">
      {/* Top Map Controls Toolbar */}
      <div className="map-toolbar">
        {/* Search location bar */}
        <form onSubmit={handleSearch} className="map-search-form">
          <Search size={16} className="map-search-icon" />
          <input
            type="text"
            className="map-search-input"
            placeholder="Fly map to city (e.g. Mumbai, Tokyo)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="map-search-submit">
            Search
          </button>
        </form>

        {/* Action Controls */}
        <div className="map-toolbar-actions">
          {/* Current Location Button */}
          <button
            type="button"
            className={`map-tool-btn ${isLocating ? 'loading' : ''}`}
            onClick={useCurrentLocation}
            disabled={isLocating}
            title="Pan map to current GPS location"
          >
            <LocateFixed size={16} className={isLocating ? 'spin' : ''} />
            <span className="tool-btn-label">
              {isLocating ? 'Locating...' : 'My Location'}
            </span>
          </button>

          {/* Map Type Switcher */}
          <div className="layer-picker-group">
            <span className="layer-label-text">Map:</span>
            <select
              className="layer-select"
              value={mapType}
              onChange={(e) => handleMapTypeChange(e.target.value)}
              aria-label="Select Google Maps style"
            >
              <option value="roadmap">Standard</option>
              <option value="satellite">Satellite</option>
              <option value="hybrid">Hybrid</option>
              <option value="terrain">Terrain</option>
            </select>
          </div>

          {/* Weather Overlay Selector */}
          <div className="layer-picker-group">
            <Layers size={16} className="layer-icon" />
            <select
              className="layer-select"
              value={activeOverlay}
              onChange={(e) => setActiveOverlay(e.target.value)}
              aria-label="Select Weather Radar Layer"
            >
              {WEATHER_OVERLAYS.map((layer) => (
                <option key={layer.id} value={layer.id}>
                  {layer.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Main Google Maps Viewport */}
      <div className="interactive-map-frame">
        {/* Loading Spinner */}
        {mapStatus === 'loading' && (
          <div className="map-loading-overlay">
            <div className="map-loading-spinner"></div>
            <span className="map-loading-text">Loading Google Maps JavaScript API...</span>
          </div>
        )}

        {/* Error State */}
        {mapStatus === 'error' && (
          <div className="map-error-overlay">
            <div className="map-error-icon">
              <AlertCircle size={40} />
            </div>
            <h3 className="map-error-title">Google Maps Notice</h3>
            <p className="map-error-desc">{errorMessage}</p>
            <button
              type="button"
              className="btn-map-retry"
              onClick={() => {
                setMapStatus('loading');
                setRetryKey((k) => k + 1);
              }}
            >
              <RotateCcw size={16} />
              <span>Retry Map Initialization</span>
            </button>
          </div>
        )}

        {/* Real Google Map DOM Canvas */}
        <div
          ref={mapRef}
          className="google-map-canvas"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      {/* Footer Telemetry Banner */}
      <div className="map-info-bar">
        <div className="map-info-left">
          <MapPin size={15} className="text-sky-400" />
          <span>
            Centered on <strong>{cityName}{country ? `, ${country}` : ''}</strong> ({Number(lat).toFixed(4)}°, {Number(lon).toFixed(4)}°)
          </span>
        </div>
        <div className="map-info-right">
          <Sparkles size={14} className="text-amber-400" />
          <span>Powered by official Google Maps JavaScript API</span>
        </div>
      </div>
    </div>
  );
}
