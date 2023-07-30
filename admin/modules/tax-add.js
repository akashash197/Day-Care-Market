export const taxAdd = () => {
    var taxname = document.getElementById("taxName").value;
    var slab = document.getElementById("slabName").value;

    var taxAddArr = { 'taxName': taxname, 'slab':slab };

    const xhttp = new XMLHttpRequest();
    xhttp.onload = function () {
        var final_data = JSON.parse(this.responseText);

        var total_data = Object.keys(final_data).length;

        if (total_data > 0) {
            window.location.href = "tax.html";
        } else {
            console.log("Invalid data");
        }
    };

    xhttp.open("POST", "http://localhost:8000/taxAdd");
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(JSON.stringify(taxAddArr));
  }