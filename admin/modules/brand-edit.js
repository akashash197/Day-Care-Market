export const brandEdit = () => {
    var url = new URL(window.location.href);  // Get the current URL
  
    var id = url.searchParams.get("id"); // Get the value of the 'id' parameter

    var brandname = document.getElementById("brandName").value;

    var brandEditArr = {'id' : id, 'brandName': brandname };

    const xhttp = new XMLHttpRequest();
    xhttp.onload = function () {
        var final_data = JSON.parse(this.responseText);

        var total_data = Object.keys(final_data).length;

        if (total_data > 0) {
            window.location.href = "brand.html";
        } else {
            console.log("Invalid data");
        }
    };

    xhttp.open("POST", "http://localhost:8000/brandEdit");
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(JSON.stringify(brandEditArr));
  }