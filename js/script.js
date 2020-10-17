/*script.js*/

function calculateDaysHelper(days) {
  var dayOptions = "";

  for(var i = 1; i <= days; i++) {
    let dayString = "";
    if (i < 10) {
      dayString = "0" + i;
    }
    else { dayString = i; }

    dayOptions += "<option value=" + dayString +">" + dayString + "</option>";
  }

  document.getElementById("day-input").innerHTML = dayOptions;
}

function calculateDays(monthDay) {
  var days = monthDay.options[monthDay.selectedIndex].value;
  days = days.slice(-2);

  calculateDaysHelper(days);
}

document.getElementById("calendarSubmit").addEventListener("click", function(event) {
    event.preventDefault();
    const urlBase = "https://calendarific.com/api/v2/holidays?&api_key=31f1c7d4fed6303fc7daf30b6256b319bba4bc76&country=US";
    var year = document.getElementById("year-input")
      .options[document.getElementById("year-input").selectedIndex].value;
    var month = document.getElementById("month-input")
      .options[document.getElementById("month-input").selectedIndex].value
      .slice(0,2);
    var day = document.getElementById("day-input")
      .options[document.getElementById("day-input").selectedIndex].value;


    const urlFull = urlBase + "&year=" + year + "&month=" + month + "&day=" + day;

    fetch(urlFull)
      .then(function(response) {
          //console.log("does this mean errors");
          return response.json();
      }).then(function(json) {
        console.log(json);
        let results = "";
        results += '<div class="today"><h2>Holidays celebrated on ' + json.response.holidays[0].date.datetime.month + '/' + json.response.holidays[0].date.datetime.day + '/' + json.response.holidays[0].date.datetime.year +"</h2>";
        for(var i = 0; i < json.response.holidays.length; i++){
          results += '<div class="holiContent">';
          results += '<div class="name"><h4>' + json.response.holidays[i].name + '<h4></div>';
          let whereCelebrate = json.response.holidays[i].locations;
          if(whereCelebrate == "All"){
            whereCelebrate = "Everywhere";
          }
          results += '<div class="location"><p>' + "Locations that celebrate this holiday: " + json.response.holidays[i].locations + '<p></div>';
          results += '<div class="description"><p>' + "Description of holiday: " + json.response.holidays[i].description + '<p></div>';
          results += '</div> <br/>';
        }
        results += '</div>';
        document.getElementById("currentHoliday").innerHTML = results;
      });

});
