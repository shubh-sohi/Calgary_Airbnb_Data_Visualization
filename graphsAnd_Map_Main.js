function generateVisualization(fullset){
    dataset = fullset.RECORDS;

    var margin = {top: 80, right: 80, bottom: 80, left: 80},
        width = (600 - margin.left - margin.right),
        height = 400 - margin.top - margin.bottom;

    var x = d3.scaleBand()
        .rangeRound([0, width])
        .padding(0.1);

    var y0 = d3.scaleLinear()
        .range([height, 0]);

    var y1 = d3.scaleLinear()
        .domain([30,80])
        .range([height, 0]);

    var xAxis = d3.axisBottom(x);

    var yAxisLeft = d3.axisLeft(y0)
        .tickArguments([4]);

    var yAxisRight = d3.axisRight(y1)
        .tickArguments([10]);

    var svg = d3.select("body")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom + 100)
        .append("g")
        .attr("class", "graph")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    x.domain(dataset.map(function(d){
        return d.name;}));

    y0.domain(["0","800"]);

    function graph_left(svgLeft){
        var tip = d3.tip()
            .attr('class', 'd3-tip')
            .offset([-10, 0])
            .html(function(d) {
                return "<strong>Total Bookings:</strong> <span style='color:red'>" + d.value + "</span>";
            });

        svgLeft.append("text")
            .attr("x", -30)
            .attr("y", -60)
            .attr("class", "legend")
            .style("fill", "#626665")
            .text("The following information is for : "+selected);

        svgLeft.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis)
            .selectAll("text")
            .style("text-anchor", "start")
            .attr("dx", "+.50em")
            .attr("dy", "+0.50em");

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

        bars.append("rect")
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


        svgLeft.append("text")
            .attr("x", 0)
            .attr("y", height + margin.top + 10)
            .attr("class", "legend")
            .style("fill", "4285F4")
            .text("Total Bookings: " + fullset.SUMS[0].sumBookings);


    }

    function graph_right(svgRight) {
        svgRight = d3.select("body")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom + 100)
            .append("g")
            .attr("class", "graph")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        var tip01 = d3.tip()
            .attr('class', 'd3-tip')
            .offset([-10, 0])
            .html(function(d) {
                return "<strong>Average Price: $</strong> <span style='color:red'>" + d.price.toFixed(2) + "</span>";
            });

        svgRight.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis)
            .selectAll("text")
            .style("text-anchor", "start")
            .attr("dx", "+.50em")
            .attr("dy", "+0.50em");

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

        bars.append("rect")
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


        svgRight.append("text")
            .attr("x", 0)
            .attr("y", height + margin.top + 10)
            .attr("class", "legend")
            .style("fill", "34A853")
            .text("Total Average Price: $" + (fullset.SUMS[1].sumPrice).toFixed(2));
    }
    if (temp == 0){
        graph_left(svg);
        graph_right(svg);
    }
    if (temp == 1){
        graph_combination(svg);
        rightMap(svg);

    }
    // graph_combination(svg01);
    var which_hover;
    function graph_combination(svgLeft){
        var tip = d3.tip()
            .attr('class', 'd3-tip')
            .offset([-10, 0])
            .html(function(d) {
                return "<strong>Total Bookings:</strong> <span style='color:red'>" + d.value + "</span>";
            });

        var tip01 = d3.tip()
            .attr('class', 'd3-tip')
            .offset([-10, 0])
            .html(function(d) {
                return "<strong>Average Price: $</strong> <span style='color:red'>" + d.price.toFixed(2) + "</span>";
            });

        svgLeft.append("text")
            .attr("x", -30)
            .attr("y", -60)
            .attr("class", "legend")
            .style("fill", "#626665")
            .text("The following information is for : "+selected);

        svgLeft.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis)
            .selectAll("text")
            .style("text-anchor", "start")
            .attr("dx", "+.50em")
            .attr("dy", "+0.50em");

        svgLeft.append("g")
            .attr("class", "y axis axisLeft")
            .call(yAxisLeft)
            .append("text")
            .attr("y", 6)
            .attr("dy", "-2em")
            .style("text-anchor", "middle")
            .text("Total Bookings");

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

        bars.append("rect")
            .call(tip)
            .on("mouseover", tip.show, which_hover = true)
            .on("mouseout", tip.hide, which_hover = false)
            .transition()
            .delay(function(d, i) { return i*60; })
            .duration(500)
            .attr("class", "bar1")
            .attr("x", function (d) {return x(d.name);})
            .attr("width" , x.bandwidth()/2)
            .attr("y", function (d) { return y0(d.value);})
            .attr("height", function(d){
                // console.log(d.value);
                return height - y0(d.value);});

        bars.append("rect")
            .call(tip01)
            .on("mouseover", tip01.show)
            .on("mouseout", tip01.hide)
            .transition()
            .delay(function(d, i) { return i*60; })
            .duration(500)
            .attr("class", "bar2")
            .attr("x", function (d) {return x(d.name) + x.bandwidth()/2;})
            .attr("width" , x.bandwidth()/2)
            .attr("y", function (d) { return y1(d.price);})
            .attr("height", function(d){
                return height - y1(d.price);});

        svgLeft.append("text")
            .attr("x", 0)
            .attr("y", height + margin.top + 10)
            .attr("class", "legend")
            .style("fill", "4285F4")
            .text("Total Bookings: " + fullset.SUMS[0].sumBookings);
        svgLeft.append("text")
            .attr("x", 0)
            .attr("y", height + margin.top + 40)
            .attr("class", "legend")
            .style("fill", "34A853")
            .text("Total Average Price: $" + (fullset.SUMS[1].sumPrice).toFixed(2));

    }

    function rightMap(svgRight){

        var tip = d3.tip()
            .attr('class', 'd3-tip')
            .offset([-10, 0]);

        svgRight = d3.select("body")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom + 100)
            .append("g")
            .attr("class", "graph")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        svgRight.append("text")
            .attr("x", +90)
            .attr("y", -60)
            .attr("class", "legend")
            .style("fill", "#626665")
            .text("Hover over the map to get the relative information.");

        d3.json("https://data.calgary.ca/resource/mz2j-7eb5.geojson").then(function(json) {

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
                // return
                // "Area : "+d.properties.sector+"\nThere were "+nowvalue+" Bookings in the month of "+selected+
                //     "\nwith an average price of $"+nowprice.toFixed(2)+" per booking.";
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
                // .transition()
                // .delay(function(d, i) { return i*60; })
                // .duration(500)
                .attr("d", path)
                // .attr('fill', 'steelblue')
                .attr('stroke', 'white')
                .attr("class", "made");
            //         .append('title')
            //         .text(function(d) {
            //             var nowvalue, nowprice;
            //             for (var i = 0 ; i < 8; i++){
            //                 if (dataset[i].name == d.properties.sector){
            //                     nowvalue = dataset[i].value;
            //                     nowprice = dataset[i].price
            //                 }
            //             }
            //             return "Area : "+d.properties.sector+"\nThere were "+nowvalue+" Bookings in the month of "+selected+
            //                 "\nwith an average price of $"+nowprice.toFixed(2)+" per booking.";
            //         });
        });
    }
}