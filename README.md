# 🌦️ Atmos

**Modern Real-Time Weather Intelligence & Visualization Platform**

Atmos is a modern, responsive weather dashboard that provides real-time weather information, forecasts, hourly temperature trends, location-based weather, city search, and interactive map visualization. Built with React and Vite and deployed on Vercel.

---

## ✨ Key Features

### 🌤️ Real-Time Weather Intelligence

- **Live Weather Data** — Fetches current weather conditions using the OpenWeather API
- **Temperature Information** — Displays current, high, low, and feels-like temperatures
- **Weather Conditions** — Dynamically displays current weather conditions and appropriate weather icons
- **Wind Information** — Shows wind speed and direction
- **Humidity** — Displays current humidity levels
- **Atmospheric Pressure** — Provides current pressure information
- **Day/Night Awareness** — Weather visuals and icons adapt to daytime and nighttime conditions

### 📅 5-Day Weather Forecast

- **Daily Forecast** — Displays upcoming weather conditions for the next five days
- **Temperature Range** — Shows daily high and low temperatures
- **Weather Indicators** — Uses dynamic weather icons and conditions
- **Responsive Forecast Cards** — Optimized for desktop, tablet, and mobile layouts

### ⏱️ Hourly Forecast & Temperature Trends

- **Hourly Weather Data** — Displays upcoming hourly weather conditions
- **Temperature Visualization** — Interactive temperature trend graph
- **Weather Conditions** — Hourly weather icons and temperature indicators
- **Visual Temperature Trends** — Makes upcoming temperature changes easier to understand

### 🔎 City Search

- **City Search** — Search for weather information by city
- **Search Suggestions** — Interactive city suggestions
- **Fast Updates** — Weather information updates when a new city is selected
- **Multiple Cities** — Supports weather lookup across different locations

### 📍 Current Location

- **Browser Geolocation** — Detects the user's current location through browser permissions
- **Location-Based Weather** — Automatically retrieves weather for the detected location
- **Permission Handling** — Provides graceful handling when location access is unavailable

### 🗺️ Interactive Weather Map

- **Google Maps Integration** — Integrated Google Maps JavaScript API
- **Interactive Map** — Users can explore locations through the map interface
- **Location Visualization** — Provides a geographic view alongside weather information

### 🌓 Dark & Light Mode

- **Dark Atmospheric Theme** — Modern dark weather-focused interface
- **Light Theme** — Clean alternative light interface
- **Persistent Preference** — Theme selection is stored using `localStorage`
- **Responsive Styling** — Both themes adapt across screen sizes

### 📱 Responsive Architecture

Atmos is designed for:

- 💻 Desktop
- 💻 Laptop
- 📱 Mobile
- 📟 Tablet

The interface adapts to different screen sizes while maintaining a consistent user experience.

---

## 🔄 Weather Experience

The application follows a location-to-weather workflow:

```text
City Search / Current Location
            ↓
       Location Data
            ↓
     OpenWeather API
            ↓
     Current Weather
            ↓
   ┌────────┴────────┐
   ↓                 ↓
Forecast         Hourly Data
   ↓                 ↓
5-Day Forecast   Temperature Trends
            ↓
     Weather Visualization
            ↓
      Interactive Map
🌦️ Weather Data

Atmos uses the OpenWeather API to provide live weather information.

Data	Description
Temperature	Current temperature
Weather Condition	Current weather state
High / Low	Daily temperature range
Feels Like	Perceived temperature
Humidity	Current humidity
Wind	Speed and direction
Pressure	Atmospheric pressure
Forecast	Upcoming daily weather
Hourly Data	Upcoming hourly conditions

Weather icons and visual conditions dynamically respond to the weather data returned by the API.

🗺️ Location & Map Integration

Atmos integrates Google Maps to provide an interactive geographic experience.

Google Maps Integration
Interactive map interface
Location visualization
Map-based weather experience
Browser-compatible map rendering
API key configured through environment variables

The application combines weather information with geographic visualization to provide a more complete location-based weather experience.

🌓 Theme System

Atmos supports both dark and light themes.

Dark Mode
    ↓
Atmospheric Weather Interface

Light Mode
    ↓
Clean Weather Interface

The selected theme is persisted using browser localStorage, allowing the user's preference to remain after refreshing the application.

🛠️ Tech Stack
Layer	Technology
Frontend	React 19
Build Tool	Vite
Language	JavaScript
Styling	CSS
Icons	Lucide React
Weather API	OpenWeather API
Maps	Google Maps JavaScript API
Routing	React Router
State / UI	React Components & Hooks
Storage	Browser localStorage
Deployment	Vercel
📁 Project Structure
Weather-app/
├── public/
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── assets/
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── package.json
├── vite.config.js
└── README.md

The project uses a component-based React architecture to keep the weather interface modular and maintainable.

⚙️ Installation & Setup
1. Clone the repository
git clone https://github.com/OmNalawade/weather-app.git
2. Navigate to the project
cd weather-app
3. Install dependencies
npm install
4. Configure environment variables

Create a .env file in the project root:

VITE_OPENWEATHER_API_KEY=your_openweather_api_key
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key

⚠️ Never commit your real API keys to GitHub.

5. Start the development server
npm run dev

The terminal will provide the local development URL.

🏗️ Production Build

Create an optimized production build:

npm run build

Preview the production build locally:

npm run preview

Run the project's lint checks:

npm run lint
🔐 API Configuration
OpenWeather API

Atmos uses OpenWeather for live weather information.

The API key is provided through:

VITE_OPENWEATHER_API_KEY=your_openweather_api_key
Google Maps API

Google Maps is configured through:

VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key

API keys should be appropriately restricted and should never be committed directly to the repository.

🚀 Deployment

Atmos is deployed using Vercel.

🌐 Live Application

https://weather-app-sigma-eight-44.vercel.app/

The deployed application is accessible from both desktop and mobile browsers.

Deployment Workflow
React Application
       ↓
    GitHub
       ↓
     Vercel
       ↓
 Production Build
       ↓
 Live Atmos Application
🎯 Project Objective

Atmos was developed to build a complete modern weather experience while applying practical frontend development concepts.

The project demonstrates:

React component architecture
Real-world API integration
Responsive web design
Browser geolocation
Interactive map integration
Weather data visualization
Dynamic weather conditions
Theme persistence
Client-side routing
Production deployment

The goal was to combine a polished user interface with real-time external data and location-based functionality.

🔮 Future Improvements

Planned improvements include:

🔐 User authentication
👤 User profiles
⭐ Favorite cities
💾 Saved locations
🕐 Live date & time
🔔 Weather alerts
📊 Advanced weather analytics
🌍 Additional weather information
📍 Improved location management
🎨 Further UI and accessibility improvements
👨‍💻 Author

Om Nalawade

Computer Science & Engineering Student

🔗 GitHub:
https://github.com/OmNalawade

📄 License

This project is created for learning, development, and portfolio purposes.

Built with React · OpenWeather · Google Maps · Vercel · 2026
weather, themes, responsive UI, and Vercel deployment**.

This version will look much closer to the **RecoverAI-style professional README** you're aiming for.
