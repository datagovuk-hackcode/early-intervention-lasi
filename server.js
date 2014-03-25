var csv = require('csv'),
	restify = require('restify'),
	underscore = require('underscore');

function getLastYearWorked (geography, callback) {
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
		})
		.on('close', function(count){
		  // when writing to a file, use the 'close' event
		  // the 'end' event may fire before the file has been written
		  console.log('Number of lines: '+count);
		});
}

function getCensusParameter (req, res, next) {
	var f = { 
		'lastYearWorked': getLastYearWorked 
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