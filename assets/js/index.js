let now = new Date();

//Display Date
function displayDate(date) {
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let currentDay = days[now.getDay()];
  let currentMonth = months[now.getMonth()];
  let currentDate = now.getDate();
  let currentYear = now.getFullYear();

  let formattedDate = ` ${currentDay}, ${currentMonth} ${currentDate}, ${currentYear}`;

  return formattedDate;
}

let dateElement = document.querySelector("#date");
dateElement.innerHTML = displayDate(now);

//Display Time

function displayTime(time) {
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  } else if (hours < 1) {
    hours = `00`;
  }

  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let formattedTime = ` ${hours}:${minutes}`;

  return formattedTime;
}

let timeElement = document.querySelector("#time");
timeElement.innerHTML = displayTime(now);

//Display Weather Information
function showWeatherInfo(response) {
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.name;

  let tempHighElement = document.querySelector("#temp-max");
  tempHighElement.innerHTML = Math.round(response.data.main.temp_max);

  let tempLowElement = document.querySelector("#temp-min");
  tempLowElement.innerHTML = Math.round(response.data.main.temp_min);
}

//Search for a City
function citySearch(city) {
  let apiKey = "1888b3a0045da77e0e8157c56dbc3894";
  let units = "imperial";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(apiURL).then(showWeatherInfo);
}

//Retrieve Location Info
function retrievePosition(position) {
  let apiKey = "1888b3a0045da77e0e8157c56dbc3894";
  let units = "imperial";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;

  axios.get(url).then(showWeatherInfo);
}

//Get Current Location
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

let locationButton = document.querySelector("#current-location");
locationButton.addEventListener("click", getCurrentLocation);

//Submit City for Search
function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

let cityForm = document.querySelector("#city-search-form");
cityForm.addEventListener("submit", handleSubmit);
