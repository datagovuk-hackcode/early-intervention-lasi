var async = require('async'),
	censusReader = require('./censusReader'),
	csv = require('csv'),
	fs = require('fs'),
	_ = require('underscore');

var data = undefined;

var initialise = function (callback) {
	if (data) {
		callback(null);
	} else if (fs.existsSync('data/forecast.csv')) {
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
					forecast: data[parameterName][geography][period],
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

var calculateScores = function (callback) {
	initialise(function (err) {
		var parameters = _.keys(data),
			geographies = _.unique(_.reduce(parameters, function (memo, parameter) {
				return memo.concat(_.keys(data[parameter]));
			}, [ ])),
			periods = _.unique(_.reduce(parameters, function (memo, parameter) {
				return memo.concat(_.reduce(geographies, function (memo2, geography) {
					return memo2.concat(_.keys(data[parameter][geography]));
				}, [ ]));
			}, [ ]));
		// the relative scoring here works only because for the time being we
		// picked kpis where higher is always worse
		var overallScores = { };
		async.each(geographies, function (geography, callback) {
			if (!overallScores[geography]) overallScores[geography] = { };
			async.each(periods, function (period, callback) {
				// *****************************************************
				// for the sake of the prototype, the score is random!!!
				// *****************************************************
				overallScores[geography][period] = Math.random();
				callback(null);
			}, callback);
		}, function (err) {
			console.log(parameters);
			console.log(geographies);
			console.log(periods);
			console.log(overallScores);
			callback(null);
		});
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

calculateScores(function (err) { });
// initialise(function (err) { console.log(data); });
// exports.write("yearLastWorkedByAge", "hartlepool", 2015, 2, -5, function (err) { });