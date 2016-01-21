(function (app) {
	'use strict';

	app.models.Mode = Backbone.Model.extend({
		urlRoot: 'api/modes'
	});
})(window.Application);