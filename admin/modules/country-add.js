export const countryAdd = () => {
    var countryname = document.getElementById("countryName").value;
    var countryaddArr = { 'countryName': countryname };

    const xhttp = new XMLHttpRequest();
    xhttp.onload = function () {
        var final_data = JSON.parse(this.responseText);
        console.log(final_data);

        var total_data = Object.keys(final_data).length;
        console.log(total_data);

        if (total_data > 0) {
            window.location.href = "country.html";
        } else {
            console.log("Invalid data");
        }
    };

    xhttp.open("POST", "http://localhost:8000/countryAdd");
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(JSON.stringify(countryaddArr));
    };


