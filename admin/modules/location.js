//Location Delete
const locationDelete = (dataid) => {
    var locationId= dataid;
    
    var locationDeleteArr = { 'id': locationId };
  
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function () {
      var final_data = JSON.parse(this.responseText);
  
      var status = final_data.status;
  
      var total_data = Object.keys(final_data).length;
  
      if (total_data > 0) {
        if (status === 1) {
          console.log("Successfully deleted");
          window.location.href = "location.html";
        } else {
          console.log("Invalid data");
        }
      } else {
        console.log("Invalid data");
      }
    };
  
    xhttp.open("POST", "http://localhost:8000/locationDelete");
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(JSON.stringify(locationDeleteArr));
  };

  window.locationDelete = locationDelete;

  //Location list
  const locationList = () => {

    const xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
            
        var final_data=JSON.parse(this.responseText);

        var total_data=final_data.data.length;
        
        var html_body = "";
        for (var i = 0; i < total_data; i++) {
            html_body += "<tr>" +
                            "<td>" + final_data.data[i].id + "</td>" +
                            "<td>" + final_data.data[i].name + "</td>" +
                            "<td>" + final_data.data[i].city_name + "</td>" +
                            "<td>" + final_data.data[i].state_name + "</td>" +
                            "<td>" + final_data.data[i].country_name + "</td>" +
                            "<td><a href=\"location-edit.html?id=" + final_data.data[i].id + "\">Edit</a>&nbsp; | &nbsp;<button class='btn-danger' onclick=\"locationDelete(this.getAttribute('dataid'))\" dataid='" + final_data.data[i].id + "'>Delete</button></td>" +
                        "</tr>";
        }
        document.getElementById("tbl_data").innerHTML = html_body;
    
        
    }
    xhttp.open("GET", "http://localhost:8000/location_list");
    xhttp.send();
    };

    locationList();

    export { locationList };