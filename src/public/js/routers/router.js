(function (app) {
	'use strict';

	var NestRouter = Backbone.Router.extend({
		routes: {
			'': 'devices',
			'home': 'devices',
			'modes': 'modes',
			'modes/:id': 'mode'
		},

		_pageView: null,
		currentTab: 'home',

		devices: function () {
			var collection = new app.collections.Devices();
			var modes = new app.collections.Modes();
			var self = this;

			this.disposeView();
			this._pageView = new app.views.Loader();

			this.currentTab = 'home';

			collection.fetch()
				.then(function () {
					return modes.fetch();
				})
				.then(function () {

						// Check if we are still at home tab
						if (self.currentTab === 'home') {
							self.disposeView();
							self._pageView = new app.views.Devices({
								collection: collection,
								modes: modes
							});
						}
					}
				);
		},

		modes: function () {
			var collection = new app.collections.Modes();
			var self = this;

			this.currentTab = 'modes';

			collection.fetch()
				.then(function () {
						self.disposeView();
						self._pageView = new app.views.Modes({
							collection: collection
						});
					}
				);
		},

		mode: function (id) {
			var mode = new app.models.Mode({
				id: id
			});
			var self = this;

			this.currentTab = 'modes';

			mode.fetch()
				.then(function () {
						self.disposeView();
						self._pageView = new app.views.Mode({
							model: mode
						});
					}
				);
		},

		disposeView: function () {
			this._pageView && this._pageView.dispose();
		}
	});

	app.routers.NestRouter = new NestRouter();
	Backbone.history.start();
})(window.Application);