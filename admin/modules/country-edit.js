export const countryEdit = () => {
   
    var url = new URL(window.location.href);  // Get the current URL
    
    var id = url.searchParams.get("id"); // Get the value of the 'id' parameter

    console.log(id); // Output
    
    var countryname = document.getElementById("countryName").value;
    var countryEditArr = { 'countryName': countryname , "id" : id };

    const xhttp = new XMLHttpRequest();
    xhttp.onload = function () {
        var final_data = JSON.parse(this.responseText);
        console.log(final_data);

        var total_data = Object.keys(final_data).length;
        console.log(total_data);

        if (total_data > 0) {
            window.location.href = "country.html";
        } 
        else {
            console.log("Invalid data");
        }
    };

    xhttp.open("POST", "http://localhost/ecomm/admin/config/api.php?api_name=countryEdit");
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(JSON.stringify(countryEditArr));


    };