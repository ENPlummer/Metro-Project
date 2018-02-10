
        function getOptions() {
            // Grab a reference to the dropdown select element
            var selector_time = document.getElementById('selTimeData');
            var selector_station = document.getElementById('selStationData');

            // Use the list of sample names to populate the select options
            Plotly.d3.json('/time', function(error, sampleNames) {
                for (var i = 0; i < sampleNames.length;  i++) {
                    var currentOption = document.createElement('option');
                    currentOption.text = sampleNames[i];
                    currentOption.value = sampleNames[i]
                    selector_time.appendChild(currentOption);
                }
            })
            Plotly.d3.json('/metro_locations', function(error, sampleNames) {
                for (var i = 0; i < sampleNames.length;  i++) {
                    var currentOption = document.createElement('option');
                    currentOption.text = sampleNames[i];
                    currentOption.value = sampleNames[i]
                    selector_station.appendChild(currentOption);
                }
            })
        }
        function getDelayData() {
            var selector_time = document.getElementById('selTimeData');
            var selector_station = document.getElementById('selStationData');    

            selectedTime = selector_time.value
            selectedStation = selector_station.value  
            Plotly.d3.json(`/incidents/${selectedTime}/${selectedStation}`, function(error, sampleNames) {
                console.log(sampleNames)
                document.getElementById('sample-metadata').innerHTML = sampleNames
            })     
        }

        function optionChanged(newSample) {
            // Fetch new data each time a new sample is selected
            getData(newSample, updateCharts);
        }
        
        function init() {
            getOptions();
        }
        // Initialize the dashboard
        init();