var argv = require("optimist")
		.usage('Usage: $0 --port <server port>')
		.demand([ "port" ])
		.alias("port", "p")
		.default("port", "8080")	
		.argv,
	censusReader = require('./censusReader'),
	restify = require('restify'),
	underscore = require('underscore');

function getCensusParameter (req, res, next) {
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

var server = restify.createServer();
server.get('/getParameter/:parameter/:geography', getCensusParameter);
// server.head('/hello/:name', respond);

server.listen(parseInt(argv.port), function() {
  console.log('%s listening at %s', server.name, server.url);
});