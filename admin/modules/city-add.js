export const cityAdd = () => {
    // Get the values of the city,state and country
    var cityname = document.getElementById("cityName").value;
    var countryid = document.getElementById("country_data").value;
    var stateid = document.getElementById("state_data").value;
    
    var cityaddArr = { 'cityName': cityname, 'stateId':stateid, 'countryId': countryid };

    
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function () {
      var final_data = JSON.parse(this.responseText);
      console.log(final_data);

      var total_data = Object.keys(final_data).length;
      console.log(total_data);

      if (total_data > 0) {
          window.location.href = "city.html";
      } else {
          console.log("Invalid data");
      }
  };

  xhttp.open("POST", "http://localhost:8000/cityAdd");
  xhttp.setRequestHeader("Content-Type", "application/json");
  xhttp.send(JSON.stringify(cityaddArr));
  };