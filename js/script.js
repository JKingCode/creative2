/*script.js*/

document.getElementById("calendarSubmit").addEventListener("click", function(event) {
    event.preventDefault();
    const value = document.getElementById("dateInput").value;
    if (value === "")
        return;
    const urlBase = "https://calendarific.com/api/v2/holidays?&api_key=31f1c7d4fed6303fc7daf30b6256b319bba4bc76&country=US";
    var year = "";
    var month = "";
    var day = "";
    for(var i = 0; i < 4; i++){
      year += value.charAt(i);
    }
    month += value.charAt(5);
    month += value.charAt(6);

    day  += value.charAt(8);
    day  += value.charAt(9);

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
          results += '</div>';
        }
        results += '</div>';
        document.getElementById("currentHoliday").innerHTML = results;
      });

});
