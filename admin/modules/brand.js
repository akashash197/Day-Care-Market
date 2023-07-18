//Brand Delete
const brandDelete = (dataid) => {
    var brandId = dataid;
  
    var brandDeleteArr = { 'id': brandId };
  
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function () {
      var final_data = JSON.parse(this.responseText);
  
      var status = final_data.status;
  
      var total_data = Object.keys(final_data).length;
  
      if (total_data > 0) {
        if (status === 1) {
          console.log("Successfully deleted");
          window.location.href = "brand.html";
        } else {
          console.log("Invalid data");
        }
      } else {
        console.log("Invalid data");
      }
    };
  
    xhttp.open("POST", "http://localhost/ecomm/admin/config/api.php?api_name=brandDelete");
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(JSON.stringify(brandDeleteArr));
  };

  window.brandDelete = brandDelete;

//Brand List
const brandList = () => {

    const xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
            
        var final_data=JSON.parse(this.responseText);
      
        var total_data=final_data.data.length;
        
        var html_body = "";
        for (var i = 0; i < total_data; i++) {
            html_body += "<tr>" +
                            "<td>" + final_data.data[i].id + "</td>" +
                            "<td>" + final_data.data[i].name + "</td>" +
                            "<td><a href=\"brand-edit.html?id=" + final_data.data[i].id + "\">Edit</a>&nbsp; | &nbsp;<button class='btn-danger' onclick=\"brandDelete(this.getAttribute('dataid'))\" dataid='" + final_data.data[i].id + "'>Delete</button></td>" +
                        "</tr>";
        }
        document.getElementById("tbl_data").innerHTML = html_body;
        

        
        
    }
    xhttp.open("GET", "http://localhost/ecomm/admin/config/api.php?api_name=brand_list");
    xhttp.send();
    };

    brandList();

export { brandList };