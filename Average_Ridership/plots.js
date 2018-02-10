//Function to build the charts.
topTenData = metroData.slice(0,10);

function buildBarChart(metroData) {
  //Top ten stations
  // Loop get the names of the stations.
  var labels = topTenData[2]['STATION'].map(function(item){
  	return topTenData[item]
  });

  var trace = {
	x:topTenData[1]['RIDERS_PER_WEEKDAY'],
	Y:topTenData[3]['STATION'],
	text:labels,
	type:'bar'
 }

 var layout = {
  title: "Top Ten Metro Stations",
  margin: {
    l: 100,
    r: 100,
    t: 100,
    b: 100
    }

};

Plotly.newPlot('top10chart', top10data, layout);

//Function to get the data from the Flask app.
function getData(metroData, callback) {
	// Use a request to get the data for the charts.
	Plotly.d3.json('/ridership',function(error, ridershipData){
		if (error) return console.warn(error);
	})
}