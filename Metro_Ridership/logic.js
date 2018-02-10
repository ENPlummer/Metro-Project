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

d3.json("metro_ridership.json", createStationMarkers);

function createStationMarkers(response) {
	var STATION = response.STATION;

	var stationMarkers = []

	for (var index = 0; index < STATION.length; index++) {
		var station = STATION[index];

		var stationmarker = L.marker(station.lat,station.lon)
		  layer.bindPopup("<h3>" + STATION + "<h3>Average Ridersip: </h3>" + RIDERS_PER_WEEKDAY + "<h3>");
          
		  stationMarkers.push(stationMarker);
 
 } 

  createMetroMap(L.layerGroup(stationMarkers));
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
  var map = L.map("map", {
    center: [38.91, 77.04],
    zoom: 12,
    layers: [streetMap, metroStations]
  });

  // create a layer control, pass in the baseMaps and overlayMaps. Add the layer control to the map
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(map);
   

}
