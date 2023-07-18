export const brandAdd = () => {
    var brandname = document.getElementById("brandName").value;

    var brandAddArr = { 'brandName': brandname };
    console.log(brandAddArr);

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

    xhttp.open("POST", "http://localhost/ecomm/admin/config/api.php?api_name=brandAdd");
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(JSON.stringify(brandAddArr));
  }