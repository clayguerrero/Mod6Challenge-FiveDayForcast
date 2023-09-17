const searchBtn = $(".search");
const history = $(".history");
const historyItem = $(".historyItem");
const currentCity = $(".currentCity");
let hero;
let currCity;
let namedCity;
let info;
// let dt_txt = null
const apikey = "c7edca2b5da386146c92e6e9f3694e5f";
// let zip;
let countryCode;

// const citySearch = $(".citySearcher");

// searchBtn.css("background-color", "red");

let dummyCity = [];

function byName(cityName, stateCode, countryCode) {
  const nameURL = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName},${stateCode},${countryCode}&limit=1&appid=${apikey}`;
  fetch(nameURL)
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      console.log(data[0]);
      namedCity = data[0].name;
      const lat = data[0].lat;
      const lon = data[0].lon;
      getUrl(lat, lon);
    });
}

function getUrl(lat, lon, key) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apikey}&units=imperial`;
  fetch(apiUrl)
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      // console.log(data.city.name);
      // console.log(data.list[0].main.temp);
      console.log(data.list[0]);
      dt_txt = data.list[0].dt_txt.slice(0, 10);
      addToMainDiv(data.list);
    });
}

// function coordByZip(zip, countryCode, key) {
//   const findCord = `http://api.openweathermap.org/geo/1.0/zip?zip=${zip},${countryCode}&appid=${apikey}`;
//   fetch(findCord)
//     .then(function (res) {
//       return res.json();
//     })
//     .then(function (data) {
//       lat = data.lat;
//       lon = data.lon;
//       getUrl(lat, lon, key);
//     });
// }

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

  const cityName = $(dummyCity).first()[0].split(",")[0];
  const stateCode = $(dummyCity).first()[0].split(",")[1];
  const countryCode = $(dummyCity).first()[0].split(",")[2];
  byName(cityName, stateCode, countryCode);
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

function addToMainDiv(data) {
  currentCity.append($("<div class='hero rounded'></div>"));
  hero = currentCity.children();
  hero.append(`<h3 class='currCityName'>${namedCity} ${dt_txt}</h3>`);
  hero.append(`<div class='infoCont'><ul class='info'></ul></div>`);
  currCity = $(".currCityName");
  info = $(".info");
  const temp = data[0].main.temp;
  const windSpd = data[0].wind.speed;
  const humid = data[0].main.humidity;
  info.append(`<li class='temp'>Temperture: ${temp}</li>`);
  info.append(`<li class='wind'>Wind: ${windSpd}MPH</li>`);
  info.append(`<li class='humid'>Humidity: ${humid}%</li>`);
  console.log("weather", data[0].weather[0].main);
}
