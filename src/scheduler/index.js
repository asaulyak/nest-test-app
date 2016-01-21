var cron = require('node-schedule');
var db = require('../storage/db');
var restClient = require('../rest-client');

function Schedule() {

}

Schedule.prototype = {
	_days: {
		sunday: 0,
		monday: 1,
		tuesday: 2,
		wednesday: 3,
		thursday: 4,
		friday: 5,
		saturday: 6
	},

	_modes: {},

	_jobs: {},

	formatCronString: function (day, time) {
		var cronPattern = '{minute} {hour} * * {weekDay}';

		return cronPattern.replace('{weekDay}', day)
			.replace('{hour}', time.hours.replace(/^0/g, ''))
			.replace('{minute}', time.minutes.replace(/^0/g, ''));
	},

	getModeSchedule: function (mode) {
		return mode.schedule.map(function (period) {
			var periodTime = period.timeFrom.split(':');

			return {
				hours: periodTime[0],
				minutes: periodTime[1],
				temperature: period.temperature
			};
		});
	},

	getDeviceSchedule: function (device) {
		var self = this;

		return device.schedule.reduce(function (previous, current) {
			var day = self._days[current.name.toLowerCase()];
			var mode = self._modes[current.modeId];

			Array.prototype.push.apply(previous, mode.map(function (item) {
				return {
					time: self.formatCronString(day, item),
					temperature: item.temperature,
					device: device.id
				};
			}));

			return previous;
		}, []);
	},

	getDeviceJobs: function (schedule) {
		return schedule.map(function (item) {

			return cron.scheduleJob(item.time, function () {
				restClient.devices.updateDevice({
					id: item.device,
					device: {
						target_temperature_c: item.temperature
					}
				});

				console.log('Set temperature', item.temperature);
			});
		});
	},

	retrieveModes: function (done) {
		var self = this;

		db.modes.getModes()
			.then(function (modes) {
				for (var i = 0; i < modes.length; i++) {
					var mode = modes[i];

					self._modes[mode.id] = self.getModeSchedule(mode);
				}

				done && done();
			});
	},

	retrieveDevices: function () {
		var self = this;

		db.devices.getDevices()
			.then(function (devices) {
				for (var i = 0; i < devices.length; i++) {
					var device = devices[i];

					self._jobs[device.id] =
						self.getDeviceJobs(self.getDeviceSchedule(device));
				}
			});
	},

	cancelJobs: function (deviceId) {
		for (var i = 0; i < this._jobs[deviceId].length; i++) {
			var job = this._jobs[deviceId][i];

			job.cancel();
		}
	},

	run: function () {
		this.retrieveModes(this.retrieveDevices.bind(this));
	},

	rescheduleDevice: function (deviceId) {
		var self = this;

		db.devices.getDevice(deviceId)
			.then(function (devices) {
				var device = devices[0];

				self.cancelJobs(deviceId);
				self._jobs[device.id] = self.getDeviceJobs(self.getDeviceSchedule(device));
			});
	}
};

module.exports = new Schedule();
