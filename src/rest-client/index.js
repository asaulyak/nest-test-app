var unirest = require('unirest');
var config = require('../config');

var Client = (function () {
	var onResponse = function (data, response) {
		var error = response.ok ? null : response.error;
		data.done && data.done(error, response.body);
	};

	var methods = {
		get: function (data) {
			return unirest('GET',
				config.nest.restUrl + data.url,
				{
					Authorization: 'Bearer ' + config.nest.accessToken
				},
				onResponse.bind(null, data)
			)
		},

		patch: function (data) {
			return unirest('PATCH',
				config.nest.restUrl + data.url,
				{
					Authorization: 'Bearer ' + config.nest.accessToken,
					'Content-Type': 'application/json'
				},
				data.device,
				onResponse.bind(null, data)
			)
		}
	};

	var setDeviceStructures = function (devices, done) {
		methods.get({
			url: 'structures/',
			done: function (error, data) {
				var devicesIds = Object.keys(devices);

				for (var i = 0; i < devicesIds.length; i++) {
					var device = devices[devicesIds[i]];

					device.structure = data[device.structure_id];
				}

				done && done(error, devices);
			}
		});
	};

	return function () {
		return {
			devices: {
				getDevices: function (done) {
					methods.get({
						url: 'devices/thermostats/',
						done: function (error, data) {
							setDeviceStructures(data, done);
						}
					});
				},

				updateDevice: function (data, done) {
					methods.patch({
						url: 'devices/thermostats/' + data.id,
						done: done,
						device: data.device
					});
				}
			}
		};
	}
})();

module.exports = new Client();