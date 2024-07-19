const WEATHER_API_BASE_URL = 'https://api.openweathermap.org';
const WEATHER_API_KEY = 'f23ee9deb4e1a7450f3157c44ed020e1';
const MAX_DAILY_FORECAST = 5;

const searchHistoryEl = document.getElementById('search-history-div');
const tempSpanEl = document.getElementById('temp-span');
const windSpanEl = document.getElementById('wind-span');
const humiditySpanEl = document.getElementById('humidity-span');
const currentLocationEl = document.getElementById('current-location');
const currentDateSpanEl = document.getElementById('current-date');
const cloudIconImgEl = document.getElementById('cloud-icon');

const searchInputEl = document.getElementById('search-box');
const searchButtonEl = document.getElementById('submit-btn');

const savedCities = JSON.parse(localStorage.getItem('city-key')) || [];

savedCities.forEach(function (element) {
  searchHistoryEl.innerHTML += `<div class="recent-searches">${element}</div>`;
});

let search;
function clickSearchBtn() {
  search = searchInputEl.value;
  searchHistoryEl.innerHTML += `<div class="recent-searches">${search}</div>`;
  savedCities.push(search);
  localStorage.setItem('city-key', JSON.stringify(savedCities));

  fetchWeatherData(search);
}

$(document).on('click', '.recent-searches', function (event) {
  search = $(this).text();
  fetchWeatherData(search);
});

function fetchWeatherData(city) {
  const apiUrl = `${WEATHER_API_BASE_URL}/geo/1.0/direct?q=${city}&limit=5&appid=${WEATHER_API_KEY}`;
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      const lat = data[0].lat;
      const lon = data[0].lon;
      currentLocationEl.textContent = data[0].name;

      const weatherApiUrl = `${WEATHER_API_BASE_URL}/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=minutely,hourly&appid=${WEATHER_API_KEY}`;

      fetch(weatherApiUrl)
        .then(response => response.json())
        .then(data => {
          updateCurrentWeather(data);
          updateForecast(data);
        })
        .catch(error => {
          console.error('Error fetching weather data:', error);
        });
    })
    .catch(error => {
      console.error('Error fetching location data:', error);
    });
}

function updateCurrentWeather(data) {
  humiditySpanEl.textContent = data.current.humidity;
  windSpanEl.textContent = data.current.wind_speed;
  tempSpanEl.textContent = data.current.temp;
  const currentDate = data.current.dt;
  currentDateSpanEl.textContent = dayjs.unix(currentDate).format('YYYY-MM-DD');

  const weatherIconURL = `http://openweathermap.org/img/wn/${data.current.weather[0].icon}.png`;
  cloudIconImgEl.setAttribute('src', weatherIconURL);
}

function updateForecast(data) {
  $('#forecast-days .forecast-day').each(function (index) {
    if (index < MAX_DAILY_FORECAST) {
      const unixDate = data.daily[index].dt;
      const normalDate = dayjs.unix(unixDate).format('YYYY-MM-DD');
      $(this).find('.date').text(`Date: ${normalDate}`);
      $(this).find('.temp').text(`Temp: ${data.daily[index].temp.day}`);
      $(this).find('.wind').text(`Wind: ${data.daily[index].wind_speed}`);
      $(this).find('.humidity').text(`Humidity: ${data.daily[index].humidity}`);
      const forecastIconURL = `http://openweathermap.org/img/wn/${data.daily[index].weather[0].icon}.png`;
      $(this).find('.forecast-icon').attr('src', forecastIconURL);
    }
  });
}

searchButtonEl.addEventListener('click', clickSearchBtn);
