var btnFetch = document.getElementById("btnFetch");

$(document).ready(function() {
    btnFetch.addEventListener("click", function() {

        $.ajax({
            type: "GET",
            url: "generated_json_data.json",
            datatype: "json",
            success: function(result) {
                outHTML(result);
            }
        });
    });
});

function outHTML(data) {
    var animalInfo = document.getElementById("animal-info");
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