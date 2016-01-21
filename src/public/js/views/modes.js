(function (app) {
	'use strict';

	app.views.Modes = Backbone.View.extend({
		template: _.template($('#template-modes').html()),
		el: 'main#main',

		initialize: function () {
			this.render();
		},

		render: function () {
			this.$el.html(this.template(
				{
					modes: this.collection.toJSON()
				}
			));
		}
	});

	_.extend(app.views.Modes.prototype, app.mixins.ViewMixin);
})(window.Application);