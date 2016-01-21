var DbStub = (function () {
	'use strict';

	var device = {
		'deviceId': 'UhtGcxdV2a4g_AzCOuExR0r4wBujUtaF',
		'schedule': [
			{
				'name': 'Monday',
				'modeId': '569d1b365e7ef9f8b387cbef'
			},
			{
				'name': 'Tuesday',
				'modeId': '569d1b0387b29355db159bea'
			},
			{
				'name': 'Wednesday',
				'modeId': '569d1b0387b29355db159bea'
			},
			{
				'name': 'Thursday',
				'modeId': '569d1b4480a525422502ddbb'
			},
			{
				'name': 'Friday',
				'modeId': '569d1b0387b29355db159bea'
			},
			{
				'name': 'Saturday',
				'modeId': '569d1b365e7ef9f8b387cbef'
			},
			{
				'name': 'Sunday',
				'modeId': '569d1b365e7ef9f8b387cbef'
			}
		]
	};

	var modes = [{
		'id': '569d1b0387b29355db159bea',
		'name': 'Working Day',
		'schedule': [
			{
				'name': 'Morning',
				'timeFrom': '06:30',
				'timeTo': '09:30',
				'temperature': '19'
			},
			{
				'name': 'Day',
				'timeFrom': '09:30',
				'timeTo': '19:00',
				'temperature': 20
			},
			{
				'name': 'Evening',
				'timeFrom': '19:00',
				'timeTo': '22:00',
				'temperature': 23
			},
			{
				'name': 'Night',
				'timeFrom': '22:00',
				'timeTo': '06:30',
				'temperature': 21
			}
		]
	},
		{
			'id': '569d1b365e7ef9f8b387cbef',
			'name': 'Week End',
			'schedule': [
				{
					'name': 'Morning',
					'timeFrom': '06:30',
					'timeTo': '02:05',
					'temperature': '32'
				},
				{
					'name': 'Day',
					'timeFrom': '09:30',
					'timeTo': '19:05',
					'temperature': 20
				},
				{
					'name': 'Evening',
					'timeFrom': '19:00',
					'timeTo': '22:00',
					'temperature': '16'
				},
				{
					'name': 'Night',
					'timeFrom': '22:00',
					'timeTo': '06:30',
					'temperature': 21
				}
			]
		},
		{
			'id': '569d1b4480a525422502ddbb',
			'name': 'Eco',
			'schedule': [
				{
					'name': 'Morning',
					'timeFrom': '06:30',
					'timeTo': '09:30',
					'temperature': 23
				},
				{
					'name': 'Day',
					'timeFrom': '09:30',
					'timeTo': '19:00',
					'temperature': 20
				},
				{
					'name': 'Evening',
					'timeFrom': '19:00',
					'timeTo': '22:00',
					'temperature': 23
				},
				{
					'name': 'Night',
					'timeFrom': '22:00',
					'timeTo': '06:30',
					'temperature': 21
				}
			]
		}];

	return function () {
		return {
			modes: {
				getModes: function () {
					return {
						then: function (callback) {
							callback(modes);

							return {
								then: function () {

								}
							};
						}
					};
				},

				getMode: function (id) {
					return {
						then: function (callback) {
							var mode = null;

							for (var i = 0; i < modes.length; i++) {
								if(modes[i].id === id) {
									mode = modes[i];
									break;
								}
							}

							callback(mode ? [mode] : []);

							return {
								then: function () {

								}
							};
						}
					};
				},

				updateMode: function () {
					return {
						then: function (callback) {
							callback();

							return {
								then: function () {

								}
							};
						}
					};
				}
			},

			devices: {
				getDevices: function () {
					return {
						then: function (callback) {
							callback([device]
							);

							return {
								then: function () {

								}
							};
						}
					}
				},

				getDevice: function (id) {
				},

				updateDevice: function (id, data) {
					return {
						then: function (callback) {
							callback();

							return {
								then: function () {

								}
							};
						}
					}
				}
			}
		};
	};

})();

module.exports = new DbStub();