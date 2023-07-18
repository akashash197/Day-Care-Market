export const userEdit = () => {
    var url = new URL(window.location.href);  // Get the current URL
      
    var id = url.searchParams.get("id"); // Get the value of the 'id' parameter
  
    var firstname = document.getElementById("firstName").value;
    var lastname = document.getElementById("lastName").value;
    var email = document.getElementById("email").value;
    var userrole = document.getElementById("userRole").value;

    var userEditArr = {'id':id, 'firstName': firstname, 'lastName': lastname, 'email': email, 'userRole': userrole };

    const xhttp = new XMLHttpRequest();
    xhttp.onload = function () {
        var final_data = JSON.parse(this.responseText);

        var status = final_data.status;

        var total_data = Object.keys(final_data).length;

        if (total_data > 0) {
            if (status === 1) {
                window.location.href = "user.html";
              } else {
                console.log("Invalid data");
              }
        } else {
            console.log("Invalid data");
        }
    };

    xhttp.open("POST", "http://localhost/ecomm/admin/config/api.php?api_name=userEdit");
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(JSON.stringify(userEditArr));
  }