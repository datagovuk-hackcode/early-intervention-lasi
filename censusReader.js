var csv = require('csv');

exports.getLastYearWorked = function (geography, callback) {
	geography = geography.toLowerCase();
	csv()
		.from.path('data/nomisweb-data-year-last-worked.csv', {
			columns: true
		})
		.to.array(function (data, count) {
			callback(null, parseInt(data[0]['Year Last Worked: Last worked in 2011; measures: Value']));
		})
		.transform(function (row) {
			if ((row["Rural Urban"] !== "Total") ||
				(row["geography"].toLowerCase() !== geography)) return null;
			return row;
		});
}

