// quick and dirty thanks to http://stackoverflow.com/a/149099
Number.prototype.formatMoney = function(c, d, t){
var n = this, 
    c = isNaN(c = Math.abs(c)) ? 2 : c, 
    d = d == undefined ? "." : d, 
    t = t == undefined ? "," : t, 
    s = n < 0 ? "-" : "", 
    i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "", 
    j = (j = i.length) > 3 ? j % 3 : 0;
   return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
 };

 var	/* I found an explaination of the acronyms used for the licence types in
	   DECC's "The Unconventional Hydrocarbon Resources of Britain's Onshore 
	   Basins" document, available at https://www.gov.uk/government/uploads/system/uploads/attachment_data/file/66171/promote-uk-cbm.pdf
	*/
	LICENCE_TYPES = {
		"al": "Appraisal",
		"dl": "Development",
		"ex": "Exploration",
		"exl": "Exploration",
		"ml": "Mining",
		"pedl": "Petroleum Exploration and Development (generic, post-1996)",
		"pl": "Production",
	},
	CONFIGURATION = {
		"layers": {
			// the order is relevant! from the bottom to the top one
			"Homelessness": {
				"dataFile": "las.json",
				"dataType": "geojson",
				"colour": "hsl(240,65%,0%)",
			},
	
			"Domestic violence": {
				"dataFile": "las.json",
				"dataType": "geojson",
				"colour": "hsl(350,80%,0%)",
			},
			
		}
	};	

var population,
	stressIndeces = { },
	indexColours = { },
	configuration,
	layers = { },
	map,
	layersControl,
	infoControl,
	titleControl, 
	zoomControl;

var qs = (function(a) {
    if (a == "") return {};
    var b = {};
    for (var i = 0; i < a.length; ++i)
    {
        var p=a[i].split('=');
        if (p.length != 2) continue;
        b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
    }
    return b;
})(window.location.search.substr(1).split('&'));

var onEachFeature = function (feature, layer) {

	var highlightFeature = function (e) {
	    var layer = e.target;
	    layer.setStyle({
	        weight: 5,
	        color: '#666',
	        dashArray: '',
	        fillOpacity: 0.4
	    });
	    if (!L.Browser.ie && !L.Browser.opera) {
	        layer.bringToFront();
	    }
		if (!qs.embed) infoControl.update(layer.feature.properties);
	}

	var resetHighlight = function (e) {
		// TODO is there a better way of doing this?
	    _.each(layers, function (layer) { layer.resetStyle(e.target) });
	    if (!qs.embed) infoControl.update();
	}

	var zoomToFeature = function (e) {
	    map.fitBounds(e.target.getBounds());
	}

	var openLicenceDetail = function (e) {
		window.open("http://www.digitalcontraptionsimaginarium.co.uk/oil-and-gas-licensing-map/", "_blank");
	}

	layer.on({
		mouseover: highlightFeature,
		mouseout: resetHighlight,
		click: zoomToFeature,
		dblclick: openLicenceDetail,
	});

}

var style = function (feature) {
	if (!feature.properties.stressIndex) {
		// TODO: because of a bug some of the matching between population data and
		// LA names fail, 
		feature.properties.population = population[feature.properties.LAD13NM.toLowerCase()] ? population[feature.properties.LAD13NM.toLowerCase()] : 322275;
		feature.properties.stressIndex = Math.random();
		feature.properties.newHomelessPeoplePerQuarter = feature.properties.stressIndex <= .2 ? 0 : Math.floor(50 * feature.properties.population / 1463740 * feature.properties.stressIndex);
		feature.properties.estimatedFinancialImpact = _.isNumber(feature.properties.newHomelessPeoplePerQuarter) ? (feature.properties.newHomelessPeoplePerQuarter *  8391 / 4) : 0;
		indexColours[feature.properties.LAD13NM] = "hsl(240,65%," + parseInt(100 - feature.properties.stressIndex * 100) + "%)";
	} 
    return {
        fillColor: indexColours[feature.properties.LAD13NM],
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };
}

var styleDomesticViolence = function (feature) {
	console.log("I should not be here");
	if (!feature.properties.stressIndex) {
		// TODO: because of a bug some of the matching between population data and
		// LA names fail, 
		feature.properties.population = population[feature.properties.LAD13NM.toLowerCase()] ? population[feature.properties.LAD13NM.toLowerCase()] : 322275;
		feature.properties.stressIndex = Math.random();
		feature.properties.newHomelessPeoplePerQuarter = feature.properties.stressIndex <= .2 ? 0 : Math.floor(50 * feature.properties.population / 1463740 * feature.properties.stressIndex);
		feature.properties.estimatedFinancialImpact = _.isNumber(feature.properties.newHomelessPeoplePerQuarter) ? (feature.properties.newHomelessPeoplePerQuarter *  8391 / 4) : 0;
		indexColours[feature.properties.LAD13NM] = "hsl(350,80%," + parseInt(100 - feature.properties.stressIndex * 100) + "%)";
	} 
    return {
        fillColor: indexColours[feature.properties.LAD13NM],
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };
}

var initMap = function () {

	_.mixin(_.str.exports());

	d3.csv("population.csv", function (err, data) {
		population = { };
		data.forEach(function (e) {
			population[e.geography.toLowerCase()] = parseInt(e.population);
		});

		configuration = CONFIGURATION;
		async.each(_.keys(configuration.layers), function (layerName, callback) {
			switch (configuration.layers[layerName].dataType) {
				case "geojson":
					d3.json(configuration.layers[layerName].dataFile, function(data) { 
						configuration.layers[layerName].geoJSON = data;
						configuration.layers[layerName].geoJSON.features = _.map(
							configuration.layers[layerName].geoJSON.features, 
							function (feature) {
								feature.properties.licenceType = layerName;
								return feature;
							});
						callback(null); 
					});
					break;
			}
		}, function (err) {

			// create the tile layer with correct attribution
			var osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
				osmAttrib='Map data &copy; <a target="_blank" href="http://www.openstreetmap.org/about">OpenStreetMap</a> contributors' + (!qs.embed ? "" : '| See the full website at <a target="_blank" href="http://www.digitalcontraptionsimaginarium.co.uk/oil-and-gas-licensing-map/">Digital Contraptions Imaginarium</a>'),
				osm = new L.TileLayer(osmUrl, { minZoom: 1, maxZoom: 12, attribution: osmAttrib });		

			// set up the data layers
			_.each(_.keys(configuration.layers), function (layerName) {
				layers[layerName] = L.geoJson(configuration.layers[layerName].geoJSON, { 
					style: layerName === "Homelessness" ? style : styleDomesticViolence, 
					onEachFeature: onEachFeature,
				});
			});

			// set up the map
			var defaultLayersToDisplay = [ osm, layers["Homelessness"] ];
			map = new L.Map('map', {
				layers: defaultLayersToDisplay,	
				center: new L.LatLng(parseFloat(qs.lat) || 51.5, parseFloat(qs.lon) || -1.6),	
				zoom: parseInt(qs.zoom) || 8,
				zoomControl: false,
			});

			if (!qs.embed) {
				titleControl = L.control({ position: 'topleft' });
				titleControl.onAdd = function (map) {
				    this._div = L.DomUtil.create('div', 'titleControl'); 
				    this._div.innerHTML = "<h1>Local Authority Stress Index</h1><h2>Stress index browser</h2><p>This is the LASI browser. Use this map to analyse your LA against neighbouring ones and forecast the possible migration of individuals affected by social issues such as homelessness or domestic violence.</p><p>The darker the colour the highest is the financial stress expected to affect the local authority in the specified period.</p><p><img src='ogl.png'><a href='forecast.csv'>&nbsp;Download the data here</a></p>";
				    return this._div;
				};
				titleControl.addTo(map);
			}

			// set up the 'layers control'
			// TODO make the looks of this control consistent with the others, first attempt failed
			// L.control.layers(undefined, layers, { collapsed: false }).addTo(map);
			var layersForControl = { };
			_.each(_.keys(layers), function (layerName) {
				layersForControl[layerName + "&nbsp;<div style='width:10px;height:10px;border:1px solid black;background-color:" + configuration.layers[layerName].colour + ";display:inline-block'></div>"] = layers[layerName];
			});
			layersControl = L.control.layers(undefined, layersForControl, { collapsed: false, position: 'topleft' });
			layersControl.addTo(map);

			// set up the 'info control'
			if (!qs.embed) {

				infoControl = L.control();
				infoControl.onAdd = function (map) {
				    this._div = L.DomUtil.create('div', 'infoControl'); 
				    this.update();
				    return this._div;
				};

				// method that we will use to update the control based on feature properties passed
				infoControl.update = function (properties) {
					if (properties) {
				    	this._div.innerHTML = 
				    		'<h4>Detailed LA info</h4>' + 
				    		_.reduce(_.keys(properties).sort(), function (memo, propertyName) {
				    			if (properties[propertyName] != null) {
						    		switch (propertyName.toLowerCase()) {
						    			case "lad13nm":
											return memo + "<nobr><b>Name:</b> " + _.capitalize(properties[propertyName].toString().toLowerCase()) + "</nobr><br />";
											break;
						    			case "stressindex":
											return memo + "<nobr><b>Stress index:</b> " + parseInt(properties[propertyName] * 100) + "%</nobr><br />";
											break;
						    			case "population":
											return memo + "<nobr><b>Census 2011 population:</b> " + properties[propertyName].formatMoney(0, '.', ',') + "</nobr><br />";
											break;
						    			case "newhomelesspeopleperquarter":
											return memo + "<nobr><b>Expected new homeless people in quarter:</b> " + (properties[propertyName] === 0 ? "none" : properties[propertyName]) + "</nobr><br />";
											break;
						    			case "estimatedfinancialimpact":
											return memo + "<nobr><b>Estimated financial impact:</b> " + (properties[propertyName] === 0 ? "none" : "£" + properties[propertyName].formatMoney(2, '.', ',')) + "</nobr><br />";
											break;
						    			default:
						    				return memo;
						    		}
						    	} else {
						    		return memo;
						    	}
				    		}, "");
				    } else {
				    	this._div.innerHTML = '<h4>Detailed LA info</h4>Hover over the map to select the<br>local authority of interest' 
				    }
				};
				infoControl.addTo(map);
			}

			// explicitly adding the zoom control so that it is below the titleControl
			zoomControl = L.control.zoom().addTo(map);

		});
	});


}
