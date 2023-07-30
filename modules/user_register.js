export const userRegister = () => {
    var firstname = document.getElementById("firstName").value;
    var lastname = document.getElementById("lastName").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    var userRegArr = {'firstName': firstname, 'lastName': lastname, 'email': email, 'password': password};
 
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function () {
        var final_data = JSON.parse(this.responseText);

        var status = final_data.status;

        var total_data = Object.keys(final_data).length;

        if (total_data > 0) {
            if (status === 1) {
                window.location.href = "login.html";
                alert("Successfully Registered");
              } else {
                document.getElementById("message").innerHTML=(final_data.msg);
              }
        } else {
            console.log("Invalid data");
        }
    };

    xhttp.open("POST", "http://localhost:8000/userRegister");
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(JSON.stringify(userRegArr));
  }