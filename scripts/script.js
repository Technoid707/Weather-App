//API KEY
const apiKey = "bc03f3a0f499d8dbfa176968d2cdf96e";
let unit = "metric";

function searchCity(city){
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${apiKey}`;
  axios.get(apiUrl).then(displayWeatherCondition);
}


function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#searchCity").value;
  searchCity(city);
  
}

function displayWeatherCondition(response) {
  console.log(response);
  document.querySelector("#location").innerHTML = response.data.name;
  document.querySelector("#temp").innerHTML = Math.round(response.data.main.temp);
  document.querySelector("#weatherDesc").innerHTML = response.data.weather[0].description;
  document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  let weatherIcon = document.querySelector("img#weather-icon");
  weatherIcon.setAttribute("src", `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png` )
  weatherIcon.setAttribute("alt", response.data.weather[0].description);

  convertDegree(Math.round(response.data.main.temp));
}


  function searchLocation(position) {
    console.log(position);
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayWeatherCondition);
  }

  
  function getCurrentLocation(event){
    debugger;
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(searchLocation);
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
  let minute = time.getMinutes();
  let date = weekday[time.getDay()] + " " + hour + ":" + minute;
  //display the time in the html location
  let cTime = document.querySelector("#currentTime");
  cTime.innerHTML = date;
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

displayCurrentDate();
searchCity("New York");

//Display the search items
let form = document.querySelector("#searchEngine");
form.addEventListener("submit", handleSubmit);

let currentLocation = document.querySelector("#currentLoc");
currentLocation.addEventListener("click", getCurrentLocation);
