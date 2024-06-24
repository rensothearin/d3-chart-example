let Chart = {
    generateLineChart: function(data) {
        // Function to extract data and draw the chart
         // Set the dimensions and margins of the graph
        var margin = { top: 10, right: 30, bottom: 30, left: 60 },
        width = 800 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

        // Append the svg object to the body of the page
        var svg = d3.select("#my_dataviz")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        
    
        // Remove the header row and sanitize the data
        var years = tableData[0].slice(1).map((d) => d ? d.trim() : '');
        
        var investments = tableData.slice(1).map((row) => ({
            name: row[0] ? row[0].trim() : '',
            values: row.slice(1).map((d) => d ? +d.replace(/,/g, "").trim() : 0)
        }));

        // Clear the existing chart
        svg.selectAll("*").remove();

        // X axis
        var x = d3.scaleLinear()
            .domain([years[0], years.slice(-1).pop()])
            .range([0, width]);
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x).tickFormat(d3.format("d")));

        // Y axis
        var y = d3.scaleLinear()
            .domain([0, d3.max(investments, (c) => d3.max(c.values))])
            .range([height, 0]);
        svg.append("g")
            .call(d3.axisLeft(y));

        // This allows to find the closest X index of the mouse
        var bisect = d3.bisector(function(d) { return d.x; }).left;

        // Create the circle that travels along the curve of the chart
        // var focus = svg
        //     .append('g')
        //     .append('circle')
        //     .style("fill", "black")
        //     .attr("stroke", "black")
        //     .attr('r', 2)
        //     .style("opacity", 0);

        // Create the text that travels along the curve of the chart
        // var focusText = svg
        //     .append('g')
        //     .append('text')
        //     .style("opacity", 0)
        //     .attr("text-anchor", "left")
        //     .attr("alignment-baseline", "middle");

        // Add the lines
        var line = d3.line()
            .x((d, i) => x(2005 + i))
            .y((d) => y(d));

        svg.selectAll(".line")
            .data(investments)
            .enter()
            .append("path")
            .attr("class", "line")
            .attr("fill", "none")
            .attr("stroke", (d, i) => d3.schemeCategory10[i])
            .attr("stroke-width", 1)
            .attr("d", (d) => line(d.values));

        // Add labels
        svg.selectAll(".label")
            .data(investments)
            .enter()
            .append("text")
            .datum((d) => ({ name: d.name, value: d.values[d.values.length - 1] }))
            .attr("transform", (d, i) => `translate(${x(2023)},${y(d.value)})`)
            .attr("x", 5)
            .attr("dy", ".35em")
            .attr("text-anchor", "start")
            .style("fill", (d, i) => d3.schemeCategory10[i])
            .text((d) => d.name);

        // Add the points to each line
        investments.forEach((investment, i) => {
            svg
              .append("g")
              .selectAll("dot")
              .data(investment.values)
              .enter()
              .append("circle")
              .attr("cx", ((d, i) => x(2005 + i)))
              .attr("cy", ((d) => y(d)))
              .attr("r", 5)
              .attr("fill", d3.schemeCategory10[i]);
        });

        // Create a rect on top of the svg area: this rectangle recovers mouse position
        svg.append('rect')
            .style("fill", "none")
            .style("pointer-events", "all")
            .attr('width', width)
            .attr('height', height)
            //.on('mouseover', mouseover)
            //.on('mousemove', mousemove)
            //.on('mouseout', mouseout);

        // What happens when the mouse moves -> show the annotations at the right positions
        function mouseover() {
            focus.style("opacity", 1);
            focusText.style("opacity", 1);
        }

        function mousemove() {
        // Recover coordinate we need
        var x0 = x.invert(d3.mouse(this)[0]);
        var i = bisect(data, x0, 1);
        var selectedData = data[i];
        focus
            .attr("cx", x(selectedData.x))
            .attr("cy", y(selectedData.y));
        focusText
            .html("x:" + selectedData.x + "  -  y:" + selectedData.y)
            .attr("x", x(selectedData.x) + 15)
            .attr("y", y(selectedData.y));
        }

        function mouseout() {
            focus.style("opacity", 0);
            focusText.style("opacity", 0);
        }
      }
}
