var csv = require('csv'),
	restify = require('restify'),
	underscore = require('underscore');

function getCensusParameter (parameterName, geography, callback) {
	var CONFIG = { 
		'lastYearWorked': { filename: 'nomisweb-data-year-last-worked.csv',
							columnName: 'Year Last Worked: Last worked in 2011; measures: Value' } 
	}[parameterName];
	csv()
		.from.path('data/' + CONFIG.filename, {
			columns: true
		})
		.to.array(function (data, count) {
			callback(null, data[0][CONFIG.columnName]);
		})
		.transform(function (row) {
			if ((row["Rural Urban"] !== "Total") ||
				(row["geography"] !== geography)) return null;
			return row;
		})
		.on('close', function(count){
		  // when writing to a file, use the 'close' event
		  // the 'end' event may fire before the file has been written
		  console.log('Number of lines: '+count);
		});
}

function respond(req, res, next) {
  res.send('hello ' + req.params.name);
  next();
}

var server = restify.createServer();
server.get('/hello/:name', respond);
server.head('/hello/:name', respond);

getCensusParameter('lastYearWorked', 'Newport', function (err, data) {
	console.log(data);
});

server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});