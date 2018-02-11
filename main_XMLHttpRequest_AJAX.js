console.log("loaded");
var btnFetch = document.getElementById("btnFetch");
var headerTitle = document.getElementById("headerTitle");
btnFetch.addEventListener("click", function() {
    var xhttpRequest = new XMLHttpRequest();
    xhttpRequest.open('GET', 'generated_json_data.json');
    xhttpRequest.onload = function() {
        outHTML(JSON.parse(xhttpRequest.responseText));
    };
    xhttpRequest.send();
    headerTitle.innerHTML = "Fetched data from JSON file";
    btnFetch.style.display = "none";
});

function outHTML(data) {
    //var animalInfo = document.getElementById("json-data");
    // extract key field names from the json data for HTML header
    var columnHeadings = [];
    for (var i = 0; i < data.length; i++) {
        for (var key in data[i]) {
            if (columnHeadings.indexOf(key) == -1) {

                columnHeadings.push(key);
            }
        }
    }

    // create table 
    var table = document.createElement("table");

    // Create table header row
    var tr = table.insertRow(-1);

    // into the header row, create header cells
    // and insert the extracted column headings
    for (var i = 0; i < columnHeadings.length; i++) {
        var th = document.createElement("th");
        th.innerHTML = columnHeadings[i];
        tr.appendChild(th);

    }

    // now add the json data into table as rows
    for (var i = 0; i < data.length; i++) {
        tr = table.insertRow(-1);
        for (var k = 0; k < columnHeadings.length; k++) {
            var cell = tr.insertCell(-1);
            cell.innerHTML = data[i][columnHeadings[k]];
        }
    }

    var jsonData = document.getElementById("json-data");
    jsonData.innerHTML = "";
    jsonData.appendChild(table);
}