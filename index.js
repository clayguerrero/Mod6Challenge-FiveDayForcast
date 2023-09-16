const searchBtn = $(".search");
const history = $(".history");
const historyItem = $(".historyItem");
const apikey = "c7edca2b5da386146c92e6e9f3694e5f";
let zip;
let countryCode;

// const citySearch = $(".citySearcher");

// searchBtn.css("background-color", "red");

let dummyCity = [];

function getUrl(lat, lon, key) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apikey}&units=imperial`;
  fetch(apiUrl)
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      console.log(data.city.name);
      console.log(data.list[0].main.temp);
    });
}

function coordByZip(zip, countryCode, key) {
  const findCord = `http://api.openweathermap.org/geo/1.0/zip?zip=${zip},${countryCode}&appid=${apikey}`;
  fetch(findCord)
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      lat = data.lat;
      lon = data.lon;
      getUrl(lat, lon, key);
    });
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

  lastTen();
  zip = $(dummyCity).first()[0].split(",")[0];
  countryCode = $(dummyCity).first()[0].split(",")[1];
  coordByZip(zip, countryCode, apikey);
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
  }
}
