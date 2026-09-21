/**
 * Central Weather Service Layer
 * Connects directly to the live OpenWeather API.
 * Handles:
 * - Current weather
 * - 5-Day / 3-Hour forecast
 * - Coordinate lookups
 * - City batch queries
 * - In-memory caching to avoid redundant API requests
 */

import {
  getWindDirection,
  formatDate,
  formatTime,
  formatHourOnly
} from '../utils/formatters';

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

// In-memory cache for API responses (5 minute TTL)
const cache = new Map();
const CACHE_TTL_MS = 5 * 60 * 1000;

function getFromCache(key) {
  const entry = cache.get(key);
  if (!entry) return null;
  if (Date.now() - entry.timestamp > CACHE_TTL_MS) {
    cache.delete(key);
    return null;
  }
  return entry.data;
}

function setInCache(key, data) {
  cache.set(key, { data, timestamp: Date.now() });
}

/**
 * Determines whether it is currently daytime or nighttime using OpenWeather data.
 * Checks the icon suffix ('n' vs 'd') or compares dt against sunrise and sunset.
 */
export function determineIsNight(icon, dt, sunrise, sunset) {
  if (typeof icon === 'string' && icon.length > 0) {
    if (icon.endsWith('n')) return true;
    if (icon.endsWith('d')) return false;
  }
  if (typeof dt === 'number' && typeof sunrise === 'number' && typeof sunset === 'number') {
    return dt >= sunset || dt < sunrise;
  }
  return false;
}

/**
 * Normalizes weather condition string for consistent UI styling
 */
export function normalizeCondition(mainCondition, description = '', icon = '', id = null, isNight = false) {
  const main = (mainCondition || '').toLowerCase();
  const desc = (description || '').toLowerCase();
  const night = Boolean(isNight || (typeof icon === 'string' && icon.endsWith('n')));

  // 1. Thunderstorm (OpenWeather IDs 200-232)
  if ((typeof id === 'number' && id >= 200 && id < 300) ||
      main.includes('thunder') || desc.includes('thunder') || desc.includes('lightning')) {
    return { condition: 'Thunderstorm', code: 'storm' };
  }

  // 2. Drizzle (OpenWeather IDs 300-321)
  if ((typeof id === 'number' && id >= 300 && id < 400) ||
      main.includes('drizzle') || desc.includes('drizzle')) {
    return { condition: 'Drizzle', code: 'drizzle' };
  }

  // 3. Rain (OpenWeather IDs 500-531)
  if ((typeof id === 'number' && id >= 500 && id < 600) ||
      main.includes('rain') || desc.includes('rain')) {
    return { condition: 'Rain', code: 'rainy' };
  }

  // 4. Snow (OpenWeather IDs 600-622)
  if ((typeof id === 'number' && id >= 600 && id < 700) ||
      main.includes('snow') || desc.includes('snow') || desc.includes('flurry') || desc.includes('sleet')) {
    return { condition: 'Snow', code: 'snow' };
  }

  // 5. Atmosphere / Mist / Fog / Haze / Smoke / Dust (OpenWeather IDs 700-781)
  if ((typeof id === 'number' && id >= 700 && id < 800) ||
      main.includes('mist') || desc.includes('mist') ||
      main.includes('fog') || desc.includes('fog') ||
      main.includes('haze') || desc.includes('haze') ||
      main.includes('smoke') || desc.includes('smoke') ||
      main.includes('dust') || desc.includes('dust')) {
    const formatted = mainCondition ? (mainCondition.charAt(0).toUpperCase() + mainCondition.slice(1)) : 'Mist';
    return { condition: formatted, code: 'fog' };
  }

  // 6. Clear Sky (OpenWeather ID 800)
  if ((typeof id === 'number' && id === 800) || main.includes('clear')) {
    return {
      condition: night ? 'Clear' : 'Sunny',
      code: night ? 'clear-night' : 'sunny'
    };
  }

  // 7. Clouds (OpenWeather IDs 801-804)
  if (typeof id === 'number' && (id === 801 || id === 802)) {
    return { condition: 'Partly Cloudy', code: night ? 'partly-cloudy-night' : 'partly-cloudy' };
  }
  if (typeof id === 'number' && id === 803) {
    return { condition: 'Cloudy', code: night ? 'cloudy-night' : 'cloudy' };
  }
  if (typeof id === 'number' && id === 804) {
    return { condition: 'Overcast', code: 'cloudy' };
  }

  if (desc.includes('scattered') || desc.includes('few') || desc.includes('broken') || desc.includes('partly')) {
    return { condition: 'Partly Cloudy', code: night ? 'partly-cloudy-night' : 'partly-cloudy' };
  }
  if (main.includes('cloud') || desc.includes('overcast')) {
    return { condition: 'Cloudy', code: 'cloudy' };
  }

  // Fallback
  return {
    condition: mainCondition || (night ? 'Clear' : 'Sunny'),
    code: night ? 'clear-night' : 'sunny'
  };
}

/**
 * Transforms OpenWeather current + forecast responses into a standardized structure
 */
function transformFullWeather(currentData, forecastData) {
  const timezone = currentData.timezone || 0;
  const weatherObj = currentData.weather?.[0] || {};
  const icon = weatherObj.icon || '';
  const dt = currentData.dt;
  const sunrise = currentData.sys?.sunrise;
  const sunset = currentData.sys?.sunset;
  const isNight = determineIsNight(icon, dt, sunrise, sunset);
  const { condition, code } = normalizeCondition(
    weatherObj.main,
    weatherObj.description,
    icon,
    weatherObj.id,
    isNight
  );

  // Speed in m/s converted to km/h
  const windSpeedKmh = Math.round((currentData.wind?.speed || 0) * 3.6);
  const windDeg = currentData.wind?.deg;

  // Process 5-day forecast
  const daysMap = new Map();
  const forecastList = forecastData?.list || [];

  forecastList.forEach((item) => {
    const dateObj = new Date((item.dt + timezone) * 1000);
    const dayKey = dateObj.toISOString().split('T')[0];
    const dayName = new Intl.DateTimeFormat('en-US', { weekday: 'short', timeZone: 'UTC' }).format(dateObj);
    const fullDate = formatDate(item.dt, timezone);

    if (!daysMap.has(dayKey)) {
      daysMap.set(dayKey, {
        dateKey: dayKey,
        day: dayName,
        fullDate,
        temps: [],
        humidities: [],
        pressures: [],
        windSpeeds: [],
        clouds: [],
        pops: [],
        weatherItems: []
      });
    }

    const dayEntry = daysMap.get(dayKey);
    dayEntry.temps.push(item.main.temp);
    dayEntry.humidities.push(item.main.humidity);
    dayEntry.pressures.push(item.main.pressure);
    dayEntry.windSpeeds.push(Math.round((item.wind?.speed || 0) * 3.6));
    dayEntry.clouds.push(item.clouds?.all || 0);
    dayEntry.pops.push(item.pop || 0);
    dayEntry.weatherItems.push({
      hour: dateObj.getUTCHours(),
      weather: item.weather?.[0]
    });
  });

  const fiveDayForecast = Array.from(daysMap.values()).map((day) => {
    // Pick the most representative item (closest to midday 12:00-15:00 UTC)
    let repWeather = day.weatherItems.find((w) => w.hour >= 11 && w.hour <= 15)?.weather;
    if (!repWeather && day.weatherItems.length > 0) {
      repWeather = day.weatherItems[Math.floor(day.weatherItems.length / 2)].weather;
    }

    const repIcon = repWeather?.icon || '';
    const { condition: dayCondition, code: dayCode } = normalizeCondition(
      repWeather?.main,
      repWeather?.description,
      repIcon,
      repWeather?.id,
      false
    );

    const high = Math.round(Math.max(...day.temps));
    const low = Math.round(Math.min(...day.temps));
    const avgHumidity = Math.round(day.humidities.reduce((a, b) => a + b, 0) / day.humidities.length);
    const avgPressure = Math.round(day.pressures.reduce((a, b) => a + b, 0) / day.pressures.length);
    const avgWindKmh = Math.round(day.windSpeeds.reduce((a, b) => a + b, 0) / day.windSpeeds.length);
    const avgClouds = Math.round(day.clouds.reduce((a, b) => a + b, 0) / day.clouds.length);
    const maxPop = Math.round(Math.max(...day.pops) * 100);

    return {
      dateKey: day.dateKey,
      day: day.day,
      fullDate: day.fullDate,
      high,
      low,
      condition: dayCondition,
      conditionCode: dayCode,
      icon: repIcon,
      isNight: false,
      description: repWeather?.description || dayCondition,
      humidity: avgHumidity,
      pressure: avgPressure,
      windSpeedKmh: avgWindKmh,
      cloudiness: avgClouds,
      precipitationChance: maxPop
    };
  }).slice(0, 5);

  // Process 24-hour / next intervals (8 intervals = 24 hours of 3-hour forecasts)
  const hourlyForecast = forecastList.slice(0, 8).map((item) => {
    const itemWeather = item.weather?.[0] || {};
    const itemIcon = itemWeather.icon || '';
    const itemIsNight = determineIsNight(itemIcon, item.dt, currentData.sys?.sunrise, currentData.sys?.sunset);
    const { condition: hourCondition, code: hourCode } = normalizeCondition(
      itemWeather.main,
      itemWeather.description,
      itemIcon,
      itemWeather.id,
      itemIsNight
    );

    const rain3h = item.rain?.['3h'] || 0;
    const pop = Math.round((item.pop || 0) * 100);

    return {
      dt: item.dt,
      time: formatHourOnly(item.dt, timezone),
      fullTime: formatTime(item.dt, timezone),
      temp: Math.round(item.main.temp),
      feelsLike: Math.round(item.main.feels_like),
      condition: hourCondition,
      conditionCode: hourCode,
      icon: itemIcon,
      isNight: itemIsNight,
      description: itemWeather.description || hourCondition,
      humidity: item.main.humidity,
      pressure: item.main.pressure,
      windSpeedKmh: Math.round((item.wind?.speed || 0) * 3.6),
      windDirection: getWindDirection(item.wind?.deg),
      cloudiness: item.clouds?.all || 0,
      precipitationChance: pop,
      rainVolumeMm: rain3h
    };
  });

  return {
    city: currentData.name,
    country: currentData.sys?.country || '',
    coordinates: {
      lat: currentData.coord?.lat,
      lon: currentData.coord?.lon
    },
    timezone,
    date: formatDate(currentData.dt, timezone),
    temperature: Math.round(currentData.main.temp),
    feelsLike: Math.round(currentData.main.feels_like),
    high: Math.round(currentData.main.temp_max),
    low: Math.round(currentData.main.temp_min),
    condition,
    conditionCode: code,
    icon,
    weatherId: weatherObj.id,
    isNight,
    description: weatherObj.description || condition,
    humidity: currentData.main.humidity,
    pressure: currentData.main.pressure,
    windSpeedKmh,
    windDirection: getWindDirection(windDeg),
    windDeg,
    visibilityMeters: currentData.visibility ?? 10000,
    cloudiness: currentData.clouds?.all ?? 0,
    sunrise: formatTime(currentData.sys?.sunrise, timezone),
    sunset: formatTime(currentData.sys?.sunset, timezone),
    sunriseRaw: currentData.sys?.sunrise,
    sunsetRaw: currentData.sys?.sunset,
    dt: currentData.dt,
    fiveDayForecast,
    hourlyForecast
  };
}

/**
 * Handle API HTTP error responses with clear, user-friendly messages
 */
async function handleHttpError(response, queryContext = '') {
  if (response.status === 401) {
    throw new Error(
      'OpenWeather API key is invalid or pending activation. If newly created, OpenWeather takes 10–60 minutes to activate keys. Please verify VITE_OPENWEATHER_API_KEY in your .env file.'
    );
  }
  if (response.status === 404) {
    throw new Error(`City "${queryContext}" could not be found. Please check the spelling and try again.`);
  }
  if (response.status === 429) {
    throw new Error('OpenWeather API rate limit exceeded. Please wait a moment before trying again.');
  }

  let errorDetail = '';
  try {
    const data = await response.json();
    errorDetail = data.message || '';
  } catch {
    // fallback
  }

  throw new Error(errorDetail || `Weather service error (${response.status}). Please try again.`);
}

/**
 * Fetch full weather data by city name
 */
export async function getCurrentWeather(cityName) {
  if (!cityName || typeof cityName !== 'string' || !cityName.trim()) {
    throw new Error('Please enter a city name to search.');
  }

  const query = cityName.trim();
  const cacheKey = `city_${query.toLowerCase()}`;
  const cached = getFromCache(cacheKey);
  if (cached) return cached;

  if (!API_KEY) {
    throw new Error('OpenWeather API Key is missing. Please set VITE_OPENWEATHER_API_KEY in your .env file.');
  }

  try {
    const encodedQuery = encodeURIComponent(query);
    const [weatherRes, forecastRes] = await Promise.all([
      fetch(`${BASE_URL}/weather?q=${encodedQuery}&units=metric&appid=${API_KEY}`),
      fetch(`${BASE_URL}/forecast?q=${encodedQuery}&units=metric&appid=${API_KEY}`)
    ]);

    if (!weatherRes.ok) {
      await handleHttpError(weatherRes, query);
    }
    if (!forecastRes.ok) {
      await handleHttpError(forecastRes, query);
    }

    const weatherData = await weatherRes.json();
    const forecastData = await forecastRes.json();

    const result = transformFullWeather(weatherData, forecastData);
    setInCache(cacheKey, result);
    return result;
  } catch (error) {
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      throw new Error('Network error. Unable to connect to OpenWeather API. Please check your internet connection.', { cause: error });
    }
    throw error;
  }
}

/**
 * Fetch full weather data by GPS coordinates (latitude, longitude)
 */
export async function getWeatherByCoordinates(lat, lon) {
  if (typeof lat !== 'number' || typeof lon !== 'number') {
    throw new Error('Valid geographic coordinates are required.');
  }

  const cacheKey = `geo_${lat.toFixed(3)}_${lon.toFixed(3)}`;
  const cached = getFromCache(cacheKey);
  if (cached) return cached;

  if (!API_KEY) {
    throw new Error('OpenWeather API Key is missing. Please set VITE_OPENWEATHER_API_KEY in your .env file.');
  }

  try {
    const [weatherRes, forecastRes] = await Promise.all([
      fetch(`${BASE_URL}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`),
      fetch(`${BASE_URL}/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`)
    ]);

    if (!weatherRes.ok) {
      await handleHttpError(weatherRes, `${lat}, ${lon}`);
    }
    if (!forecastRes.ok) {
      await handleHttpError(forecastRes, `${lat}, ${lon}`);
    }

    const weatherData = await weatherRes.json();
    const forecastData = await forecastRes.json();

    const result = transformFullWeather(weatherData, forecastData);
    setInCache(cacheKey, result);
    return result;
  } catch (error) {
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      throw new Error('Network error. Unable to connect to OpenWeather API.', { cause: error });
    }
    throw error;
  }
}

/**
 * Search city summary (for city explorer / cards)
 */
export async function searchCitySummary(cityName) {
  const cacheKey = `summary_${cityName.toLowerCase().trim()}`;
  const cached = getFromCache(cacheKey);
  if (cached) return cached;

  if (!API_KEY) {
    throw new Error('OpenWeather API Key is missing.');
  }

  const encodedQuery = encodeURIComponent(cityName.trim());
  const res = await fetch(`${BASE_URL}/weather?q=${encodedQuery}&units=metric&appid=${API_KEY}`);

  if (!res.ok) {
    await handleHttpError(res, cityName);
  }

  const data = await res.json();
  const weatherObj = data.weather?.[0] || {};
  const icon = weatherObj.icon || '';
  const isNight = determineIsNight(icon, data.dt, data.sys?.sunrise, data.sys?.sunset);
  const { condition, code } = normalizeCondition(
    weatherObj.main,
    weatherObj.description,
    icon,
    weatherObj.id,
    isNight
  );

  const summary = {
    city: data.name,
    country: data.sys?.country || '',
    coordinates: {
      lat: data.coord?.lat,
      lon: data.coord?.lon
    },
    temperature: Math.round(data.main.temp),
    feelsLike: Math.round(data.main.feels_like),
    high: Math.round(data.main.temp_max),
    low: Math.round(data.main.temp_min),
    condition,
    conditionCode: code,
    icon,
    isNight,
    humidity: data.main.humidity,
    windSpeedKmh: Math.round((data.wind?.speed || 0) * 3.6),
    pressure: data.main.pressure,
    dt: data.dt
  };

  setInCache(cacheKey, summary);
  return summary;
}

/**
 * OpenWeather Tile Layer URL generator
 * Compatible layers: temp_new, clouds_new, precipitation_new, wind_new
 */
export function getWeatherTileLayerUrl(layerName = 'temp_new') {
  if (!API_KEY) return null;
  return `https://tile.openweathermap.org/map/${layerName}/{z}/{x}/{y}.png?appid=${API_KEY}`;
}
