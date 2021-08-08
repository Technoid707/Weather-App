//API KEY
const apiKey = "bc03f3a0f499d8dbfa176968d2cdf96e";
let unit = "metric";
let loc = document.querySelector("#location");
let temp = document.querySelector("#temp");
let weatherDescription = document.querySelector("#weatherDesc");
function showWeather(response) {
  //City Temperature
  let cityTemp = Math.round(response.data.main.temp);
  temp.innerHTML = cityTemp;
  //Weather Description
  weatherDescription.innerHTML = response.data.weather[0].description;

  convertDegree(cityTemp);
}

function convertDegree(cityTemp) {
  //Convert celcius to Farenheight
  let celsius = document.querySelector("#celsius");
  celsius.addEventListener("click", displayC);
  let fahrenheit = document.querySelector("#fahrenheit");
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

//Display the search items
let form = document.querySelector("#searchEngine");
form.addEventListener("submit", displayCity);

function displayCity(event) {
  event.preventDefault();

  let searchCity = document.querySelector("#searchCity");
  loc.innerHTML = searchCity.value;

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchCity.value}&units=${unit}&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeather);
}

let currentLocation = document.querySelector("#currentLoc");
currentLocation.addEventListener("click", displayCurrentLocationWeather);

function displayCurrentLocationWeather() {
  navigator.geolocation.getCurrentPosition(CurrentLocation);
  function CurrentLocation(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${unit}&appid=${apiKey}`;
    axios.get(apiUrl).then(currentWeather);
  }

  function currentWeather(response) {
    loc.innerHTML = response.data.name;
    let currentCityTemp = Math.round(response.data.main.temp);
    temp.innerHTML = currentCityTemp;
    weatherDescription.innerHTML = response.data.weather[0].description;
    console.log(response);
    convertDegree(currentCityTemp);
  }
}

function displayCurrentDate() {
  //Current Time
  let time = new Date();
  let weekday = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  let hour = time.getHours();
  let minute = time.getMinutes();
  let date = weekday[time.getDay()] + " " + hour + ":" + minute;
  //display the time in the html location
  let cTime = document.querySelector("#currentTime");
  cTime.innerHTML = date;
}

displayCurrentDate();
