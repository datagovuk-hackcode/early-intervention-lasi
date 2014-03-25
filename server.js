var argv = require("optimist")
		.usage('Usage: $0 --port <server port>')
		.demand([ "port" ])
		.alias("port", "p")
		.default("port", "8080")	
		.argv,
	censusReader = require('./censusReader'),
	dataManager = require('./dataManager'),
	restify = require('restify'),
	underscore = require('underscore');

function getParameter (req, res, next) {
	var f = { 
		'yearLastWorkedNotInEmployment': censusReader.getYearLastWorkedNotInEmployment,
		'yearLastWorkedNeverWorked': censusReader.getYearLastWorkedNeverWorked,
		'yearLastWorkedByAge': censusReader.getYearLastWorkedByAge,
		'highestLevelOfQualification': censusReader.getHighestLevelOfQualification,
		'adultsNotInEmployment': censusReader.getAdultsNotInEmployment,
		'establishmentsWithPersonsSleepingRough': censusReader.getEstablishmentsWithPersonsSleepingRough,
	}[req.params.parameter];
	f(req.params.geography, function (err, result) {
		res.send({ result: result });
		next();
	});
}

// example http://localhost:8080/
function setParameter (req, res, next) {
	dataManager.write(req.params.parameter, req.params.geography, req.params.year, req.params.quarter, req.params.value, function (err) {
		res.send({ result: "ok" });
		next();
	})	
}

var server = restify.createServer();
server.get('/getParameter/:parameter/:geography', getParameter);
server.get('/setParameter/:parameter/:geography/:year/:quarter/:value', setParameter);

server.listen(parseInt(argv.port), function() {
	console.log('%s listening at %s', server.name, server.url);
});