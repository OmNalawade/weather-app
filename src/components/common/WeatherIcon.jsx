import {
  Sun,
  Moon,
  Cloud,
  CloudRain,
  CloudDrizzle,
  CloudSun,
  CloudMoon,
  CloudLightning,
  CloudSnow,
  CloudFog,
  Wind
} from 'lucide-react';

export default function WeatherIcon({
  condition = '',
  isNight = false,
  icon = '',
  size = 24,
  className = ''
}) {
  const norm = (condition || '').toLowerCase().trim();
  const iconStr = (icon || '').toLowerCase().trim();

  // Determine if it is nighttime
  const night = Boolean(
    isNight ||
    iconStr.endsWith('n') ||
    norm.includes('night')
  );

  // 1. Thunderstorm (OpenWeather 11d/11n)
  if (norm.includes('thunder') || norm.includes('storm') || norm.includes('lightning') || iconStr.startsWith('11')) {
    return (
      <div className={`inline-flex items-center justify-center text-yellow-400 ${className}`}>
        <CloudLightning size={size} strokeWidth={2.2} />
      </div>
    );
  }

  // 2. Snow / Ice (OpenWeather 13d/13n)
  if (norm.includes('snow') || norm.includes('ice') || norm.includes('flurry') || norm.includes('sleet') || iconStr.startsWith('13')) {
    return (
      <div className={`inline-flex items-center justify-center text-sky-200 ${className}`}>
        <CloudSnow size={size} strokeWidth={2.2} />
      </div>
    );
  }

  // 3. Drizzle (OpenWeather 09d/09n)
  if (norm.includes('drizzle')) {
    return (
      <div className={`inline-flex items-center justify-center text-sky-400 ${className}`}>
        <CloudDrizzle size={size} strokeWidth={2.2} />
      </div>
    );
  }

  // 4. Rain (OpenWeather 09d/09n, 10d/10n)
  if (norm.includes('rain') || iconStr.startsWith('09') || iconStr.startsWith('10')) {
    return (
      <div className={`inline-flex items-center justify-center text-sky-400 ${className}`}>
        <CloudRain size={size} strokeWidth={2.2} />
      </div>
    );
  }

  // 5. Atmosphere / Fog / Mist / Haze / Smoke (OpenWeather 50d/50n)
  if (norm.includes('fog') || norm.includes('mist') || norm.includes('haze') || norm.includes('smoke') || norm.includes('dust') || iconStr.startsWith('50')) {
    return (
      <div className={`inline-flex items-center justify-center text-slate-300 ${className}`}>
        <CloudFog size={size} strokeWidth={2.2} />
      </div>
    );
  }

  // 6. Wind / Breeze
  if (norm.includes('wind') || norm.includes('breeze')) {
    return (
      <div className={`inline-flex items-center justify-center text-teal-300 ${className}`}>
        <Wind size={size} strokeWidth={2.2} />
      </div>
    );
  }

  // 7. Partly Cloudy / Few Clouds / Scattered Clouds (OpenWeather 02d/02n, 03d/03n)
  if (norm.includes('partly') || norm.includes('scattered') || norm.includes('few') || iconStr.startsWith('02') || iconStr.startsWith('03')) {
    if (night) {
      return (
        <div className={`inline-flex items-center justify-center text-indigo-300 ${className}`}>
          <CloudMoon size={size} strokeWidth={2.2} />
        </div>
      );
    }
    return (
      <div className={`inline-flex items-center justify-center text-amber-400 ${className}`}>
        <CloudSun size={size} strokeWidth={2.2} />
      </div>
    );
  }

  // 8. Cloudy / Overcast (OpenWeather 04d/04n)
  if (norm.includes('cloud') || norm.includes('overcast') || iconStr.startsWith('04')) {
    return (
      <div className={`inline-flex items-center justify-center text-slate-300 ${className}`}>
        <Cloud size={size} strokeWidth={2.2} />
      </div>
    );
  }

  // 9. Clear / Sunny (OpenWeather 01d/01n)
  if (night) {
    return (
      <div className={`inline-flex items-center justify-center text-indigo-200 ${className}`}>
        <Moon size={size} strokeWidth={2.2} />
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center justify-center text-amber-400 ${className}`}>
      <Sun size={size} strokeWidth={2.2} />
    </div>
  );
}
