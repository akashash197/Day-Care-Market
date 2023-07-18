// country delete
const countryDelete = (dataid) => {
    var countryId = dataid;
    console.log(countryId);
  
    var countryDeleteArr = { 'id': countryId };
  
    console.log(countryDeleteArr);
  
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function () {
      var final_data = JSON.parse(this.responseText);
      console.log(final_data);
  
      var status = final_data.status;
  
      var total_data = Object.keys(final_data).length;
      console.log(total_data);
  
      if (total_data > 0) {
        if (status === 1) {
          console.log("Successfully deleted");
          window.location.href = "country.html";
        } else {
          console.log("Invalid data");
        }
      } else {
        console.log("Invalid data");
      }
    };
  
    xhttp.open("POST", "http://localhost/ecomm/admin/config/api.php?api_name=countryDelete");
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(JSON.stringify(countryDeleteArr));
  };
  
  window.countryDelete = countryDelete;

// Country-list

const countryList = () => {

    const xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
            
        var final_data=JSON.parse(this.responseText);
  
       
        console.log(final_data);
        var total_data=final_data.data.length;
        console.log(total_data);
        
        var html_body = "";
        for (var i = 0; i < total_data; i++) {
            html_body += "<tr>" +
                            "<td>" + final_data.data[i].id + "</td>" +
                            "<td>" + final_data.data[i].name + "</td>" +
                            "<td><a href=\"country-edit.html?id=" + final_data.data[i].id + "\">Edit</a>&nbsp; | &nbsp;<button class='btn-danger' onclick=\"countryDelete(this.getAttribute('dataid'))\" dataid='" + final_data.data[i].id + "'>Delete</button></td>" +
                        "</tr>";
        }
        document.getElementById("tbl_data").innerHTML = html_body;
        
    
        
        
    }
    xhttp.open("GET", "http://localhost/ecomm/admin/config/api.php?api_name=country_list");
    xhttp.send();
    };
    
    countryList();
    

    export { countryList };


// Add Country





 