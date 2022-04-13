// GIFCAST APPLICATION

// variables
let weatherData = {};
let gifData = {};

// dom maniputlation variables
let cityEl = document.getElementById("city-input");
let searchEl = document.getElementById("city-button");
let tempEl = document.getElementById("temp");
let cityNameEl = document.getElementById("city-given");
let descriptionEl = document.getElementById("description");
let currentWeatherEl = document.getElementById("current-weather-box");
let weatherIconEl = document.getElementById("weather-icon");

// openweathermap api key
const WeatherAPIKey = "3a91f7f0ab2106256c3b3aafbbd9cd58";

// giphy api key
const GiphyAPIKey = "jFIH8bO506ntjvslzFtCEzBLL2oxlhhH";


// function that takes city in the input and returns the current weather
function getWeather(cityName) {

    // trying out different very cool url format
    let weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=imperial&appid=${WeatherAPIKey}`;

    // after url is formed, fetch data
    fetch(weatherURL)
        .then(function (response) {

            // testing output
            response.json().then(function (result) {

                // create variables to hold data
                weatherData = result;
                console.log(JSON.stringify(weatherData));
                createWeather();
                getGif();
            })
        })
};

// create elements through DOM manipulation
function createWeather() {

    // remove 'hide' class to display the elemnent
    currentWeatherEl.classList.remove("hide");

    // display city name entered
    cityNameEl.innerHTML = weatherData.name;

    // display icon for current weather
    let weatherIcon = weatherData.weather[0].icon;
    weatherIconEl.setAttribute("src", `https://openweathermap.org/img/wn/${weatherIcon}@2x.png`);
    weatherIconEl.setAttribute("alt", weatherData.weather[0].description);

    // fetch description
    descriptionEl.innerHTML = weatherData.weather[0].description;

    // fetch temperature
    tempEl.innerHTML = "Temperature: " + weatherData.main.temp + " 	&#8457";
}

// get desription of the weather data and put through giphy api
function getGif() {
    let weatherDescription = weatherData.weather[0].description;
    let gifURL = `https://api.giphy.com/v1/gifs/search?api_key=jFIH8bO506ntjvslzFtCEzBLL2oxlhhH&q=${weatherDescription}&limit=25&offset=0&rating=pg-13&lang=en`;
    fetch(gifURL)
        .then(function (response) {

            // testing output
            response.json().then(function (result) {
                gifData = result;
                console.log(JSON.stringify(gifData));
            })
        })
};

// search/start button
searchEl.addEventListener("click", function () {

    // variable for what city was entered
    const searchInput = cityEl.value;

    // check if input is blank
    getWeather(searchInput);
});




// fetch giphy data and display gif from weather description data

// local storage function

// giphy reload button (time permitting)



