export const cityEdit = () => {

    var url = new URL(window.location.href);  // Get the current URL
   
    var id = url.searchParams.get("id"); // Get the value of the 'id' parameter

    // Get the values of the city,state and country
    var cityname = document.getElementById("cityName").value;
    var countryid = document.getElementById("country_data").value;
    var stateid = document.getElementById("state_data").value;
    
    var cityEditArr = {'id':id, 'cityName': cityname, 'stateId':stateid, 'countryId': countryid };

    
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

  xhttp.open("POST", "http://localhost/ecomm/admin/config/api.php?api_name=cityEdit");
  xhttp.setRequestHeader("Content-Type", "application/json");
  xhttp.send(JSON.stringify(cityEditArr));

  };