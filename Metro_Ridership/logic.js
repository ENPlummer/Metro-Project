function getColor(d) {
    return d > 30000 ? '#800026' :
           d > 20000  ? '#BD0026' :
           d > 15000  ? '#E31A1C' :
           d > 10000  ? '#FC4E2A' :
           d > 5000   ? '#FD8D3C' :
           d > 2000   ? '#FEB24C' :
           d > 1000   ? '#FED976' :
                      '#FFEDA0';
};

d3.csv("metro_ridership.csv", createStationMarkers);

function createStationMarkers(response) {
	var stations = response.data.stations;

	var stationMarkers = []

	for (var index = 0; index < stations.length; index++) {
		var station = stations[index];

		var stationmarker = L.marker(station.lat,station.lon)
		  layer.bindPopup("<h3>" + station.STATION + "<h3>Average Ridersip: </h3>" + station.RIDERS_PER_WEEKDAY + "<h3>");
          
		  stationMarkers.push(stationMarker);

	createMap(L.layerGroup(stationMarkers));

	function pointToLayer(response,latlng){
   		return new L.circle(latlng,{
   			stroke:false,
			fillOpacity: 0.7,
			//color:"blue",
			fillColor:getColor(stations.RIDERS_PER_WEEKDAY),
			radius: feature.properties.mag * 50000

		})
  	}
 
 } 		

 function createMetroMap(metroStations) {

 	var streetMap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/streets-v10.-v10/tiles/256/{z}/{x}/{y}?" +
		"access_token=pk.eyJ1IjoibXVzaWNhbGVib255IiwiYSI6ImNqY3NiNXZsYzAyN2Myd251NHgxM3hndTYifQ.6XB6Sol3LwVrKQy5GqGS4Q");

 	// create a baseMaps object to hold the lightmap layer
  var baseMaps = {
    "Street Map": streetMap
  };

  // create an overlayMaps object to hold the bikeStations layer
  var overlayMaps = {
    "Metro Stations": metroStations
  };

  // Create the map object with options
  var map = L.map("map-id", {
    center: [38.91, 77.04],
    zoom: 12,
    layers: [streetMap, metroStations]
  });

  // create a layer control, pass in the baseMaps and overlayMaps. Add the layer control to the map
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(map);

//Adding a legend to the map.
    var legend = L.control({position: 'bottomright'});

legend.onAdd = function (myMap) {

    var div = L.DomUtil.create('div', 'info legend'),
        grades = [1000,2000,5000, 10000, 15000, 20000, 30000],
        labels = [];

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }

    return div;
};

legend.addTo(myMap);

 }
   

};
