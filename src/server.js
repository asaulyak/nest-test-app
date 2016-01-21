var db = require('./storage/db');
var restClient = require('./rest-client');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var scheduler = require('./scheduler');

app.use(bodyParser.json());
app.use('/public', express.static(__dirname + '/public'));
app.use('/node_modules', express.static(__dirname + '/node_modules'));
app.use('/semantic', express.static(__dirname + '/semantic'));

scheduler.run();

// Web Client
app.get('/', function (req, res) {
	res.sendFile(__dirname + '/index.html');
});

// API
app.get('/api/devices', function (req, res) {
	restClient.devices.getDevices(
		function (error, data) {
			if (error) {
				console.log('Error:', error);
				res.status(500).end();
			}
			else {
				db.devices.getDevices()
					.then(function (devices) {
							mergeDevicesInfo(devices, data, function (info) {
								res.json(info);
							});
						}
					)
					.then(null, function (error) {
						console.log('Error occurred while querying db', error);
						res.status(500).end();
					});
			}
		}
	);
});

app.patch('/api/devices/:id', function (req, res) {
	db.devices.updateDevice(req.params.id, req.body)
		.then(function () {
			scheduler.rescheduleDevice(req.params.id);
			res.status(204).end();
		})
		.then(null, function (error) {
			console.log('Error occurred while querying db', error);
			res.status(500).end();
		});
});

app.get('/api/modes', function (req, res) {
	db.modes.getModes()
		.then(function (modes) {
			res.json(modes);
		});
});

app.get('/api/modes/:id', function (req, res) {
	db.modes.getMode(req.params.id)
		.then(function (modes) {
			var mode = modes[0];

			if (mode) {
				res.json(modes[0]);
			}
			else {
				res.status(404).end();
			}
		})
		.then(null, function (error) {
			console.log('Error occurred while querying db', error);
			res.status(500).end();
		});
});

app.patch('/api/modes/:id', function (req, res) {
	if (!req.body || Object.keys(req.body).length === 0) {
		res.status(400).end();
	}
	else {
		db.modes.updateMode(req.params.id, req.body)
			.then(function () {
				res.status(204).end();
			})
			.then(null, function (error) {
				console.log('Error occurred while querying db', error);
				res.status(500).end();
			});
	}
});

var mergeDevicesInfo = function (localDevicesInfo, thermostatsInfo, done) {
	var devices = localDevicesInfo.reduce(function (previous, current) {
		previous[current.deviceId] = current;

		return previous;
	}, {});

	var nestDevices = Object.keys(thermostatsInfo)
		.map(function (thermostatId) {
			var thermostat = thermostatsInfo[thermostatId];
			var device = devices[thermostatId];

			return {
				id: thermostatId,
				name: thermostat.name_long,
				currentTemperatureC: thermostat.ambient_temperature_c,
				currentTemperatureF: thermostat.ambient_temperature_f,
				targetTemperatureC: thermostat.target_temperature_c,
				targetTemperatureF: thermostat.target_temperature_F,
				placement: thermostat.structure.wheres[thermostat.where_id].name,
				schedule: device.schedule,
				isHeating: thermostat.hvac_state === 'heating',
				temperatureScale: thermostat.temperature_scale
			};
		});

	done && done(nestDevices);
};

var server = app.listen(3000, function () {
	var host = server.address().address;
	var port = server.address().port;

	console.log('Listening at http://%s:%s', host, port);
});

module.exports = server;