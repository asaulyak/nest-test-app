(function (app) {
	'use strict';

	app.collections.Menu = Backbone.Collection.extend({
		model: app.models.MenuItem,

		initialize: function () {
			Backbone.history.on('all', this.onRouteChanged, this);
		},

		onRouteChanged: function (name, router) {

			// Highlighting selected menu tab
			this.each(function (model) {
				model.set({
					isSelected: model.get('tab') === router.currentTab
				});
			});
		}
	});
})(window.Application);
