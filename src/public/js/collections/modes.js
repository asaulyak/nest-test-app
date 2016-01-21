(function (app) {
	'use strict';

	app.collections.Modes = Backbone.Collection.extend({
		model: app.models.Mode,

		url: '/api/modes'
	});
})(window.Application);