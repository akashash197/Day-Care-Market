export const categoryAdd = () => {
    var categoryname = document.getElementById("categoryName").value;

    var categoryAddArr = { 'categoryName': categoryname };

    const xhttp = new XMLHttpRequest();
    xhttp.onload = function () {
        var final_data = JSON.parse(this.responseText);

        var total_data = Object.keys(final_data).length;

        if (total_data > 0) {
            window.location.href = "category.html";
        } else {
            console.log("Invalid data");
        }
    };

    xhttp.open("POST", "http://localhost:8000/categoryAdd");
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(JSON.stringify(categoryAddArr));
  }