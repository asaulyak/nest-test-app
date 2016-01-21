(function (window) {

	var app = {
		views: {},
		models: {},
		collections: {},
		routers: {},
		mixins: {}
	};

	app.init = function (opts) {
		this.options = _.extend({}, this.defaults, opts);

		var collection = new app.collections.Menu([
			{
				title: 'My Home',
				href: '#home',
				tab: 'home'
			},
			{
				title: 'Modes',
				href: '#modes',
				tab: 'modes'
			}
		]);

		var applicationView = new app.views.AppView({collection: collection});
		applicationView.render();
	};

	window.Application = app;

})(window);

$(function () {
	window.Application.init();
});