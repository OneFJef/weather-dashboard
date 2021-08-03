const searchButton$ = $("#searchButton");
const searchHistory$ = $("#searchHistory");

const cityInput$ = $("#cityInput");

const dashboard$ = $("#dashboard");

const searchedLocation$ = $("#searchedLocation");
const currentDate$ = $("#currentDate");
const forecastIcon$ = $("#forecastIcon");
const temp$ = $("#temp");
const wind$ = $("#wind");
const humidity$ = $("#humidity");
const uvIndex$ = $("#uvIndex");

const day0Date$ = $("#day0-date");
const day0Icon$ = $("#day0-icon");
const day0Temp$ = $("#day0-temp");
const day0Wind$ = $("#day0-wind");
const day0Humidity$ = $("#day0-humidity");
const day1Date$ = $("#day1-date");
const day1Icon$ = $("#day1-icon");
const day1Temp$ = $("#day1-temp");
const day1Wind$ = $("#day1-wind");
const day1Humidity$ = $("#day1-humidity");
const day2Date$ = $("#day2-date");
const day2Icon$ = $("#day2-icon");
const day2Temp$ = $("#day2-temp");
const day2Wind$ = $("#day2-wind");
const day2Humidity$ = $("#day2-humidity");
const day3Date$ = $("#day3-date");
const day3Icon$ = $("#day3-icon");
const day3Temp$ = $("#day3-temp");
const day3Wind$ = $("#day3-wind");
const day3Humidity$ = $("#day3-humidity");
const day4Date$ = $("#day4-date");
const day4Icon$ = $("#day4-icon");
const day4Temp$ = $("#day4-temp");
const day4Wind$ = $("#day4-wind");
const day4Humidity$ = $("#day4-humidity");

// let cityCords = {};
let searches = JSON.parse(localStorage.getItem("cities")) || [];

searches.length = 8;

// Weather API pull
function cityWeatherData() {
  $.ajax({
    url:
      "https://api.opencagedata.com/geocode/v1/json?q=" +
      searches[0] +
      "&key=1d80a765d5e24da991479d79c7ef1bba",
    type: "GET",
    success: function (results) {
      let cityCords = results.results[0].geometry;
      searchedLocation$.text(results.results[0].components.city);
      $.ajax({
        url:
          "https://api.openweathermap.org/data/2.5/onecall?lat=" +
          cityCords["lat"] +
          "&lon=" +
          cityCords["lng"] +
          "&exclude=minutely,hourly&units=imperial&appid=87ac4964afa179424df1d0664f7fafb7",
        type: "GET",
        success: function (results) {
          currentDate$.text(
            moment.unix(results.current.dt).format("MM/DD/YYYY")
          );
          let currentWeatherIcon = results.current.weather[0].icon;
          forecastIcon$.attr(
            "src",
            "http://openweathermap.org/img/w/" + currentWeatherIcon + ".png"
          );
          temp$.text(results.current.temp);
          wind$.text(results.current.wind_speed);
          humidity$.text(results.current.humidity);
          uvIndex$.text(results.current.uvi);

          // Day 0
          day0Date$.text(moment.unix(results.daily[1].dt).format("MM/DD/YYYY"));
          let weatherIcon1 = results.daily[1].weather[0].icon;
          day0Icon$.attr(
            "src",
            "http://openweathermap.org/img/w/" + weatherIcon1 + ".png"
          );
          day0Temp$.text(results.daily[1].temp.day);
          day0Wind$.text(results.daily[1].wind_speed);
          day0Humidity$.text(results.daily[1].humidity);

          // Day 1
          day1Date$.text(moment.unix(results.daily[2].dt).format("MM/DD/YYYY"));
          let weatherIcon2 = results.daily[2].weather[0].icon;
          day1Icon$.attr(
            "src",
            "http://openweathermap.org/img/w/" + weatherIcon2 + ".png"
          );
          day1Temp$.text(results.daily[2].temp.day);
          day1Wind$.text(results.daily[2].wind_speed);
          day1Humidity$.text(results.daily[2].humidity);

          // Day 2
          day2Date$.text(moment.unix(results.daily[3].dt).format("MM/DD/YYYY"));
          let weatherIcon3 = results.daily[3].weather[0].icon;
          day2Icon$.attr(
            "src",
            "http://openweathermap.org/img/w/" + weatherIcon3 + ".png"
          );
          day2Temp$.text(results.daily[3].temp.day);
          day2Wind$.text(results.daily[3].wind_speed);
          day2Humidity$.text(results.daily[3].humidity);

          // Day 3
          day3Date$.text(moment.unix(results.daily[4].dt).format("MM/DD/YYYY"));
          let weatherIcon4 = results.daily[4].weather[0].icon;
          day3Icon$.attr(
            "src",
            "http://openweathermap.org/img/w/" + weatherIcon4 + ".png"
          );
          day3Temp$.text(results.daily[4].temp.day);
          day3Wind$.text(results.daily[4].wind_speed);
          day3Humidity$.text(results.daily[4].humidity);

          // Day 4
          day4Date$.text(moment.unix(results.daily[5].dt).format("MM/DD/YYYY"));
          let weatherIcon5 = results.daily[5].weather[0].icon;
          day4Icon$.attr(
            "src",
            "http://openweathermap.org/img/w/" + weatherIcon5 + ".png"
          );
          day4Temp$.text(results.daily[5].temp.day);
          day4Wind$.text(results.daily[5].wind_speed);
          day4Humidity$.text(results.daily[5].humidity);
          dashboard$.show();
        },
        error: function (error) {
          console.log(error);
        },
      });
    },
    error: function (error) {
      console.log(error);
    },
  });
}

function searchHistory() {
  searches.forEach((element) => {
    searchHistory$.append(
      $("<button>")
        .addClass("btn btn-secondary")
        .text(element)
        .on("click", function (e) {
          let tmpName = $(e.target).text();
          searchHistory$.empty();
          searches.unshift(tmpName);
          cityWeatherData();
          localStorage.setItem("cities", JSON.stringify(searches));
          searchHistory();
          $("#cityInput").val("");
          searches.length = 8;
        })
    );
  });
}

function searchSubmit() {
  searchHistory$.empty();
  searches.unshift($("#cityInput").val());
  cityWeatherData();
  localStorage.setItem("cities", JSON.stringify(searches));
  searchHistory();
  $("#cityInput").val("");
  searches.length = 8;
}

searchButton$.on("click", searchSubmit);
cityInput$.on("keypress", function (e) {
  if (e.which == 13) {
    e.preventDefault();
    console.log(e);
    searchSubmit();
  }
});

searchHistory();
