(function (app) {
	'use strict';

	app.views.AppView = Backbone.View.extend({
		el: 'body',

		render: function () {
			new app.views.Menu({
				collection: this.collection
			});
		}
	});
})(window.Application);