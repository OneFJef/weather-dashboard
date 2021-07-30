const searchButton$ = $("#searchButton");
const searchHistory$ = $("#searchHistory");

// let cityCords = {};
let searches = JSON.parse(localStorage.getItem("cities")) || [];

// Weather API pull
function cityData() {
  $.ajax({
    url:
      "https://api.opencagedata.com/geocode/v1/json?q=" +
      searches[0] +
      "&key=1d80a765d5e24da991479d79c7ef1bba",
    type: "GET",
    success: function (results) {
      console.log(results.results[0].geometry);
      let cityCords = results.results[0].geometry;
      $.ajax({
        url:
          "https://api.openweathermap.org/data/2.5/onecall?lat=" +
          cityCords["lat"] +
          "&lon=" +
          cityCords["lng"] +
          "&units=imperial&appid=87ac4964afa179424df1d0664f7fafb7",
        type: "GET",
        success: function (results) {
          console.log(results);
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
    searchHistory$.append("<li>" + element + "</li>");
  });
}

searchButton$.on("click", function (e) {
  searchHistory$.empty();
  searches.unshift($("#cityInput").val());
  cityData();
  localStorage.setItem("cities", JSON.stringify(searches));
  searchHistory();
  $("#cityInput").val("");
});

searchHistory();
