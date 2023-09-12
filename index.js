const searchBtn = $(".search");
const history = $('.history')
const historyItem = $('.historyItem')
// const citySearch = $(".citySearcher");

// searchBtn.css("background-color", "red");

$(function addToCityList() {
  searchBtn.on("click", function (e) {
      e.preventDefault();
    //   const newHistItem = '<li><button class="historyItem"><h4></h4></button></li>'
      const newCityName = $(this).siblings("input").val()
      history.append(li)

    //   .append('h4').text($(this).siblings("input").val()).addClass('historyItem');

    // console.log($(this));
    // console.log("hello");
  });
});
