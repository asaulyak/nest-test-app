var mongoose = require('mongoose');
var modes = require('./models/mode');
var devices = require('./models/device');
var config = require('../config');

mongoose.connect(config.mongo.url);

module.exports = {
	modes: {
		getModes: function () {
			return modes.aggregate()
				.project({
					id: '$_id',
					name: 1,
					schedule: 1,
					_id: 0
				})
				.exec();
		},

		getMode: function (id) {
			return modes.aggregate()
				.match({
					_id: new mongoose.Types.ObjectId(id)
				})
				.limit(1)
				.project({
					id: '$_id',
					name: 1,
					schedule: 1,
					_id: 0
				})
				.exec();
		},

		updateMode: function (id, data) {
			return modes.update({
					_id: new mongoose.Types.ObjectId(id)
				},
				data)
				.exec();
		}
	},

	devices: {
		getDevices: function () {
			return devices.aggregate().project({
					id: '$_id',
					deviceId: 1,
					schedule: 1,
					_id: 0
				})
				.exec();
		},

		getDevice: function (id) {
			return devices.aggregate()
				.match({
					deviceId: id
				})
				.project({
					id: '$_id',
					deviceId: 1,
					schedule: 1,
					_id: 0
				})
				.exec();
		},

		updateDevice: function (id, data) {
			return devices.update({
					deviceId: id
				},
				data)
				.exec();
		}
	}
};