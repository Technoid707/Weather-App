//API KEY
const apiKey = "bc03f3a0f499d8dbfa176968d2cdf96e";
let unit = "metric";

function searchCity(city) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${apiKey}`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#searchCity").value;
  searchCity(city);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  console.log(date);

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  console.log(forecast);
  forecastElement = document.querySelector("#forecast");
  forecastHTML = `<div class="row weekdays-weather justify-content-center">`;
  forecast.forEach(function (forecastDays, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        ` 
    <div class="daily-forcast col-2 m-2">
      <div class="weather-forcast-date">${formatDay(forecastDays.dt)}</div>
      <img src="http://openweathermap.org/img/wn/${
        forecastDays.weather[0].icon
      }@2x.png" alt="" width="60" />
      <div class="weather-forecast-temperature">
        <span class="weather-forecast-temperature-max ">&#176;${Math.round(
          forecastDays.temp.max
        )}</span>
        <span class="weather-forecast-temperature-min">&#176;${Math.round(
          forecastDays.temp.min
        )}</span>
      </div>
    </div>
    `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;

  forecastElement.innerHTML = forecastHTML;
  //console.log(forecastHTML);
}

function getForecast(coordinates) {
  //console.log(coordinates);
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=${unit}`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

function displayWeatherCondition(response) {
  // console.log(response);
  let weatherDescription = response.data.weather[0].description;
  console.log(weatherDescription);
  document.querySelector("#location").innerHTML = response.data.name;
  document.querySelector("#temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#weatherDesc").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#wind").innerHTML =
    Math.round(response.data.wind.speed) + " mph";
  document.querySelector("#humidity").innerHTML =
    response.data.main.humidity + "%";
  let weatherIcon = document.querySelector("img#weather-icon");
  weatherIcon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  weatherIcon.setAttribute("alt", response.data.weather[0].description);

  convertDegree(Math.round(response.data.main.temp));
  getForecast(response.data.coord);
}

function searchLocation(position) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

//Convert celcius to Farenheight
function convertDegree(cityTemp) {
  let celsius = document.querySelector("#celsius");
  let fahrenheit = document.querySelector("#fahrenheit");
  celsius.addEventListener("click", displayC);
  fahrenheit.addEventListener("click", displayF);

  function displayC(event) {
    event.preventDefault();
    temp.innerHTML = cityTemp;
  }

  function displayF(event) {
    event.preventDefault();
    temp.innerHTML = Math.round(cityTemp * 1.8 + 32);
  }
}

function displayCurrentDate() {
  //Current Time
  let time = new Date();
  let weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let hour = time.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }

  let minute = time.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }

  let date = weekday[time.getDay()] + " " + hour + ":" + minute;
  //display the time in the html location
  let cTime = document.querySelector("#currentTime");
  cTime.innerHTML = date;
}

//Display the search items
let form = document.querySelector("#searchEngine");
form.addEventListener("submit", handleSubmit);

let currentLocation = document.querySelector("#currentLoc");
currentLocation.addEventListener("click", getCurrentLocation);

displayCurrentDate();
searchCity("New York");

function changeBG() {
  document.getElementById("weatherBG").style.backgroundColor = "purple";
  document.getElementById("weatherBG").style.borderRadius = "20px";
}

let backgroundImg = document.querySelector("#bgImg-btn");
backgroundImg.addEventListener("click", changeBG);
