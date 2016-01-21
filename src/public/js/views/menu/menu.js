(function (app) {
	'use strict';

	app.views.Menu = Backbone.View.extend({
		template: _.template($('#template-menu').html()),
		el: 'header#header',

		initialize: function () {
			this.render();
		},

		render: function () {
			this.$el.html(this.template({}));

			this.collection.each(function (model) {
				var item = new app.views.MenuItem({model: model});
				this.$el.find('.menu > .container.navigation')
					.append(item.render().el);
			}.bind(this));

			return this;
		}
	});
})(window.Application);