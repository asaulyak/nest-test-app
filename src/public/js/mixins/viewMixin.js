(function (app) {
	'use strict';

	app.mixins.ViewMixin = {
		dispose: function () {
			this.off();

			this.undelegateEvents();

			this.model && this.model.off(null, null, this);
		}
	}
})(window.Application);