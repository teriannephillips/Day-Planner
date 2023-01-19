// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

$(function () {

  // Display the current date in the header of the page.
  let now = dayjs();
  let todayDate = now.format("dddd, MMMM D YYYY");
  var dateEl = $("#currentDay");
  dateEl.html(todayDate);
  //get the date for saving purposes
  let today = now.format();
  var date = today.split('T')[0];
  //formatted the time from Day.js to get current hour
  var time = now.format("HH");
  //apply past, present, or future class to each time block 
  for (var i = 9; i < 18; i++) {
    var hour = "hour-" + i;
    var timeEl = $("#" + hour);
    if (i < time) {
      timeEl.attr("class", "row time-block past");
    }
    else if (i > time) {
      timeEl.attr("class", "row time-block future");
    }
    else {
      timeEl.attr("class", "row time-block present");
    }
  }
  //add event listener for when a button is clicked
  $(document).on("click", "button", function (event) {
    var button = $(this);
    var getBlock = button.closest(".row");
    var getHour = getBlock.attr("id");
    var index = getHour.split('-')[1];
    var textId = "text-" + index;
    var data = $("#" + textId).val();
    saveData(data, index);
  });
  //saves the data to local storage using the date so each day starts fresh
  var saveData = function (data, index) {
    
    var calendarData = JSON.parse(localStorage.getItem(date)) || ["", "", "", "", "", "", "", "", "",];
    calendarData.splice(index - 9, 1, data);
    localStorage.setItem(date, JSON.stringify(calendarData));
  
  }
  //shows the saved data on the screen even after refresh
  var renderData = function () {
    var storedData = JSON.parse(localStorage.getItem(date)) || ["", "", "", "", "", "", "", "", "",];
    for (var i = 0; i < 9; i++) {
      index = i + 9;
      textId = "text-" + index
      var dataEl = document.getElementById(textId);
      dataEl.value = storedData[i];
    }
  }
  //runs the function to show the data on the screen
  renderData();
});
