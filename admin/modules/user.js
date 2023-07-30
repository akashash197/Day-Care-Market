//User Delete
const userDelete = (dataid) => {
    var userId = dataid;
  
    var userDeleteArr = { 'id': userId };
  
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function () {
      var final_data = JSON.parse(this.responseText);
  
      var status = final_data.status;
  
      var total_data = Object.keys(final_data).length;
  
      if (total_data > 0) {
        if (status === 1) {
          window.location.href = "user.html";
          console.log("Successfully deleted");
        } else {
          console.log("Invalid data");
        }
      } else {
        console.log("Invalid data");
      }
    };
  
    xhttp.open("POST", "http://localhost:8000/userDelete");
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(JSON.stringify(userDeleteArr));
  };

  window.userDelete = userDelete;

//User List
const userList = () => {

    const xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
            
        var final_data=JSON.parse(this.responseText);
      
        var total_data=final_data.data.length;
        
        var html_body = "";
        for (var i = 0; i < total_data; i++) {
            var userRole = (final_data.data[i].user_role == 1) ? "Admin" : "User";
            html_body += "<tr>" +
                            "<td>" + final_data.data[i].id + "</td>" +
                            "<td>" + final_data.data[i].first_name + "</td>" +
                            "<td>" + final_data.data[i].last_name + "</td>" +
                            "<td>" + final_data.data[i].email + "</td>" +
                            "<td>" + userRole + "</td>" +
                            //"<td><a href=\"user-edit.html?id=" + final_data.data[i].id + "\">Edit</a>&nbsp; | &nbsp;<button class='btn-danger' onclick=\"userDelete(this.getAttribute('dataid'))\" dataid='" + final_data.data[i].id + "'>Delete</button></td>" +
                            "<td><a href=\"user-edit.html?id=" + final_data.data[i].id + "\">Edit</a>&nbsp; | &nbsp;<a href=\"user-editpassword.html?id=" + final_data.data[i].id + "\">Update Password</a>&nbsp; | &nbsp;<button class='btn-danger' onclick=\"userDelete(this.getAttribute('dataid'))\" dataid='" + final_data.data[i].id + "'>Delete</button></td>" +
                        "</tr>";
        }
        document.getElementById("tbl_data").innerHTML = html_body;
         
        
    }
    xhttp.open("GET", "http://localhost:8000/user_list");
    xhttp.send();
    };

    userList();

export { userList };