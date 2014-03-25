var censusReader = require('./censusReader'),
	restify = require('restify'),
	underscore = require('underscore');

function getCensusParameter (req, res, next) {
	var f = { 
		'lastYearWorked': censusReader.getLastYearWorked 
	}[req.params.parameter];
	f(req.params.geography, function (err, result) {
		res.send({ result: result });
		next();
	});
}

var server = restify.createServer();
server.get('/getCensusParameter/:parameter/:geography', getCensusParameter);
// server.head('/hello/:name', respond);

server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});