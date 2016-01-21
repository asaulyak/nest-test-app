(function (app) {
	'use strict';

	app.models.Device = Backbone.Model.extend({
		defaults: {
			isHeating: true
		},

		urlRoot: '/api/devices'
	});
})(window.Application);