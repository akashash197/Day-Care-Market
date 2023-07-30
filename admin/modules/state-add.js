export const stateAdd = () => {
    // Get the values of the state and country
    var statename = document.getElementById("stateName").value;
    var countryid = document.getElementById("country_data").value;
    
    var stateaddArr = { 'stateName': statename, 'countryId': countryid };
    
    
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function () {
      var final_data = JSON.parse(this.responseText);
      console.log(final_data);

      var total_data = Object.keys(final_data).length;
      console.log(total_data);

      if (total_data > 0) {
          window.location.href = "state.html";
      } else {
          console.log("Invalid data");
      }
  };

  xhttp.open("POST", "http://localhost:8000/stateAdd");
  xhttp.setRequestHeader("Content-Type", "application/json");
  xhttp.send(JSON.stringify(stateaddArr));
  };