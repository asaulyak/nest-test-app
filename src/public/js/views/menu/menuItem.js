(function (app) {
	'use strict';

	app.views.MenuItem = Backbone.View.extend({
		tagName: 'a',
		className: 'item',

		initialize: function () {
			this.model.on('change:isSelected', this.onSelectedChanged.bind(this));
		},

		render: function () {
			this.$el.text(this.model.get('title'))
				.attr('href', this.model.get('href'));

			return this;
		},

		onSelectedChanged: function () {
			if (this.model.get('isSelected')) {
				this.$el.addClass('active');
			}
			else {
				this.$el.removeClass('active');
			}
		}
	});
})(window.Application);