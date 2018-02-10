#Dependencies

import json
import pandas
from flask import Flask, jsonify, render_template

app = Flask(__name__)

@app.route("/")
 	def index():
 	"""Return the homepage."""
    return render_template('index.html')

@app.route("/ridership")
def metroData():
	#Return average ridership bar charts.
	average_ridership_df = pd.read_csv('../Data/overall_ridership_average.csv').drop('Open', axis=1)
    ridership_average = average_ridership_df.to_dict(orient='records')
    ridership_average = json.dumps(ridership_average, indent=2)
    

if __name__ == "__main__":
	app.run(debug=True)