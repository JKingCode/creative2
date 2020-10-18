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

function loadPastPresentFuture() {
  var today = new Date();
  var yesterday = new Date(new Date().getTime() - 24 * 60 * 60 * 1000);
  var tomorrow = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);

  const urlBase = "https://calendarific.com/api/v2/holidays?&api_key=31f1c7d4fed6303fc7daf30b6256b319bba4bc76&country=US";
  const urlYesterday = urlBase + "&year=" + yesterday.getFullYear() + "&month=" + yesterday.getMonth() + "&day=" + yesterday.getDate();
  const urlToday = urlBase + "&year=" + today.getFullYear() + "&month=" + today.getMonth() + "&day=" + today.getDate();
  const urlTomorrow = urlBase + "&year=" + tomorrow.getFullYear() + "&month=" + tomorrow.getMonth() + "&day=" + tomorrow.getDate();


  fetch(urlYesterday)
    .then(function(response) {
        //console.log("does this mean errors");
        return response.json();
    }).then(function(json) {
      console.log(json);
      var yesterday = new Date(new Date().getTime() - 24 * 60 * 60 * 1000);
      let results = "";
      results += '<div class="date-header"><h2>Yesterday\'s Holidays</h2>';
      let month = yesterday.getMonth() + 1;
      results += '<h3>' + month + '/' + yesterday.getDate() + '/' + yesterday.getFullYear() +"</h3>";
      results += '<br>';
      for(var i = 0; i < json.response.holidays.length; i++){
        results += '<div class="holiContent">';
        results += '<div class="name"><h4>' + json.response.holidays[i].name + '<h4></div>';
        let whereCelebrate = json.response.holidays[i].locations;
        if(whereCelebrate == "All"){
          whereCelebrate = "Everywhere";
        }
        results += '<div class="location"><p>' + "Locations that celebrate this holiday: " + json.response.holidays[i].locations + '<p></div>';
        results += '<div class="description"><p>' + json.response.holidays[i].description + '<p></div>';
        results += '</div> <br/>';
      }
      results += '</div>';
      document.getElementById("yesterday").innerHTML = results;
    });

    fetch(urlToday)
      .then(function(response) {
          //console.log("does this mean errors");
          return response.json();
      }).then(function(json) {
        console.log(json);
        var today = new Date();
        let results = "";
        results += '<div class="date-header"><h2>Today\'s Holidays</h2>';
        let month = today.getMonth() + 1;
        results += '<h3>' + month + '/' + today.getDate() + '/' + today.getFullYear() +"</h3>";
        results += '<br>';
        for(var i = 0; i < json.response.holidays.length; i++){
          results += '<div class="holiContent">';
          results += '<div class="name"><h4>' + json.response.holidays[i].name + '<h4></div>';
          let whereCelebrate = json.response.holidays[i].locations;
          if(whereCelebrate == "All"){
            whereCelebrate = "Everywhere";
          }
          results += '<div class="location"><p>' + "Locations that celebrate this holiday: " + json.response.holidays[i].locations + '<p></div>';
          results += '<div class="description"><p>' + json.response.holidays[i].description + '<p></div>';
          results += '</div> <br/>';
        }
        results += '</div>';
        document.getElementById("today").innerHTML = results;
      });

      fetch(urlTomorrow)
        .then(function(response) {
            //console.log("does this mean errors");
            return response.json();
        }).then(function(json) {
          console.log(json);
          var tomorrow = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
          let results = "";
          results += '<div class="date-header"><h2>Tomorrow\'s Holidays</h2>';
          let month = tomorrow.getMonth() + 1;
          results += '<h3>' + month + '/' + tomorrow.getDate() + '/' + tomorrow.getFullYear() +"</h3>";
          results += '<br>';
          for(var i = 0; i < json.response.holidays.length; i++){
            results += '<div class="holiContent">';
            results += '<div class="name"><h4>' + json.response.holidays[i].name + '<h4></div>';
            let whereCelebrate = json.response.holidays[i].locations;
            if(whereCelebrate == "All"){
              whereCelebrate = "Everywhere";
            }
            results += '<div class="location"><p>' + "Locations that celebrate this holiday: " + json.response.holidays[i].locations + '<p></div>';
            results += '<div class="description"><p>' + json.response.holidays[i].description + '<p></div>';
            results += '</div> <br/>';
          }
          results += '</div>';
          document.getElementById("tomorrow").innerHTML = results;
        });

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
        results += '<div class="date-header"><h2>Holidays celebrated on ' + json.response.holidays[0].date.datetime.month + '/' + json.response.holidays[0].date.datetime.day + '/' + json.response.holidays[0].date.datetime.year +"</h2>";
        results += '<br>';
        for(var i = 0; i < json.response.holidays.length; i++){
          results += '<div class="holiContent">';
          results += '<div class="name"><h4>' + json.response.holidays[i].name + '<h4></div>';
          let whereCelebrate = json.response.holidays[i].locations;
          if(whereCelebrate == "All"){
            whereCelebrate = "Everywhere";
          }
          results += '<div class="location"><p>' + "Locations that celebrate this holiday: " + json.response.holidays[i].locations + '<p></div>';
          results += '<div class="description"><p>' + json.response.holidays[i].description + '<p></div>';
          results += '</div> <br/>';
        }
        results += '</div>';
        document.getElementById("searched-date").innerHTML = results;
      });

});
