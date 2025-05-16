# Weather Forecast App

## Overview
A Node.js web app using Express.js to display current weather and a 5-day forecast by city, powered by OpenWeatherMap and Google Geocoding APIs. Features a responsive UI with EJS and CSS.

## Features
- Current weather: Temperature, feels-like, humidity, wind, pressure, cloud cover, rainfall.
- 5-day forecast: Daily weather at 12:00 PM.
- Responsive design: Mobile-friendly for screens <810px.
- Search by city with error handling.

## Tech Stack
- Node.js, Express.js
- EJS for templating
- Axios for API calls
- OpenWeatherMap & Google Geocoding APIs
- CSS with Montserrat/Caveat fonts
- jQuery (minimal use)

## Prerequisites
- Node.js (v14+)
- npm
- API keys: [OpenWeatherMap](https://openweathermap.org/api), [Google Geocoding](https://developers.google.com/maps/documentation/geocoding)

## Installation
1. Clone repo: `git clone <url> && cd <folder>`
2. Install: `npm install`
3. Create `.env`:
   ```env
   openweatherAPI=<your-openweather-key>
   googleAPI=<your-google-key>
   ```
4. Run: `node index.js`
5. Visit: `http://localhost:3000`

## Structure
```
├── public/              # Images, styles.css
├── views/index.ejs      # Main template
├── .env                 # API keys
├── .gitignore           # Ignores node_modules, .env
├── index.js             # App logic
├── package.json         # Dependencies
└── README.md
```

## Usage
- Search city name to view weather and forecast.
- Click forecast dates for details.

## Endpoints
- `GET /`: Homepage
- `POST /search`: Fetch and display weather
- `POST /forecast`: Show forecast details

## Notes
- Temperature in Celsius (converted from Kelvin).
- Wind speed in km/h (from m/s).
- Forecast shows 12:00 PM data.
- Keep API keys secure.

## Contributing
Fork, branch, commit, push, and submit a pull request.

## License
MIT License