const searchBtn = $(".search");
const history = $(".history");
const historyItem = $(".historyItem");
const apikey = 'c7edca2b5da386146c92e6e9f3694e5f';
let zip
let countryCode
// const dlat = '29.7633'
// const dlon = '-95.3633'
// const citySearch = $(".citySearcher");

// searchBtn.css("background-color", "red");

let dummyCity = [];
// let apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apikey}&units=imperial`;
const coordByZip = `http://api.openweathermap.org/geo/1.0/zip?zip=${zip},${countryCode}&appid=${apikey}`;
// const houUrl = `api.openweathermap.org/data/2.5/forecast?q=Houston&appid=${apikey}`

// fetch(apiUrl)
//   .then(function (res) {
//     return res.json()}
// ).then(function (data) {
//       console.log(data.city.name)
//       console.log(data.list[0].main.temp)
//     })

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
  localStorage.clear()
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
    let dev = localStorage.prevCity.slice(2).slice(0,-2).split(',')
    // console.log(dev);
  }
}
