//State Delete
const stateDelete = (dataid) => {
    var stateId = dataid;
    
    var stateDeleteArr = { 'id': stateId };
  
  
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
          window.location.href = "state.html";
        } else {
          console.log("Invalid data");
        }
      } else {
        console.log("Invalid data");
      }
    };
  
    xhttp.open("POST", "http://localhost:8000/stateDelete");
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(JSON.stringify(stateDeleteArr));
  };

  window.stateDelete = stateDelete;

//State List
const stateList = () => {

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
                            "<td>" + final_data.data[i].country_name + "</td>" +
                            "<td><a href=\"state-edit.html?id=" + final_data.data[i].id + "\">Edit</a>&nbsp; | &nbsp;<button class='btn-danger' onclick=\"stateDelete(this.getAttribute('dataid'))\" dataid='" + final_data.data[i].id + "'>Delete</button></td>" +
                        "</tr>";
        }
        document.getElementById("tbl_data").innerHTML = html_body;
        

        
        
    }
    xhttp.open("GET", "http://localhost:8000/state_list");
    xhttp.send();
    };

    stateList();

    export { stateList };