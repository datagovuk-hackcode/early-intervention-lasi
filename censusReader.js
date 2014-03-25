var csv = require('csv');

exports.getYearLastWorkedNotInEmployment = function (geography, callback) {
	geography = geography.toLowerCase();
	csv()
		.from.path('data/nomisweb-data-year-last-worked.csv', {
			columns: true
		})
		.to.array(function (data, count) {
			callback(null, parseInt(data[0]['Year Last Worked: Not in employment: Total; measures: Value']));
		})
		.transform(function (row) {
			if ((row["Rural Urban"] !== "Total") ||
				(row["geography"].toLowerCase() !== geography)) return null;
			return row;
		});
}

exports.getYearLastWorkedNeverWorked = function (geography, callback) {
	geography = geography.toLowerCase();
	csv()
		.from.path('data/nomisweb-data-year-last-worked.csv', {
			columns: true
		})
		.to.array(function (data, count) {
			callback(null, parseInt(data[0]['Year Last Worked: Never worked; measures: Value']));
		})
		.transform(function (row) {
			if ((row["Rural Urban"] !== "Total") ||
				(row["geography"].toLowerCase() !== geography)) return null;
			return row;
		});
}

exports.getYearLastWorkedByAge = function (geography, callback) {
	geography = geography.toLowerCase();
	csv()
		.from.path('data/nomisweb-data-year-last-worked-by-age.csv', {
			columns: true
		})
		.to.array(function (data, count) {
			callback(null, parseInt(data[0]['Year Last Worked: Not in employment: Total; Age: All categories: Age 16 and over; measures: Value']));
		})
		.transform(function (row) {
			if (row["geography"].toLowerCase() !== geography) return null;
			return row;
		});
}

exports.getHighestLevelOfQualification = function (geography, callback) {
	geography = geography.toLowerCase();
	csv()
		.from.path('data/nomisweb-data-highest-level-of-qualification.csv', {
			columns: true
		})
		.to.array(function (data, count) {
			callback(null, parseInt(data[0]['Qualification: No qualifications; measures: Value']));
		})
		.transform(function (row) {
			if ((row["Rural Urban"] !== "Total") ||
				(row["geography"].toLowerCase() !== geography)) return null;
			return row;
		});
}

exports.getAdultsNotInEmployment = function (geography, callback) {
	geography = geography.toLowerCase();
	csv()
		.from.path('data/nomisweb-data-adults-not-in-employment.csv', {
			columns: true
		})
		.to.array(function (data, count) {
			callback(null, parseInt(data[0]['Household Composition: No adults in employment in household; measures: Value']));
		})
		.transform(function (row) {
			if ((row["Rural Urban"] !== "Total") ||
				(row["geography"].toLowerCase() !== geography)) return null;
			return row;
		});
}

exports.getEstablishmentsWithPersonsSleepingRough = function (geography, callback) {
	geography = geography.toLowerCase();
	csv()
		.from.path('data/nomisweb-data-residence-type.csv', {
			columns: true
		})
		.to.array(function (data, count) {
			callback(null, parseInt(data[0]['Residence Type: Communal establishments with persons sleeping rough identified; measures: Value']));
		})
		.transform(function (row) {
			if ((row["Rural Urban"] !== "Total") ||
				(row["geography"].toLowerCase() !== geography)) return null;
			return row;
		});
}




