/**
 * Utility functions for weather data formatting and unit conversions
 */

export function convertTemperature(celsius, unit = 'celsius') {
  if (celsius === null || celsius === undefined || isNaN(celsius)) return '--';
  if (unit === 'fahrenheit') {
    return Math.round((celsius * 9) / 5 + 32);
  }
  return Math.round(celsius);
}

export function formatTemperature(celsius, unit = 'celsius') {
  const temp = convertTemperature(celsius, unit);
  if (temp === '--') return '--';
  return `${temp}°${unit === 'fahrenheit' ? 'F' : 'C'}`;
}

export function convertWindSpeed(speedKmh, unit = 'kmh') {
  if (speedKmh === null || speedKmh === undefined || isNaN(speedKmh)) return '--';
  if (unit === 'mph') {
    return Math.round(speedKmh * 0.621371);
  }
  return Math.round(speedKmh);
}

export function formatWindSpeed(speedKmh, unit = 'kmh') {
  const speed = convertWindSpeed(speedKmh, unit);
  if (speed === '--') return '--';
  return `${speed} ${unit === 'mph' ? 'mph' : 'km/h'}`;
}

export function getWindDirection(deg) {
  if (deg === undefined || deg === null || isNaN(deg)) return 'N/A';
  const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
  const index = Math.round((deg % 360) / 22.5) % 16;
  return directions[index];
}

export function formatTime(timestampSeconds, timezoneOffsetSeconds = 0) {
  if (!timestampSeconds) return '--';
  const localTime = new Date((timestampSeconds + timezoneOffsetSeconds) * 1000);
  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    timeZone: 'UTC'
  }).format(localTime);
}

export function formatHourOnly(timestampSeconds, timezoneOffsetSeconds = 0) {
  if (!timestampSeconds) return '--';
  const localTime = new Date((timestampSeconds + timezoneOffsetSeconds) * 1000);
  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    hour12: true,
    timeZone: 'UTC'
  }).format(localTime);
}

export function formatDate(timestampSeconds, timezoneOffsetSeconds = 0) {
  if (!timestampSeconds) return '--';
  const localTime = new Date((timestampSeconds + timezoneOffsetSeconds) * 1000);
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC'
  }).format(localTime);
}

export function formatVisibility(meters, unit = 'celsius') {
  if (meters === undefined || meters === null || isNaN(meters)) return 'N/A';
  if (unit === 'fahrenheit') {
    const miles = (meters / 1609.34).toFixed(1);
    return `${miles} mi`;
  }
  const km = (meters / 1000).toFixed(1);
  return `${km} km`;
}
