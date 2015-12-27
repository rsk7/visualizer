require("./style.css");
var content = require("./content.js");
var d3 = require("d3");


var data = [4, 8, 15, 16, 23, 42];

var x = d3.scale.linear()
    .domain([0, d3.max(data)])
    .range([0, 420]);

var body = d3.select("body");
var div = body.append("div")
    .attr("class", "chart")
    .selectAll("div")
        .data(data)
    .enter().append("div")
        .style("width", (d) => x(d) * 10 + "px")
        .text((d) => d);



