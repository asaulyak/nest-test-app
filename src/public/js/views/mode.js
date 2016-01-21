(function (app) {
	'use strict';

	app.views.Mode = Backbone.View.extend({
		template: _.template($('#template-mode').html()),

		el: 'main#main',

		events: {
			'change .temperature': 'onTemperatureChanged'
		},

		onTemperatureChanged: function (event) {
			var schedule = this.model.get('schedule')
				.map(function (item) {
					if (item.name.toLowerCase() === $(event.target).data('period')) {
						item.temperature = event.target.value;
					}

					return item;
				});

			this.updateSchedule(schedule);
		},

		updateSchedule: function (schedule) {
			this.model.set('schedule', schedule);

			this.model.save({schedule: schedule}, {patch: true});
		},

		initialize: function () {
			this.render();

			$('.temperature.range').ionRangeSlider({
				min: 9,
				max: 32,
				onFinish: function (data) {
					$(data.input).val(data.from);
				}
			});

			$('.menu .item').tab();
		},

		render: function () {
			this.$el.html(this.template(
				this.model.toJSON()
			));
		}
	});

	_.extend(app.views.Mode.prototype, app.mixins.ViewMixin);
})(window.Application);