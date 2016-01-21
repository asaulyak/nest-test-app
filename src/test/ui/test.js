$(document).ready(function () {
	mocha.setup('bdd');
	var expect = chai.expect;

	describe('Devices collection', function () {
		beforeEach(function () {
			this.collection = new Application.collections.Devices([
				{
					id: 1
				},
				{
					id: 2
				}
			]);
		});

		it('should find particular device in the collection', function (done) {
			var device = this.collection.getDevice(2);

			expect(device.id).to.equal(2);

			done();
		});

		it('should have proper url', function (done) {
			expect(this.collection.url).to.equal('/api/devices');

			done();
		});
	});

	describe('Modes collection', function () {
		beforeEach(function () {
			this.collection = new Application.collections.Modes();
		});

		it('should have proper url', function (done) {
			expect(this.collection.url).to.equal('/api/modes');

			done();
		});
	});

	describe('Menu collection', function () {
		var spyOnRouteChanged = sinon.spy(Application.collections.Menu.prototype,
			'onRouteChanged');

		beforeEach(function () {
			this.collection = this.collection || new Application.collections.Menu([
				{
					title: 'My Home',
					href: '#home'
				},
				{
					title: 'Modes',
					href: '#modes'
				}
			]);
		});

		it('should call onRouteChanged event handler when menu item gets selected', function (done) {
			before(function () {
				Application.routers.NestRouter.navigate('');
			});

			after(function () {
				Application.routers.NestRouter.navigate('');
			});

			Application.routers.NestRouter.navigate('home', {trigger: true});
			expect(spyOnRouteChanged.called).to.be.true;

			done();
		});

		it('should change isSelected property of selected menu item', function (done) {
			before(function () {
				Application.routers.NestRouter.navigate('');
			});

			after(function () {
				Application.routers.NestRouter.navigate('');
			});

			var homeMenuItem = null;

			for (var i = 0; i < this.collection.models.length; i++) {
				var menuItem = this.collection.models[i];

				if(menuItem.get('href') === '#home') {
					homeMenuItem = menuItem;

					break;
				}
			}

			Application.routers.NestRouter.navigate('home', {trigger: true});

			expect(homeMenuItem.get('isSelected')).to.be.true;

			done();
		});
	});

	mocha.run();
});