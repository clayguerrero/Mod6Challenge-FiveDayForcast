const searchBtn = $(".search");
const history = $(".history");
const historyItem = $(".historyItem");
let count = 0;
// const citySearch = $(".citySearcher");

// searchBtn.css("background-color", "red");

const dummyCity = [];

$(function addToCityList() {
  searchBtn.on("click", function (e) {
    e.preventDefault();
    const newCityName = $(this).siblings("input").val();
    dummyCity.push(newCityName);
    history.append("<li><button class='historyItem'><h4></h4></button></li>");
    dummyCity.forEach((city) => {
      const currCity = $(this).parent().siblings("ul").find("h4");
      currCity[count].textContent = dummyCity[count];
      console.log(dummyCity[count]);
    });
    count += 1;
    $(this).siblings("input").val("");
    console.log(dummyCity);
  });
});
