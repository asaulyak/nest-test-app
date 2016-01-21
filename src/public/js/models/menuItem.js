(function (app) {
	app.models.MenuItem = Backbone.Model.extend({
		defaults: {
			title: 'Default Title',
			isSelected: false
		}
	});
})(window.Application);