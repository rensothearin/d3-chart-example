(function () {
  var callWithJQuery;

  callWithJQuery = function (pivotModule) {
    if (typeof exports === "object" && typeof module === "object") {
      return pivotModule(require("jquery"), require("d3"));
    } else if (typeof define === "function" && define.amd) {
      return define(["jquery", "d3"], pivotModule);
    } else {
      return pivotModule(jQuery, d3);
    }
  };


  callWithJQuery(function ($, d3) {
    return $.pivotUtilities.d3_renderers = {
      
      barchart: function (pivotData, opts) {

        var addToTree, color, defaults, height, i, len, ref, result, rowKey, tree, treemap, value, width;
        defaults = {
          localeStrings: {},
          d3: {
            width: function () {
              return $(window).width() / 1.4;
            },
            height: function () {
              return $(window).height() / 1.4;
            }
          }
        };
        opts = $.extend(true, {}, defaults, opts);
        result = $("<div>").css({
          width: "100%",
          height: "100%"
        });


        ref = pivotData.getRowKeys();
        color = d3.scale.category10();
        width = opts.d3.width();
        height = opts.d3.height();
        treemap = d3.layout.treemap().size([width, height]).sticky(true).value(function (d) {
          return d.size;
        });
        var data2 = pivotData.input;
        const unique = [...new Set(data2.map(item => item.Party))];

        var x = d3.scale.ordinal().range(d3.range(0, width, (width / unique.length))),
          y = d3.scale.linear().rangeRound([height - 100, 0]);

        x.domain(unique);

        console.log(unique + "hello ")
        y.domain([0, d3.max(data2, function (d) { return d.Age; })]);


        let heights = height - 100;
        let widths = 60;

        var g = d3.select(result[0]).append("svg").style("position", "relative").style("width", width + "px").style("height", height + "px");

        g.append("g")
          .attr("transform", "translate(50," + heights + ")")
          // .attr("transform", "translate(0, 550)")
          .call(d3.svg.axis().scale(x).orient("bottom"))
          .selectAll("text")
          .attr("transform", "translate(-10,0)rotate(-45)")
          .style("text-anchor", "end");
        // Add Y axis
        g.append("g").attr("transform", "translate(50,0)")
          .call(d3.svg.axis().scale(y).orient("left"));

        g.selectAll(".mybar")
          .data(data2)
          .enter().append("rect")
          .attr("class", "mybar")
          .attr("x", function (d) { return x(d.Party) + 70; })
          .attr("y", function (d) { return y(d.Age); })
          .attr("width", widths)
          .attr("height", function (d) { return heights - y(d.Age); })
          .style("fill", "#69b3a2");
        return result;
      },
      Piechart: function (pivotData,opts) {
        
        var addToTree, color, defaults, height, i, len, ref, result, rowKey, tree, treemap, value, width;
        defaults = {
          localeStrings: {},
          d3: {
            width: function () {
              return $(window).width() / 1.4;
            },
            height: function () {
              return $(window).height() / 1.4;
            }
          }
        };
        opts = $.extend(true, {}, defaults, opts);
        result = $("<div>").css({
          width: "100%",
          height: "100%"
        });


        // Set the dimensions and margins of the graph
        var width = 450,
          height = 450,
          margin = 40;
          

        // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
        var radius = Math.min(width, height) / 2 - margin;
        console.log(radius+"hello")
        var svg = d3.select(result[0]).append("svg").style("position", "relative").style("width", width + "px").style("height", height + "px");
        // Append the svg object to the div called 'my_dataviz'
         svg 
          .append("svg")
          .attr("width", width)
          .attr("height", height)
          .append("g")
          .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

        // Create dummy data
       
        var data = {a: 9, b: 20, c:30, d:8, e:12}
        
        // var data = pivotData.input;
        // const unique = [...new Set(data.map(item => item.value))];

        // Set the color scale
        var color = d3.scale.ordinal()
          .domain(d3.keys(data))
          .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56"]);

        // Compute the position of each group on the pie
        var pie = d3.layout.pie()
          .value(function (d) { return d.Party; });
        var data_ready = pie(d3.entries(data));
       
        console.log(data_ready)

        // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function
        svg.selectAll('.mybar')
        .data(data_ready)
        .enter()
        .append('path')
        .attr('d', function(d) {
          return d3.svg.arc()
            .innerRadius(0)
            .outerRadius(radius)
            ({ startAngle: 0, endAngle: Math.PI }); // Example start and end angles
        })
        .attr('fill', function (d) { return color(d.keys); })
        .attr("stroke", "black")
        .style("stroke-width", "2px")
        .style("opacity", 0.7);
      

          // return result when complete
          return result;


      },
    };
  });
}).call(this);