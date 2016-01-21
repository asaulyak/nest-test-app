(function (app) {
	'use strict';

	app.collections.Devices = Backbone.Collection.extend({
		model: app.models.Device,

		url: '/api/devices',

		getDevice: function (id) {
			return this.find(function (device) {
				return device.get('id') === id;
			});
		}
	});
})(window.Application);