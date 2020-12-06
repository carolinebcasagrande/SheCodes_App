let now = new Date();
let h7 = document.querySelector("h7");
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let hours = now.getHours();
let minutes = now.getMinutes();
h7.innerHTML = `${day}, ${hours}:${minutes}`;

function search(city) {
  city.preventDefault();
  let searchInput = document.querySelector("#type-city");
  let h1 = document.querySelector("h1");
  h1.innerHTML = searchInput.value;
  let apiKey = "fa553674cbb2dfe45334d09e12474cdc";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showHumidity);
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showWind);
  axios.get(`${apiUrl}&appid=${apiKey}`).then(weatherDescription);
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

function showTemperature(response) {
  console.log(response.data.main.temp);
  let temperature = Math.round(response.data.main.temp);
  let currentTemp = document.querySelector("#temperature");
  currentTemp.innerHTML = `${temperature}`;
}

function showHumidity(response) {
  console.log(response.data.main.humidity);
  let currentHumidity = document.querySelector("#humidity");
  currentHumidity.innerHTML = `${response.data.main.humidity}`;
}

function showWind(response) {
  console.log(response.data.wind.speed);
  let wind = Math.round(response.data.wind.speed);
  let currentWind = document.querySelector("#wind");
  currentWind.innerHTML = `${wind}`;
}

function weatherDescription(response) {
  console.log(response.data.weather.description);
  let currentDescription = document.querySelector("#description");
  currentDescription.innerHTML = `${response.data.weather[0].description}`;
}

function locationName(response) {
  console.log(response.data.name);
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${response.data.name}`;
}

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let positionApiKey = "fa553674cbb2dfe45334d09e12474cdc";
  let positionURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${positionApiKey}&units=metric`;

  axios.get(`${positionURL}&appid=${positionApiKey}`).then(locationName);
  axios.get(`${positionURL}&appid=${positionApiKey}`).then(showTemperature);
  axios.get(`${positionURL}&appid=${positionApiKey}`).then(showHumidity);
  axios.get(`${positionURL}&appid=${positionApiKey}`).then(showWind);
  axios.get(`${positionURL}&appid=${positionApiKey}`).then(weatherDescription);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let positionButton = document.querySelector("#current-button");
positionButton.addEventListener("click", getCurrentPosition);
