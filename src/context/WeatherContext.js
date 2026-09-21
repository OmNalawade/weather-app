import { createContext, useContext } from 'react';

export const WeatherContext = createContext(null);

export function useWeather() {
  const context = useContext(WeatherContext);
  if (!context) {
    throw new Error('useWeather must be used within a WeatherProvider');
  }
  return context;
}
