
//computation of all the bar charts and Map.
function generateVisualization(fullset){
    dataset = fullset.RECORDS;

    var margin = {top: 80, right: 80, bottom: 80, left: 80},
        width = (600 - margin.left - margin.right),
        height = 400 - margin.top - margin.bottom;

    //positioning for x and y axis including
    var x = d3.scaleBand()
        .rangeRound([0, width])
        .padding(0.1);

    var y0 = d3.scaleLinear()
        .range([height, 0]);

    var y1 = d3.scaleLinear()
        .domain([30,80])
        .range([height, 0]);

    //tick arguments for y and x axis and also defines their alignment
    var xAxis = d3.axisBottom(x);

    var yAxisLeft = d3.axisLeft(y0)
        .tickArguments([4]);

    var yAxisRight = d3.axisRight(y1)
        .tickArguments([10]);

    //initial svg
    var svg = d3.select("body")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom + 100)
        .append("g")
        .attr("class", "graph")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    //range for x and y axis
    x.domain(dataset.map(function(d){
        return d.name;}));

    y0.domain(["0","800"]);

    function graph_left(svgLeft){

        //tool tip showing the total booking for the hovered bar/locality
        var tip = d3.tip()
            .attr('class', 'd3-tip')
            .offset([-10, 0])
            .html(function(d) {
                return "<strong>Total Bookings:</strong> <span style='color:red'>" + d.value + "</span>";
            });

        //appends text showing the selected month on top of the graph
        svgLeft.append("text")
            .attr("x", -30)
            .attr("y", -60)
            .attr("class", "legend")
            .style("fill", "#626665")
            .text("The following information is for : "+selected);

        //appends the x axis on the graph svg
        svgLeft.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis)
            .selectAll("text")
            .style("text-anchor", "start")
            .attr("dx", "+.50em")
            .attr("dy", "+0.50em");

        //appends the left y axis on the graph svg
        svgLeft.append("g")
            .attr("class", "y axis axisLeft")
            .call(yAxisLeft)
            .append("text")
            .attr("y", 6)
            .attr("dy", "-2em")
            .style("text-anchor", "middle")
            .text("Total Bookings");

        bars = svgLeft.selectAll(".bar")
            .data(dataset)
            .enter();

        //appends rectangles on the svg to display bar graphs
        bars.append("rect")
            //this is where the tool tip shows information on mouse over and hides on mouse out
            .call(tip)
            .on("mouseover", tip.show)
            .on("mouseout", tip.hide)
            .transition()
            .delay(function(d, i) { return i*60; })
            .duration(500)
            .attr("class", "bar1")
            .attr("x", function (d) {return x(d.name);})
            .attr("width" , x.bandwidth())
            .attr("y", function (d) { return y0(d.value);})
            .attr("height", function(d){
                // console.log(d.value);
                return height - y0(d.value);});

        //test showing the total bookings for the selected month at the bottom,
        svgLeft.append("text")
            .attr("x", 0)
            .attr("y", height + margin.top + 10)
            .attr("class", "legend")
            .style("fill", "4285F4")
            .text("Total Bookings: " + fullset.SUMS[0].sumBookings);


    }

    function graph_right(svgRight) {

        //additional svg had to be defined to accommodate the additional
        //bar graph, as to map two graph on a single display. This additional
        //scg aligns itself adjacent to the first svg.
        svgRight = d3.select("body")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom + 100)
            .append("g")
            .attr("class", "graph")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        //tip function for the average price
        var tip01 = d3.tip()
            .attr('class', 'd3-tip')
            .offset([-10, 0])
            .html(function(d) {
                return "<strong>Average Price: $</strong> <span style='color:red'>" + d.price.toFixed(2) + "</span>";
            });

        //appends the x axis on the graph scg
        svgRight.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis)
            .selectAll("text")
            .style("text-anchor", "start")
            .attr("dx", "+.50em")
            .attr("dy", "+0.50em");

        //appends the right y axis in the graph svg
        svgRight.append("g")
            .attr("class", "y axis axisRight")
            .attr("transform", "translate(" + (width) + ",0)")
            .call(yAxisRight)
            .append("text")
            .attr("y", 6)
            .attr("dy", "-2em")
            .attr("dx", "2em")
            .style("text-anchor", "middle")
            .text("Average Price in CAD");

        bars = svgRight.selectAll(".bar")
        // .call(tip01)
            .data(dataset)
            .enter();

        //appends rectangles on the svg to display bar graphs
        bars.append("rect")
            //this is where the tool tip shows information on mouse over and hides on mouse out
            .call(tip01)
            .on("mouseover", tip01.show)
            .on("mouseout", tip01.hide)
            .transition()
            .delay(function(d, i) { return i*60; })
            .duration(500)
            .attr("class", "bar2")
            .attr("x", function (d) {return x(d.name);})
            .attr("width" , x.bandwidth())
            .attr("y", function (d) { return y1(d.price);})
            .attr("height", function(d){
                return height - y1(d.price);});

        //test showing the total average price for the selected month at the bottom,
        svgRight.append("text")
            .attr("x", 0)
            .attr("y", height + margin.top + 10)
            .attr("class", "legend")
            .style("fill", "34A853")
            .text("Total Average Price: $" + (fullset.SUMS[1].sumPrice).toFixed(2));
    }

    //initial value is temp = 0 which graphs the initial two seperate bar graphs
    //and temp = 1 graph the nested bar graphs with the map
    if (temp == 0){
        graph_left(svg);
        graph_right(svg);
    }
    if (temp == 1){
        graph_combination(svg);
        rightMap(svg);

    }
    var which_hover;

    //function computes the
    function graph_combination(svgLeft){

        //tool tip for the number bookings bars in the bested bar chart
        var tip = d3.tip()
            .attr('class', 'd3-tip')
            .offset([-10, 0])
            .html(function(d) {
                return "<strong>Total Bookings:</strong> <span style='color:red'>" + d.value + "</span>";
            });

        //tool tip for the price bars in the bested bar chart
        var tip01 = d3.tip()
            .attr('class', 'd3-tip')
            .offset([-10, 0])
            .html(function(d) {
                return "<strong>Average Price: $</strong> <span style='color:red'>" + d.price.toFixed(2) + "</span>";
            });

        //append text showing the selected month on top of the graph
        svgLeft.append("text")
            .attr("x", -30)
            .attr("y", -60)
            .attr("class", "legend")
            .style("fill", "#626665")
            .text("The following information is for : "+selected);

        //append the x axis on the graph svg
        svgLeft.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis)
            .selectAll("text")
            .style("text-anchor", "start")
            .attr("dx", "+.50em")
            .attr("dy", "+0.50em");

        //append the left y axis on the graph svg
        svgLeft.append("g")
            .attr("class", "y axis axisLeft")
            .call(yAxisLeft)
            .append("text")
            .attr("y", 6)
            .attr("dy", "-2em")
            .style("text-anchor", "middle")
            .text("Total Bookings");

        //append the right y axis on the graph svg
        svgLeft.append("g")
            .attr("class", "y axis axisRight")
            .attr("transform", "translate(" + (width) + ",0)")
            .call(yAxisRight)
            .append("text")
            .attr("y", 6)
            .attr("dy", "-2em")
            .attr("dx", "2em")
            .style("text-anchor", "middle")
            .text("Average Price in CAD");

        bars = svgLeft.selectAll(".bar")
            .data(dataset)
            .enter();

        //appends rectangles on the svg to display bar graphs, but are of 1/2 breath to host the nesting
        bars.append("rect")
            //tip shows info when mouse hovers and hides when not
            .call(tip)
            .on("mouseover", tip.show, which_hover = true)
            .on("mouseout", tip.hide, which_hover = false)
            //graphical display
            .transition()
            .delay(function(d, i) { return i*60; })
            .duration(500)
            .attr("class", "bar1")
            .attr("x", function (d) {return x(d.name);})
            //here is where the 1/2 with is defined
            .attr("width" , x.bandwidth()/2)
            .attr("y", function (d) { return y0(d.value);})
            .attr("height", function(d){
                // console.log(d.value);
                return height - y0(d.value);});

        //appends rectangles on the svg to display bar graphs, but are of 1/2 breath to host the nesting
        bars.append("rect")
            //tip shows info when mouse hovers and hides when not
            .call(tip01)
            .on("mouseover", tip01.show)
            .on("mouseout", tip01.hide)
            //graphical display
            .transition()
            .delay(function(d, i) { return i*60; })
            .duration(500)
            .attr("class", "bar2")
            //here is where the 1/2 with is defined
            .attr("x", function (d) {return x(d.name) + x.bandwidth()/2;})
            .attr("width" , x.bandwidth()/2)
            .attr("y", function (d) { return y1(d.price);})
            .attr("height", function(d){
                return height - y1(d.price);});

        //appends text displaying the total bookings for selected month under
        //the nested bar graph on the Map page.
        svgLeft.append("text")
            .attr("x", 0)
            .attr("y", height + margin.top + 10)
            .attr("class", "legend")
            .style("fill", "4285F4")
            .text("Total Bookings: " + fullset.SUMS[0].sumBookings);

        //appends text displaying the total average prise for selected month under
        //the nested bar graph on the Map page.
        svgLeft.append("text")
            .attr("x", 0)
            .attr("y", height + margin.top + 40)
            .attr("class", "legend")
            .style("fill", "34A853")
            .text("Total Average Price: $" + (fullset.SUMS[1].sumPrice).toFixed(2));

    }

    //computed and plots the calgary map with respective data values and informative tool tip
    function rightMap(svgRight){

        //definition of the tool tip variable with initial attributes
        var tip = d3.tip()
            .attr('class', 'd3-tip')
            .offset([-10, 0]);

        //appending a smaller inner svg to host the map
        svgRight = d3.select("body")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom + 100)
            .append("g")
            .attr("class", "graph")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        //appending relative info text on top of the map
        svgRight.append("text")
            .attr("x", +90)
            .attr("y", -60)
            .attr("class", "legend")
            .style("fill", "#626665")
            .text("Hover over the map to get the relative information.");

        //The calgary json data set is provide by the City of Calgary
        // Contains information licensed under the Open Government Licence – City of Calgary.
        //link to which is https://data.calgary.ca/stories/s/Open-Calgary-Terms-of-Use/u45n-7awa

        d3.json("https://data.calgary.ca/resource/mz2j-7eb5.geojson").then(function(json) {

            //tooltip function, gets html attribute by running a loop in the csv passed object
            //and mattching the value of the cuurent locality
            tip.html(function (d) {
                var nowvalue, nowprice;
                for (var i = 0 ; i < 8; i++){
                    if (dataset[i].name == d.properties.sector){
                        nowvalue = dataset[i].value;
                        nowprice = dataset[i].price
                    }
                }
                return "<strong>Area : </strong> <span>" + d.properties.sector + "</span><br>"+
                    "<strong>Total Bookings : </strong> <span style='color:#4285F4'>" + nowvalue + "</span><br>"+
                    "<strong>Average Price : $</strong> <span style='color:#34A853'>" + nowprice.toFixed(2) + "</span>"
            });

            var projection = d3.geoMercator()
                .fitSize([width+100,height+100],json);


            //Define path generator
            var path = d3.geoPath()
                .projection(projection);

            //Bind data and create one path per GeoJSON feature
            svgRight.selectAll("path")
                .data(json.features)
                .enter()
                .append("path")
                .call(tip)
                .on("mouseover", tip.show)
                .on("mouseout", tip.hide)
                .attr("d", path)
                .attr('stroke', 'white')
                .attr("class", "made");

        });
    }
}