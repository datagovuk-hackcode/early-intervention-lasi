var csv = require('csv'),
	fs = require('fs'),
	_ = require('underscore');

var data = undefined;

var initialise = function (callback) {
	if (!data && fs.existsSync('data/forecast.csv')) {
		csv()
			.from.path('data/forecast.csv', {
				columns: true
			})
			.to.array(function (d, count) {
				data = { };
				d.forEach(function (entry) {
					if (!data[entry.parameter]) data[entry.parameter] = { };
					if (!data[entry.parameter][entry.geography]) data[entry.parameter][entry.geography] = { };
					data[entry.parameter][entry.geography][entry.period] = entry.variationPerc;
				})
				callback(null);
			});
	} else {
		data = { }; 
		callback(null);
	}
};

var writeForecasts = function (callback) {
	var dataForCsv = [ ];
	_.keys(data).forEach(function (parameterName) {
		_.keys(data[parameterName]).forEach(function (geography) {
			_.keys(data[parameterName][geography]).forEach(function (period) {
				dataForCsv.push({
					parameter: parameterName,
					geography: geography,
					period: period,
					variationPerc: data[parameterName][geography][period],
				});
			});
		});
	});
	csv()
		.from.array(dataForCsv)
		.to.path('data/forecast.csv', {
			header: true,
			columns: _.keys(dataForCsv[0]),
		})
		.on('close', function(count){
			callback(null);
		});
}

exports.write = function (parameterName, geography, year, quarter, value, callback) {
	initialise(function (err) {
		if (!data[parameterName]) data[parameterName] = { };
		if (!data[parameterName][geography]) data[parameterName][geography] = { };
		data[parameterName][geography][year + " Q" + quarter] = value;
		writeForecasts(callback);
	});
}

// initialise(function (err) { console.log(data); });
exports.write("yearLastWorkedByAge", "hartlepool", 2015, 2, -5, function (err) { });