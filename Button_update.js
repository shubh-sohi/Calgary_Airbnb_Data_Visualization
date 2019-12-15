// Updates the Show with map button
// When presses this function is called and it hides the go back button and displays
// the Map button, when button pressed function calls the mapping function with required parameters
// as to display the map
function noMapUpdate() {
    d3.selectAll("svg").remove();
    document.getElementById("MAPoption").style.display = 'block';
    document.getElementById("BACKoption").style.display = 'none';
    temp = 0;
    //function is called with the already selevted csv
    d3.csv(window[selected]).then(function (value) {
        manage_data(value);
    });
}


// Updates the Go back button
// When presses this function is called and it hides the MAP button and displays
// the go back button, when button pressed function calls the graphing function with required parameters
// as to display the bar charts
function MAPupdateData() {
    d3.selectAll("svg").remove();
    document.getElementById("MAPoption").style.display = 'none';
    document.getElementById("BACKoption").style.display = 'block';

    temp = 1;
    //function is called with the already selevted csv
    d3.csv(window[selected]).then(function (value) {
        manage_data(value);
    });
}