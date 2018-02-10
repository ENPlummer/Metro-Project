var trace = {
	labels: ["AM Peak(5:00 AM-9:30 AM)","Evening(7:00 PM-9:30 PM)","Late Night Peak(9:30 PM-11:30 PM)", "Midday(9:30 AM-3:00 PM)", "PM Peak(3:00 PM-7:00 PM"],
	values: [15137899.20, 5568444.70, 187016.70, 9067701.80, 16494126.40],
	type: "pie"
};

var data = [trace];

var layout = {
	title: "Ridership by Time Period",
};

Plotly.newPlot("plot", data, layout);