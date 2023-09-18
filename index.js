const searchBtn = $(".search");
const history = $(".history");
const historyItem = $(".historyItem");
const currentCity = $(".currentCity");
const cardList = $(".cardList");
let card;
let hero;
let currCity;
let namedCity;
let info;
let weather;
let fiveDaysArray = [];
let dailyInfo;
let nextFive;
const apikey = "c7edca2b5da386146c92e6e9f3694e5f";
let countryCode;
const historyButton = document.querySelectorAll("h4");

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
      namedCity = data[0].name;
      const lat = data[0].lat;
      const lon = data[0].lon;
      getUrl(lat, lon);
    });
}

function getUrl(lat, lon, key) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apikey}`;
  fetch(apiUrl)
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      dt_txt = data.list[0].dt_txt.slice(0, 10);
      addToMainDiv(data.list);
      fiveDays(data.list);
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

  const cityName = $(dummyCity).first()[0].split(",")[0];
  const stateCode = $(dummyCity).first()[0].split(",")[1];
  const countryCode = $(dummyCity).first()[0].split(",")[2];
  byName(cityName, stateCode, countryCode);
});
function lastTen() {
  if (localStorage.prevCity) {
    const prevCityList = JSON.parse(localStorage.prevCity);
    prevCityList.forEach((city) => {
      history.append(`<li><button class='historyItem'><h4></h4></button></li>`);
      history.children().last().children().children().text(city);
      if (history.children().length > 10) {
        history.children().children().last().remove();
      }
    });
  }
}

function addToMainDiv(data) {
  let weather = data[0].weather[0].main;
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
  $(`<div class='weather'></div>`).insertAfter(".currCityName");
  determineWeather(weather);
}

function fiveDays(data) {
  for (let i = 0; i < data.length; i += 8) {
    fiveDaysArray.push(data[i]);
    $(
      cardList.append(
        `<div class='card rounded'>${data[i].dt_txt.slice(0, 10)}</div>`
      )
    );
    card = $(".card");
  }
  for (let i = 0; i <= 4; i++) {
    $(
      card[i]
        .appendChild(document.createElement("ul"))
        .classList.add(`dailyInfo${i}`)
    );
    card[i]
      .appendChild(document.createElement("div"))
      .classList.add(`daysWeather${i}`);
    dailyInfo = $(`.dailyInfo${i}`);
    const fiveWeather = fiveDaysArray[i].weather[0].main;
    $(dailyInfo.append(`<li>Temperture: ${fiveDaysArray[i].main.temp}</li>`));
    $(dailyInfo.append(`<li>Wind: ${fiveDaysArray[i].wind.speed}MPH</li>`));
    $(
      dailyInfo.append(`<li>Humidity: ${fiveDaysArray[i].main.humidity}%</li>`)
    );
    setDaysWeather(fiveWeather, i);
  }
}
function determineWeather(weather) {
  weatherCont = $(".weather");
  if (weather.includes("loud")) {
    weatherCont.append(`<span class="material-symbols-outlined">cloud</span>`);
  } else if (weather.includes("sun" || "lear")) {
    weatherCont.append(`<span class="material-symbols-outlined">sunny</span>`);
  } else if (weather.includes("ain")) {
    weatherCont.append(`<span class="material-symbols-outlined">rainy</span>`);
  } else if (weather.includes("now")) {
    weatherCont.append(
      `<span class="material-symbols-outlined">ac_unit</span>`
    );
  }
}

function setDaysWeather(weather, i) {
  weatherCont = $(`.daysWeather${i}`);
  if (weather.includes("loud")) {
    weatherCont.append(`<span class="material-symbols-outlined">cloud</span>`);
  } else if (weather.includes("lear") || weather.includes("sun")) {
    weatherCont.append(`<span class="material-symbols-outlined">sunny</span>`);
  } else if (weather.includes("ain")) {
    weatherCont.append(`<span class="material-symbols-outlined">rainy</span>`);
  } else if (weather.includes("now")) {
    weatherCont.append(
      `<span class="material-symbols-outlined">ac_unit</span>`
    );
  }
}

$(document).on("click", "button.historyItem", function (e) {
  const reDoCity = $(this).text();
  e.preventDefault();
  dummyCity.unshift(reDoCity);
  localStorage.setItem("prevCity", JSON.stringify(dummyCity));
  location.reload();
  byName(reDoCity);
});
