# 🌦️ Atmos — Modern Weather Dashboard

A modern, responsive weather dashboard built with **React and Vite**, providing real-time weather information, forecasts, hourly temperature trends, city search, geolocation, interactive maps, and theme customization.

🔗 **Live Demo:** https://weather-app-sigma-eight-44.vercel.app/

---

## ✨ Features

### 🌤️ Real-Time Weather

- Live weather data powered by OpenWeather API
- Current temperature and weather conditions
- High / low temperature
- Feels-like temperature
- Humidity
- Atmospheric pressure
- Wind speed and direction
- Dynamic weather icons and day/night conditions

### 📅 Weather Forecast

- 5-day weather forecast
- Daily high and low temperatures
- Weather condition indicators
- Responsive forecast cards

### ⏱️ Hourly Forecast

- Hourly weather information
- Temperature trend visualization
- Weather condition indicators
- Interactive temperature graph

### 🔎 City Search

- Search weather by city
- City suggestions
- Fast weather updates
- Support for multiple cities

### 📍 Current Location

- Browser geolocation support
- Automatically fetch weather for the user's current location
- Graceful location permission handling

### 🗺️ Interactive Weather Map

- Integrated Google Maps
- Location-based weather experience
- Interactive map interface

### 🌓 Dark & Light Mode

- Modern dark atmospheric theme
- Clean light theme
- Theme preference saved using `localStorage`

### 📱 Responsive Design

Designed to work across:

- 💻 Desktop
- 💻 Laptop
- 📱 Mobile
- 📟 Tablet

---

## 🛠️ Tech Stack

| Technology | Usage |
|---|---|
| React | Frontend UI |
| Vite | Development & build tool |
| JavaScript | Application logic |
| CSS | Responsive styling |
| Lucide React | UI icons |
| OpenWeather API | Real-time weather data |
| Google Maps API | Interactive maps |
| React Router | Page navigation |
| Vercel | Deployment |

---

## 📂 Project Structure

```text
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
⚙️ Getting Started
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

⚠️ Never commit your actual API keys to GitHub.

5. Start the development server
npm run dev

Open the local development URL shown in the terminal.

🏗️ Production Build

Create a production build:

npm run build

Preview the production build:

npm run preview

Run ESLint:

npm run lint
🔐 API Configuration

Atmos uses external APIs for live weather and map functionality.

OpenWeather API

Used for:

Current weather
Forecast data
Hourly weather information
Weather conditions
Temperature
Wind
Humidity
Atmospheric pressure
Google Maps API

Used for:

Interactive maps
Location visualization
Map-based weather experience

API keys should be stored in environment variables and restricted appropriately.

🚀 Deployment

Atmos is deployed using Vercel.

Live Application

🔗 https://weather-app-sigma-eight-44.vercel.app/

The application is accessible from both desktop and mobile browsers.

🎯 Project Goals

Atmos was built to create a clean and modern weather experience while practicing:

React development
API integration
Responsive UI design
Component-based architecture
Geolocation APIs
Google Maps integration
Data visualization
Theme management
Production deployment
🔮 Future Improvements

Planned improvements include:

🔐 User authentication
👤 User profiles
⭐ Favorite cities
💾 Saved locations
🕐 Live date & time
🔔 Weather alerts
📊 More weather analytics
🌍 Additional weather data
🎨 Further UI improvements
👨‍💻 Author

Om Nalawade

Computer Science & Engineering Student

🔗 GitHub: https://github.com/OmNalawade

📄 License

This project is created for learning, development, and portfolio purposes.


> Real weather API integration has NOT been done yet

Your current project **does use live OpenWeather data**, so that statement is outdated.
