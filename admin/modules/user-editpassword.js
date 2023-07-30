export const userEditPass = () => {
    var url = new URL(window.location.href);  // Get the current URL
      
    var id = url.searchParams.get("id"); // Get the value of the 'id' parameter
  
    var password = document.getElementById("password").value;

    var userEditPassArr = {'id':id, 'password': password };
    console.log(userEditPassArr);

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

    xhttp.open("POST", "http://localhost:8000/userEditPass");
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(JSON.stringify(userEditPassArr));
  }