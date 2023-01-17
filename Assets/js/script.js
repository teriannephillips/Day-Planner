// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

$(function () {

// Display the current date in the header of the page.
let now = dayjs();
let date = now.format("dddd, MMMM D YYYY");
var dateEl = document.getElementById("currentDay");
dateEl.innerHTML = date;

//formatted the time from Day.js to get current hour
var time = now.format("HH");
//apply past, present, or future class to each time block 
for (var i = 9; i < 18; i++) {
  var hour = "hour-" + i;
  var timeEl = document.getElementById(hour);
  if (i < time) {
    timeEl.className = "row time-block past"
  }
  else if (i > time) {
    timeEl.className = "row time-block future"
  }
  else {
    timeEl.className = "row time-block present";
  }
}
//add event listener for when a button is clicked
document.addEventListener("click", function (event) {
  if (event.target.matches("button")) {
    var button = event.target;
    var getBlock = button.closest(".row");
    var getHour = getBlock.getAttribute("id");
    var index = getHour.split('-')[1];
    console.log(index);
    var textId = "text-" + index;
    var data = document.getElementById(textId).value
    saveData(data, index);
  }
});
//saves the data to local storage
var saveData = function (data, index) {
  var calendarData = JSON.parse(localStorage.getItem('calendarData')) || ["", "", "","", "", "","", "", "",];
  calendarData.splice(index-9,1, data);
  localStorage.setItem("calendarData", JSON.stringify(calendarData));
}
//shows the saved data on the screen even after refresh
var renderData = function () {
  var storedData= JSON.parse(localStorage.getItem('calendarData')) || ["", "", "","", "", "","", "", "",];
  for (var i = 0; i <9; i++){
    index = i + 9;
    textId = "text-" + index
    var dataEl = document.getElementById(textId);
    dataEl.value = storedData[i];
  }
}
renderData();

});
