var svgwidth = 2000;
var svgheight = 750;

var chartMargin = {
	top:30,
	right:30,
	left:30,
	bottom:30
};

var chartWidth = svgwidth - chartMargin.left - chartMargin.right;
var chartHeight = svgheight - chartMargin.top - chartMargin.bottom;

var svg = d3
  .select("body")
  .append("svg")
    .attr("height", svgheight)
    .attr("width", svgwidth)
  .append("g") 
     .attr("transform", "translate(" + chartMargin.right + ", " + chartMargin.top + ")");
//xaxis
var xBandScale = d3.scaleBand().range([0,chartWidth]).padding(0.1);

//yaxis
var yLinearScale = d3.scaleLinear().range([chartHeight, 0]);

//Load the top 20 Metro stations by ridership CSV.
d3.csv("top20Stations.csv", function(error, ridershipData){
	if (error) throw error;

	// Cast the ridership value to a number for each piece of ridershipData.
	ridershipData.forEach(function(data) {
    data.RIDERS_PER_WEEKDAY = +data.RIDERS_PER_WEEKDAY;
  });

  // Set the domain of the band scale to the names of students in hours-of-tv-watched.csv
  xBandScale.domain(ridershipData.map(function(data) {
    return data.STATION;
  }));

  // Set the domain of the linear scale to 0 and the largest number of hours watched in tvData
  yLinearScale.domain([0, d3.max(ridershipData, function(data) {
    return data.RIDERS_PER_WEEKDAY;
  })]);

  // Create two new functions passing our scales in as arguments
  // These will be used to create the chart's axes
  var bottomAxis = d3.axisBottom(xBandScale);
  var leftAxis = d3.axisLeft(yLinearScale).ticks(10);

  // Create one SVG rectangle per piece of tvData
  // Use the linear and band scales to position each rectangle within the chart
  svg
    .selectAll(".bar")
      .data(ridershipData)
      .enter()
      .append("rect")
        .attr("class", "bar")
        .attr("x", function(data) {
          return xBandScale(data.STATION);
        })
        .attr("y", function(data) {
          return yLinearScale(data.RIDERS_PER_WEEKDAY);
        })
        .attr("width", xBandScale.bandwidth())
        .attr("height", function(data) {
          return chartHeight - yLinearScale(data.RIDERS_PER_WEEKDAY);
        });

  // Append two SVG group elements to the SVG area, create the bottom and left axes inside of them
  svg.append("g")
    .call(leftAxis);

  svg.append("g")
    .attr("transform", "translate(0, " + chartHeight + ")")
    .call(bottomAxis);
});

