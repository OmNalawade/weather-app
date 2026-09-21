// Mock weather data for pre-configured cities with realistic metrics
export const MOCK_CITIES_WEATHER = {
  pune: {
    city: 'Pune',
    country: 'India',
    date: 'Thursday, 12 September 2026',
    temperature: 28,
    condition: 'Sunny',
    conditionCode: 'sunny',
    high: 31,
    low: 21,
    windSpeed: '14 km/h',
    windDirection: 'NE',
    humidity: '65%',
    pressure: '1012 hPa',
    feelsLike: '30°C',
    coordinates: { lat: 18.5204, lon: 73.8567 },
    fiveDayForecast: [
      { day: 'Fri', condition: 'sunny', high: 31, low: 22 },
      { day: 'Sat', condition: 'rainy', high: 27, low: 20 },
      { day: 'Sun', condition: 'cloudy', high: 28, low: 21 },
      { day: 'Mon', condition: 'sunny', high: 30, low: 22 },
      { day: 'Tue', condition: 'partly-cloudy', high: 29, low: 21 }
    ],
    hourlyForecast: [
      { time: '8 AM', temp: 26, condition: 'sunny' },
      { time: '9 AM', temp: 27, condition: 'sunny' },
      { time: '10 AM', temp: 28, condition: 'sunny' },
      { time: '11 AM', temp: 29, condition: 'partly-cloudy' },
      { time: '12 PM', temp: 30, condition: 'partly-cloudy' },
      { time: '1 PM', temp: 31, condition: 'cloudy' }
    ]
  },
  mumbai: {
    city: 'Mumbai',
    country: 'India',
    date: 'Thursday, 12 September 2026',
    temperature: 32,
    condition: 'Partly Cloudy',
    conditionCode: 'partly-cloudy',
    high: 34,
    low: 26,
    windSpeed: '18 km/h',
    windDirection: 'W',
    humidity: '82%',
    pressure: '1008 hPa',
    feelsLike: '38°C',
    coordinates: { lat: 19.0760, lon: 72.8777 },
    fiveDayForecast: [
      { day: 'Fri', condition: 'partly-cloudy', high: 33, low: 26 },
      { day: 'Sat', condition: 'rainy', high: 30, low: 25 },
      { day: 'Sun', condition: 'rainy', high: 31, low: 25 },
      { day: 'Mon', condition: 'partly-cloudy', high: 33, low: 26 },
      { day: 'Tue', condition: 'sunny', high: 34, low: 27 }
    ],
    hourlyForecast: [
      { time: '8 AM', temp: 29, condition: 'sunny' },
      { time: '9 AM', temp: 30, condition: 'partly-cloudy' },
      { time: '10 AM', temp: 31, condition: 'partly-cloudy' },
      { time: '11 AM', temp: 32, condition: 'cloudy' },
      { time: '12 PM', temp: 33, condition: 'partly-cloudy' },
      { time: '1 PM', temp: 34, condition: 'sunny' }
    ]
  },
  delhi: {
    city: 'Delhi',
    country: 'India',
    date: 'Thursday, 12 September 2026',
    temperature: 35,
    condition: 'Sunny',
    conditionCode: 'sunny',
    high: 38,
    low: 27,
    windSpeed: '8 km/h',
    windDirection: 'E',
    humidity: '48%',
    pressure: '1006 hPa',
    feelsLike: '39°C',
    coordinates: { lat: 28.6139, lon: 77.2090 },
    fiveDayForecast: [
      { day: 'Fri', condition: 'sunny', high: 38, low: 28 },
      { day: 'Sat', condition: 'sunny', high: 39, low: 28 },
      { day: 'Sun', condition: 'partly-cloudy', high: 37, low: 27 },
      { day: 'Mon', condition: 'cloudy', high: 35, low: 26 },
      { day: 'Tue', condition: 'sunny', high: 36, low: 26 }
    ],
    hourlyForecast: [
      { time: '8 AM', temp: 30, condition: 'sunny' },
      { time: '9 AM', temp: 32, condition: 'sunny' },
      { time: '10 AM', temp: 34, condition: 'sunny' },
      { time: '11 AM', temp: 36, condition: 'sunny' },
      { time: '12 PM', temp: 37, condition: 'sunny' },
      { time: '1 PM', temp: 38, condition: 'sunny' }
    ]
  },
  bangalore: {
    city: 'Bangalore',
    country: 'India',
    date: 'Thursday, 12 September 2026',
    temperature: 24,
    condition: 'Partly Cloudy',
    conditionCode: 'partly-cloudy',
    high: 27,
    low: 19,
    windSpeed: '20 km/h',
    windDirection: 'ESE',
    humidity: '60%',
    pressure: '1014 hPa',
    feelsLike: '24°C',
    coordinates: { lat: 12.9716, lon: 77.5946 },
    fiveDayForecast: [
      { day: 'Fri', condition: 'partly-cloudy', high: 26, low: 19 },
      { day: 'Sat', condition: 'rainy', high: 24, low: 18 },
      { day: 'Sun', condition: 'rainy', high: 25, low: 18 },
      { day: 'Mon', condition: 'cloudy', high: 26, low: 19 },
      { day: 'Tue', condition: 'sunny', high: 27, low: 19 }
    ],
    hourlyForecast: [
      { time: '8 AM', temp: 21, condition: 'cloudy' },
      { time: '9 AM', temp: 22, condition: 'partly-cloudy' },
      { time: '10 AM', temp: 23, condition: 'partly-cloudy' },
      { time: '11 AM', temp: 25, condition: 'sunny' },
      { time: '12 PM', temp: 26, condition: 'partly-cloudy' },
      { time: '1 PM', temp: 27, condition: 'partly-cloudy' }
    ]
  },
  hyderabad: {
    city: 'Hyderabad',
    country: 'India',
    date: 'Thursday, 12 September 2026',
    temperature: 29,
    condition: 'Partly Cloudy',
    conditionCode: 'partly-cloudy',
    high: 32,
    low: 22,
    windSpeed: '12 km/h',
    windDirection: 'SE',
    humidity: '58%',
    pressure: '1011 hPa',
    feelsLike: '31°C',
    coordinates: { lat: 17.3850, lon: 78.4867 },
    fiveDayForecast: [
      { day: 'Fri', condition: 'partly-cloudy', high: 32, low: 23 },
      { day: 'Sat', condition: 'sunny', high: 33, low: 23 },
      { day: 'Sun', condition: 'rainy', high: 29, low: 21 },
      { day: 'Mon', condition: 'partly-cloudy', high: 31, low: 22 },
      { day: 'Tue', condition: 'sunny', high: 32, low: 22 }
    ],
    hourlyForecast: [
      { time: '8 AM', temp: 25, condition: 'sunny' },
      { time: '9 AM', temp: 27, condition: 'sunny' },
      { time: '10 AM', temp: 28, condition: 'partly-cloudy' },
      { time: '11 AM', temp: 30, condition: 'partly-cloudy' },
      { time: '12 PM', temp: 31, condition: 'partly-cloudy' },
      { time: '1 PM', temp: 32, condition: 'partly-cloudy' }
    ]
  },
  chennai: {
    city: 'Chennai',
    country: 'India',
    date: 'Thursday, 12 September 2026',
    temperature: 33,
    condition: 'Cloudy',
    conditionCode: 'cloudy',
    high: 36,
    low: 27,
    windSpeed: '16 km/h',
    windDirection: 'SSE',
    humidity: '75%',
    pressure: '1009 hPa',
    feelsLike: '39°C',
    coordinates: { lat: 13.0827, lon: 80.2707 },
    fiveDayForecast: [
      { day: 'Fri', condition: 'cloudy', high: 35, low: 27 },
      { day: 'Sat', condition: 'rainy', high: 32, low: 25 },
      { day: 'Sun', condition: 'partly-cloudy', high: 34, low: 26 },
      { day: 'Mon', condition: 'sunny', high: 36, low: 27 },
      { day: 'Tue', condition: 'partly-cloudy', high: 35, low: 27 }
    ],
    hourlyForecast: [
      { time: '8 AM', temp: 29, condition: 'cloudy' },
      { time: '9 AM', temp: 31, condition: 'cloudy' },
      { time: '10 AM', temp: 33, condition: 'partly-cloudy' },
      { time: '11 AM', temp: 34, condition: 'partly-cloudy' },
      { time: '12 PM', temp: 35, condition: 'cloudy' },
      { time: '1 PM', temp: 36, condition: 'partly-cloudy' }
    ]
  },
  nashik: {
    city: 'Nashik',
    country: 'India',
    date: 'Thursday, 12 September 2026',
    temperature: 26,
    condition: 'Sunny',
    conditionCode: 'sunny',
    high: 29,
    low: 19,
    windSpeed: '11 km/h',
    windDirection: 'NE',
    humidity: '62%',
    pressure: '1013 hPa',
    feelsLike: '26°C',
    coordinates: { lat: 19.9975, lon: 73.7898 },
    fiveDayForecast: [
      { day: 'Fri', condition: 'sunny', high: 29, low: 19 },
      { day: 'Sat', condition: 'partly-cloudy', high: 28, low: 18 },
      { day: 'Sun', condition: 'rainy', high: 25, low: 17 },
      { day: 'Mon', condition: 'sunny', high: 28, low: 18 },
      { day: 'Tue', condition: 'sunny', high: 29, low: 19 }
    ],
    hourlyForecast: [
      { time: '8 AM', temp: 22, condition: 'sunny' },
      { time: '9 AM', temp: 24, condition: 'sunny' },
      { time: '10 AM', temp: 26, condition: 'sunny' },
      { time: '11 AM', temp: 27, condition: 'sunny' },
      { time: '12 PM', temp: 28, condition: 'partly-cloudy' },
      { time: '1 PM', temp: 29, condition: 'sunny' }
    ]
  }
};

export const POPULAR_CITIES = [
  'Pune',
  'Mumbai',
  'Delhi',
  'Bangalore',
  'Hyderabad',
  'Chennai',
  'Nashik'
];
