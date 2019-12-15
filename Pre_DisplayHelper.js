//want the back option to be hiddin initially
document.getElementById('BACKoption').style.display = 'none';

//dataset for the selector
var groups = ["Select a Month", "august_2016", "sept_2016", "oct_2016", "nov_2016", "dec_2016", "jan_2017", "feb_2017", "mar_2017", "april_2017", "may_2017", "june_2017", "july_2017", "august_2017"];

//definition of the drop down variable and addition of all the values defined in the array above
var dropDown = d3.select("#selectButton");

dropDown.selectAll("myButtons")
    .data(groups)
    .enter()
    .append("option")
    .text(function (d) {return d;})
    .attr("value", function (d) {return d;});


//variables assigned to their respective csv files
var august_2016 = "calgary/tomslee_airbnb_calgary_0542_2016-08-22.csv", sept_2016 = "calgary/tomslee_airbnb_calgary_0554_2016-09-11.csv",
    oct_2016 = "calgary/tomslee_airbnb_calgary_0579_2016-09-21.csv", nov_2016 = "calgary/tomslee_airbnb_calgary_0624_2016-10-27.csv",
    dec_2016 = "calgary/tomslee_airbnb_calgary_0679_2016-12-09.csv", jan_2017 = "calgary/tomslee_airbnb_calgary_0724_2016-12-25.csv",
    feb_2017 = "calgary/tomslee_airbnb_calgary_0870_2017-02-12.csv", mar_2017 = "calgary/tomslee_airbnb_calgary_0943_2017-03-11.csv",
    april_2017 = "calgary/tomslee_airbnb_calgary_1055_2017-04-10.csv", may_2017 = "calgary/tomslee_airbnb_calgary_1203_2017-05-08.csv",
    june_2017 = "calgary/tomslee_airbnb_calgary_1326_2017-06-10.csv", july_2017 = "calgary/tomslee_airbnb_calgary_1443_2017-07-10.csv",
    august_2017 = "calgary/tomslee_airbnb_calgary_1558_2017-08-10.csv";


var selected;
var temp = 0;

//when the drop down vale is selected or changes, function that computes the object from csv is
//called with the changed csv which further calls the mapping function
dropDown.on("change", function () {
    d3.selectAll("svg").remove();
    selected = this.value;
    d3.csv(window[selected]).then(function (value) {
        manage_data(value);
    });
});