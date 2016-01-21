(function (app) {
	'use strict';

	app.views.Devices = Backbone.View.extend({
		template: _.template($('#template-devices').html()),

		events: {
			'change input[type=radio].mode': 'onModeChanged'
		},

		el: 'main#main',

		initialize: function (options) {
			this.modes = options.modes;
			this.render();
			$('.menu .item').tab();
		},

		render: function () {
			this.$el.html(this.template({
				devices: this.collection.toJSON(),
				modes: this.modes.toJSON()
			}));
		},

		onModeChanged: function (event) {
			var target = $(event.target);

			var device = this.collection.getDevice(target.data('device'));
			var dayName = target.data('day');
			var modeId = target.data('mode');

			var schedule = device.get('schedule').map(function (item) {
				if(item.name === dayName) {
					item.modeId = modeId;
				}

				return item;
			});

			device.set('schedule', schedule);
			device.save({schedule: schedule}, {patch: true});
		}
	});

	_.extend(app.views.Devices.prototype, app.mixins.ViewMixin);
})(window.Application);