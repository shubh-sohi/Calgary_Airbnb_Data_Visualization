function noMapUpdate() {
    d3.selectAll("svg").remove();
    document.getElementById("MAPoption").style.display = 'block';
    document.getElementById("BACKoption").style.display = 'none';
    temp = 0;
    d3.csv(window[selected]).then(function (value) {
        manage_data(value);
    });
}

function MAPupdateData() {
    d3.selectAll("svg").remove();
    document.getElementById("MAPoption").style.display = 'none';
    document.getElementById("BACKoption").style.display = 'block';

    temp = 1;
    d3.csv(window[selected]).then(function (value) {
        manage_data(value);
    });
}