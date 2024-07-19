const WEATHER_API_BASE_URL = 'https://api.openweathermap.org';
const WEATHER_API_KEY = 'f23ee9deb4e1a7450f3157c44ed020e1';
const MAX_DAILY_FORECAST = 5;

var searchHistoryEl = document.getElementById('search-history-div')
var tempSpanEl = document.getElementById('temp-span')
var windSpanEl = document.getElementById('wind-span')
var humiditySpanEl = document.getElementById('humidity-span')
var currentLocationEl = document.getElementById('current-location')
var currentDateSpanEl = document.getElementById('current-date')
var cloudIconImgEl = document.getElementById('cloud-icon')

const searchInputEl = document.getElementById('search-box');
const searchButtonEl = document.getElementById('submit-btn');


var savedCities = JSON.parse(localStorage.getItem('city-key')) || []


savedCities.forEach(function (element) {
  searchHistoryEl.innerHTML += `<div class="recent-searches">${element}<div>`
})




let search;
function clickSearchBtn() {
  search = searchInputEl.value
  searchHistoryEl.innerHTML += `<div class="recent-searches">${search}<div>`
  savedCities.push(search)
  localStorage.setItem('city-key', JSON.stringify(savedCities))

  doSomething()
}



$(document).on('click', '.recent-searches', function (event) {
  search = $(this).text()
  doSomething()
})


function doSomething() {

  var apiUrl = `${WEATHER_API_BASE_URL}/geo/1.0/direct?q=${search}&limit=5&appid=${WEATHER_API_KEY}`;
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {

      console.log(data);


      var lat = data[0].lat;
      var lon = data[0].lon;
      currentLocationEl.textContent = data[0].name


      var apiUrl = `${WEATHER_API_BASE_URL}/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=minutely,hourly&appid=${WEATHER_API_KEY}`;

      fetch(apiUrl)
        .then(response => response.json())
        .then(data => {

          console.log(data);


          humiditySpanEl.textContent = data.current.humidity
          windSpanEl.textContent = data.current.wind_speed
          tempSpanEl.textContent = data.current.temp
          var currentDate = data.current.dt
          currentDateSpanEl.textContent = dayjs.unix(currentDate).format('YYYY-MM-DD')

          var weatherIconURL = `http://openweathermap.org/img/wn/${data.current.weather[0].icon}.png`;
          cloudIconImgEl.setAttribute('src', weatherIconURL)
          $('#forecast-days .forecast-day').each(function (index) {

            var unixDate = data.daily[index].dt
            var normalDate = dayjs.unix(unixDate).format('YYYY-MM-DD')
            $(this).children('.date').text('Date: ' + normalDate)
            $(this).children('.temp').text('Temp: ' + data.daily[index].temp.day)
            $(this).children('.wind').text('Wind: ' + data.daily[index].wind_speed)
            $(this).children('.humidity').text('Humidity: ' + data.daily[index].humidity)
            var forecastIconURL = `http://openweathermap.org/img/wn/${data.daily[index].weather[0].icon}.png`;
            $(this).children('.forecast-icon').attr('src', forecastIconURL)

          })
        })
    })
}
searchButtonEl.addEventListener('click', clickSearchBtn)