export const locationAdd = () => {
    // Get the values of the location, city, state and country
    var locationname = document.getElementById("locationName").value;
    var countryid = document.getElementById("country_data").value;
    var stateid = document.getElementById("state_data").value;
    var cityid = document.getElementById("city_data").value;
    
    var locationaddArr = { 'locationName': locationname, 'cityId':cityid, 'stateId':stateid, 'countryId': countryid };

    
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function () {
      var final_data = JSON.parse(this.responseText);

      var total_data = Object.keys(final_data).length;

      if (total_data > 0) {
          window.location.href = "location.html";
      } else {
          console.log("Invalid data");
      }
  };

  xhttp.open("POST", "http://localhost:8000/locationAdd");
  xhttp.setRequestHeader("Content-Type", "application/json");
  xhttp.send(JSON.stringify(locationaddArr));
  };