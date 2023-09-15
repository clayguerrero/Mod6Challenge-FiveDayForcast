const searchBtn = $(".search");
const history = $(".history");
const historyItem = $(".historyItem");
let cityName;
let currCity;
let count;

const apikey = 'c7edca2b5da386146c92e6e9f3694e5f';
const dlat = '29.7633'
const dlon = '-95.3633'
// const citySearch = $(".citySearcher");

// searchBtn.css("background-color", "red");

let dummyCity = [];
let apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${dlat}&lon=${dlon}&appid=${apikey}&units=imperial`;
// const houUrl = `api.openweathermap.org/data/2.5/forecast?q=Houston&appid=${apikey}`

// $.ajax({
//   url: apiUrl,
//   method: 'GET'
// }).then(function (res) {
//   console.log(res.list[0].main)
// })

fetch(apiUrl)
  .then(function (res) {
    return res.json()}
).then(function (data) {
      console.log(data)
    })

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
  lastTen();
  // localStorage.clear()
});
function lastTen() {
  if (localStorage.prevCity) {
    const prevCityList = JSON.parse(localStorage.prevCity);
    prevCityList.forEach((city) => {
      history.append("<li><button class='historyItem'><h4></h4></button></li>");
      history.children().last().children().children().text(city);
      if (history.children().length > 10) {
        history.children().children().last().remove();
      }
    });
    console.log(prevCityList);
  }
}
