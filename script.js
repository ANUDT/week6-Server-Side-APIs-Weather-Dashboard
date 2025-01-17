const WEATHER_API_BASE_URL = 'https://api.openweathermap.org/data/2.5';
const WEATHER_API_KEY = 'f23ee9deb4e1a7450f3157c44ed020e1';
const GEO_API_BASE_URL = 'https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}'
const MAX_DAILY_FORECAST = 5;
api_url = 'http://api.openweathermap.org/data/2.5/weather?lat=' +
          lat + '&lon=' + 
          lon + '&units=metric&appid=b231606340553d9174136f7f083904b3';
          APPID: '53f9d8e4213222cf517d86dc406d67fc'

navigator.geolocation.getCurrentPosition((position) => {
    const lat = position.coords.latitude;
    const long = position.coords.longitude;
    const apiKey = '<f23ee9deb4e1a7450f3157c44ed020e1>';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}`;

    const numbers = [1, 2, 3, 4, 5];

const evenNumbers = numbers.filter(function (number) {
  return number % 2 === 0;
});

console.log(evenNumbers); // Output: [2, 4]
  
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        const temp = data.main.temp;
        console.log(`The current temperature is ${temp} degrees Celsius at latitude ${lat} and longitude ${long}.`);
      })
      .catch(error => console.log(error));
  });

const searchInputEl = document.getElementById('search-box');
const searchButtonEl = document.getElementById('submit-btn');
const errorMsgEl = document.getElementById('error-msg');
const searchHistoryEl = document.getElementById('search-history-div');
const currentWeatherEl = document.getElementById('current-weather');
const forecastEl = document.getElementById('forecast');
const currentLocationEl = document.getElementById('current-location');
const currentDateEl = document.getElementById('current-date');
const currentIconEl = document.getElementById('current-icon');
const currentTempEl = document.getElementById('current-temp');
const currentWindEl = document.getElementById('current-wind');
const currentHumidityEl = document.getElementById('current-humidity');
const forecastDaysEl = document.getElementById('forecast-days');

window.onload = loadPreviouslySearchedCities();

let searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];

function displaySearchHistory() {
    searchHistoryEl.innerHTML = '';
    searchHistory.forEach(city => {
        const cityEl = document.createElement('a');
        cityEl.classList.add('collection-item');
        cityEl.textContent = city;
        cityEl.addEventListener('click', () => {
            fetchWeatherData(city);
        });
        searchHistoryEl.appendChild(cityEl);
    });
}

function saveSearchHistory(city) {
    if (!searchHistory.includes(city)) {
        searchHistory.push(city);
        localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
        displaySearchHistory();
    }
}

function fetchWeatherData(city) {
    const geoApiUrl = `${GEO_API_BASE_URL}?q=${city}&limit=1&appid=${WEATHER_API_KEY}`;
    
    fetch(geoApiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.length === 0) {
                errorMsgEl.textContent = 'Location not found. Please try again.';
                return;
            }
            errorMsgEl.textContent = '';
            const { lat, lon, name } = data[0];
            currentLocationEl.textContent = name;
            saveSearchHistory(name);
            
            const weatherApiUrl = `${WEATHER_API_BASE_URL}/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${WEATHER_API_KEY}`;
            return fetch(weatherApiUrl);
        })
        .then(response => response.json())
        .then(data => {
            if (!data) return;

            updateCurrentWeather(data);
            updateForecast(data);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });
}

function updateCurrentWeather(data) {
    const currentWeather = data.list[0];
    currentTempEl.textContent = currentWeather.main.temp;
    currentWindEl.textContent = currentWeather.wind.speed;
    currentHumidityEl.textContent = currentWeather.main.humidity;
    currentDateEl.textContent = new Date(currentWeather.dt_txt).toLocaleDateString();

    const weatherIconUrl = `http://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@2x.png`;
    currentIconEl.src = weatherIconUrl;
}

function updateForecast(data) {
    forecastDaysEl.innerHTML = '';
    const dailyData = data.list.filter(item => item.dt_txt.includes('12:00:00'));

    dailyData.forEach(day => {
        const dayEl = document.createElement('div');
        dayEl.classList.add('col', 's12', 'm2', 'card', 'blue', 'lighten-4');

        const dateEl = document.createElement('p');
        dateEl.textContent = new Date(day.dt_txt).toLocaleDateString();
        dayEl.appendChild(dateEl);

        const iconEl = document.createElement('img');
        const iconUrl = `http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`;
        iconEl.src = iconUrl;
        dayEl.appendChild(iconEl);

        const tempEl = document.createElement('p');
        tempEl.textContent = `Temp: ${day.main.temp}°C`;
        dayEl.appendChild(tempEl);

        const windEl = document.createElement('p');
        windEl.textContent = `Wind: ${day.wind.speed} m/s`;
        dayEl.appendChild(windEl);

        const humidityEl = document.createElement('p');
        humidityEl.textContent = `Humidity: ${day.main.humidity}%`;
        dayEl.appendChild(humidityEl);

        forecastDaysEl.appendChild(dayEl);
    });
}

searchButtonEl.addEventListener('click', () => {
    const city = searchInputEl.value.trim();
    if (city) {
        fetchWeatherData(city);
        searchInputEl.value = '';

    https://enlight.nyc/projects/weather#:~:text=actual%20weather%20data.-,function%20getWeather()%20%7B%0A%20%20let%20temperature%20%3D%20document.getElementById(,%7B%0A%20%20%20%20location.innerHTML%20%3D%20%22Unable%20to%20retrieve%20your%20location%22%3B%0A%20%20%7D%0A%7D%0A%0AgetWeather()%3B,-There%20you%20have;

});
displaySearchHistory();
