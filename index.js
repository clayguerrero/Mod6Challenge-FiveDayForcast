const searchBtn = $(".search");
const history = $(".history");
const historyItem = $(".historyItem");
let count = 0;
let cityName;
let currCity;

// const citySearch = $(".citySearcher");

// searchBtn.css("background-color", "red");

let dummyCity = [];

$(function addToCityList() {
  const cityHistory = JSON.parse(localStorage.getItem("prevCity"));
  if (cityHistory) {
    dummyCity = cityHistory;
  }
  searchBtn.on("click", function (e) {
    e.preventDefault();
    const newCityName = $(this).siblings("input").val();
    dummyCity.push(newCityName);
    localStorage.setItem("prevCity", JSON.stringify(dummyCity));
    location.reload()
  });
  if (localStorage.prevCity) {
    const prevCityList = JSON.parse(localStorage.prevCity);
    prevCityList.forEach((city) => {
      history.append("<li><button class='historyItem'><h4></h4></button></li>");
      history.children().last().children().children().text(city);
      count++;
    });
  }
  // localStorage.clear()
});
