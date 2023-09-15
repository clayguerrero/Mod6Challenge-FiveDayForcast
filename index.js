const searchBtn = $(".search");
const history = $(".history");
const historyItem = $(".historyItem");
let cityName;
let currCity;
let count

// const citySearch = $(".citySearcher");

// searchBtn.css("background-color", "red");

let dummyCity = [];
const getWeather = function () {
  let apiUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + LAT + '&lon='+ LON + '&appid=' + APIKEY +  ''
}

$(function addToCityList() {
  const cityHistory = JSON.parse(localStorage.getItem("prevCity"));
  if (cityHistory) {
    dummyCity = cityHistory;
  }
  searchBtn.on("click", function (e) {
    e.preventDefault();
    const newCityName = $(this).siblings("input").val();
    dummyCity.unshift(newCityName);
    localStorage.setItem("prevCity", JSON.stringify(dummyCity));
    location.reload();
  });
  lastTen()
  // localStorage.clear()
});
function lastTen() {
 if (localStorage.prevCity) {
    const prevCityList = JSON.parse(localStorage.prevCity);
    prevCityList.forEach((city) => {
      history.append("<li><button class='historyItem'><h4></h4></button></li>");
      history.children().last().children().children().text(city);
      if (history.children().length > 10) {
        history.children().children().last().remove()
      }
    });
    console.log(prevCityList)
  }
}
