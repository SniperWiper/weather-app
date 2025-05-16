Weather Forecast Application
Overview
This is a Node.js web application built with Express.js that provides current weather information and a 5-day forecast for any city. It integrates with the OpenWeatherMap API for weather data and Google Geocoding API to convert city names into coordinates. The application features a responsive user interface styled with CSS and displays weather details such as temperature, humidity, wind speed, and more.
Features

Current Weather: Displays real-time weather data including temperature, feels-like temperature, humidity, pressure, wind speed, wind direction, cloud cover, and recent rainfall.
5-Day Forecast: Shows daily weather forecasts for the next five days at 12:00 PM, including temperature and weather conditions.
Responsive Design: Adapts to different screen sizes, with a mobile-friendly layout for screens smaller than 810px.
Search Functionality: Users can search for weather by city name, with results rendered dynamically using EJS templates.
Error Handling: Gracefully handles invalid locations or server errors with appropriate user feedback.

Technologies Used

Node.js & Express.js: Backend framework for handling routes and API requests.
EJS: Templating engine for dynamic HTML rendering.
Axios: For making HTTP requests to external APIs.
Google Geocoding API: Converts city names to latitude and longitude.
OpenWeatherMap API: Provides current weather and forecast data.
CSS: Custom styles with responsive design using media queries.
Fonts: Montserrat and Caveat from Google Fonts for typography.
jQuery: Included for potential client-side scripting (not heavily utilized).

Prerequisites

Node.js (v14 or higher)
npm (Node Package Manager)
API keys for:
OpenWeatherMap API
Google Geocoding API



Installation

Clone the Repository:
git clone <repository-url>
cd <repository-folder>


Install Dependencies:
npm install


Set Up Environment Variables:

Create a .env file in the project root.
Add the following:openweatherAPI=<your-openweathermap-api-key>
googleAPI=<your-google-geocoding-api-key>




Run the Application:
node index.js

The server will start on http://localhost:3000.


Project Structure
├── public/
│   ├── images/          # Weather icons and error images
│   └── styles.css       # CSS styles for the application
├── views/
│   └── index.ejs        # Main EJS template for rendering weather data
├── .env                 # Environment variables (API keys)
├── .gitignore           # Ignored files (e.g., node_modules, .env)
├── index.js             # Main application file
├── package.json         # Project metadata and dependencies
└── README.md            # This file

Usage

Open http://localhost:3000 in a browser.
Enter a city name in the search bar and submit.
View the current weather and 5-day forecast for the specified location.
Click on forecast dates to view detailed weather for that day.

API Endpoints

GET /: Renders the homepage with a search prompt.
POST /search: Handles city search, fetches weather data, and renders results.
POST /forecast: Displays detailed weather for a selected forecast day.

Notes

The application uses Kelvin-to-Celsius conversion for temperature data from OpenWeatherMap.
Wind speed is converted from m/s to km/h for user readability.
The forecast is filtered to show data for 12:00 PM each day.
Ensure API keys are kept secure and not exposed in version control (handled by .gitignore).

Contributing

Fork the repository.
Create a feature branch (git checkout -b feature-name).
Commit changes (git commit -m "Add feature").
Push to the branch (git push origin feature-name).
Open a pull request.

License
This project is licensed under the MIT License.
