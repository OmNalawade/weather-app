# Modern Weather Dashboard

A modern, responsive weather dashboard web application built with React, Vite, CSS, and Lucide React icons, designed precisely according to the dark-mode reference visual.

## Features

- **Reference-Accurate UI Design**: Centered dark glass dashboard container, smooth borders, and realistic atmospheric illustration (glowing sun, volumetric cloud wisps, and mountain silhouettes).
- **Current Weather Display**:
  - Live temperature (`28°C`), condition (`Sunny`), high/low temperatures (`H: 31°`, `L: 21°`).
  - Refresh button with smooth rotating animation.
  - Four bottom metrics: Wind speed & direction, Humidity, Atmospheric Pressure, and Feels-like temperature.
- **5-Day Forecast**: Clean cards showing days, realistic weather icons, high and low temperatures.
- **Hourly Forecast & Temperature Spline Graph**:
  - 6 hourly markers (8 AM to 1 PM) with matching weather conditions and temperatures.
  - Lightweight SVG temperature curve with glowing spline stroke, soft gradient underlay, and glowing vertex nodes.
- **City Search with Autocomplete**:
  - Functional city search for Pune, Mumbai, Delhi, Bangalore, Hyderabad, Chennai, Nashik.
  - Interactive suggestions dropdown with keyboard and click navigation.
- **Current Location (Geolocation)**:
  - Browser geolocation integration with graceful error handling and status alerts.
- **Dark & Light Mode**:
  - Persistent theme toggle between dark atmospheric mode and light slate mode.
  - Persisted across reloads in `localStorage`.
- **Loading & Error States**:
  - Shimmering skeleton cards during asynchronous loading.
  - Professional error state card with "Try Again" and default city recovery.
- **Responsive Architecture**:
  - Optimized for desktop, laptops, tablets, and mobile devices without horizontal overflow.

## Tech Stack

- **React 19**
- **Vite**
- **JavaScript (ES Modules)**
- **Vanilla CSS (Variables, Flexbox, CSS Grid, SVG styling)**
- **Lucide React Icons**

## Project Structure

```
Weather-app/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── CurrentWeather.jsx
│   │   ├── ErrorMessage.jsx
│   │   ├── Forecast.jsx
│   │   ├── ForecastItem.jsx
│   │   ├── Header.jsx
│   │   ├── HourlyForecast.jsx
│   │   ├── Loading.jsx
│   │   ├── SearchBar.jsx
│   │   ├── TemperatureGraph.jsx
│   │   ├── ThemeToggle.jsx
│   │   ├── WeatherIcon.jsx
│   │   ├── WeatherStats.jsx
│   │   └── WeatherVisual.jsx
│   ├── data/
│   │   └── mockWeather.js
│   ├── services/
│   │   └── weatherService.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── package.json
└── vite.config.js
```

## How to Run

1. **Install dependencies** (already installed):
   ```bash
   npm install
   ```

2. **Start development server**:
   ```bash
   npm run dev
   ```

3. **Build for production**:
   ```bash
   npm run build
   ```

4. **Preview production build**:
   ```bash
   npm run preview
   ```

5. **Lint check**:
   ```bash
   npm run lint
   ```

## Note on API Integration

This phase utilizes the modular mock data service layer (`src/services/weatherService.js`). **Real weather API integration has NOT been done yet**, keeping the project ready for live API keys in the next phase.
