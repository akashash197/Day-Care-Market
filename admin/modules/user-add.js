export const userAdd = () => {
    var firstname = document.getElementById("firstName").value;
    var lastname = document.getElementById("lastName").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var userrole = document.getElementById("userRole").value;

    var userAddArr = {'firstName': firstname, 'lastName': lastname, 'email': email, 'password': password, 'userRole': userrole };

    const xhttp = new XMLHttpRequest();
    xhttp.onload = function () {
        var final_data = JSON.parse(this.responseText);

        var status = final_data.status;

        var total_data = Object.keys(final_data).length;

        if (total_data > 0) {
            if (status === 1) {
                window.location.href = "user.html";
              } else {
                document.getElementById("message").innerHTML=(final_data.msg);
              }
        } else {
            console.log("Invalid data");
        }
    };

    xhttp.open("POST", "http://localhost/ecomm/admin/config/api.php?api_name=userAdd");
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(JSON.stringify(userAddArr));
  }
