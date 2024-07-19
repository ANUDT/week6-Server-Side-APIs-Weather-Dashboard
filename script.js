const WEATHER_API_BASE_URL = 'https://api.openweathermap.org';
const WEATHER_API_KEY = 'f23ee9deb4e1a7450f3157c44ed020e1';
const MAX_DAILY_FORECAST = 5;

var searchHistory2El = document.getElementById('search-history-div')
var tempSpan2El = document.getElementById('temp-span')
var windSpan2El = document.getElementById('wind-span')
var humiditySpan2El = document.getElementById('humidity-span')
var currentLocation2El = document.getElementById('current-location')
var currentDateSpan2El = document.getElementById('current-date')
var cloudIconImg2El = document.getElementById('cloud-icon')

const searchInput2El = document.getElementById('search-box');
const searchButton2El = document.getElementById('submit-btn');


var savedCities = JSON.parse(localStorage.getItem('city-key')) || []


savedCities.forEach(function (element) {
  searchHistoryEl.innerHTML += `<div class="recent-searches">${element}<div>`
})




let search;
function clickSearchBtn2() {
  search = searchInputEl.value
  searchHistory2El.innerHTML += `<div class="recent-searches">${search}<div>`
  savedCities.push(search)
  localStorage.setItem('city-key', JSON.stringify(savedCities))

  doSomething()
}



$(document).on('click', '.recent-searches', function (event) {
  search = $(this).text()
  doSomething2()
})


function doSomething2() {

  var apiUrl = `${WEATHER_API_BASE_URL}/geo/1.0/direct?q=${search}&limit=5&appid=${WEATHER_API_KEY}`;
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {

      console.log(data);


      var lat = data[0].lat;
      var lon = data[0].lon;
      currentLocation2El.textContent = data[0].name


      var apiUrl = `${WEATHER_API_BASE_URL}/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=minutely,hourly&appid=${WEATHER_API_KEY}`;

      fetch(apiUrl)
        .then(response => response.json())
        .then(data => {

          console.log(data);


          humiditySpan2El.textContent = data.current.humidity
          windSpan2El.textContent = data.current.wind_speed
          tempSpan2El.textContent = data.current.temp
          var currentDate = data.current.dt
          currentDateSpan2El.textContent = dayjs.unix(currentDate).format('YYYY-MM-DD')

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
searchButton2El.addEventListener('click', clickSearchBtn)