(function (app) {
	'use strict';

	app.views.Loader = Backbone.View.extend({
		template: _.template($('#template-loader').html()),

		el: 'main#main',

		initialize: function () {
			this.render();
		},

		render: function () {
			this.$el.html(this.template());
		}
	});

	_.extend(app.views.Loader.prototype, app.mixins.ViewMixin);
})(window.Application);