var request = require('supertest');
var expect = require('chai').expect;
var proxyquire = require('proxyquire');
var restClientStub = require('./stubs/rest-client');
var dbStub = require('./stubs/db');
var schedulerStub = require('./stubs/scheduler');

var server = proxyquire('../server', {
	'./rest-client': restClientStub,
	'./storage/db': dbStub,
	'./scheduler': schedulerStub
});

describe('Web client unit test', function () {
	it('should return home page', function (done) {
		request(server)
			.get('/')
			.end(function (error, res) {
				expect(res.status).to.equal(200);
				expect(res.error).to.be.false;
				done();
			});
	});

	it('should return return 404 error', function (done) {
		request(server)
			.get('/error')
			.end(function (error, res) {
				expect(res.status).to.equal(404);
				expect(res.error).to.be.not.null;
				done();
			});
	});

});

describe('API unit test', function () {
	it('should return a list of devices', function (done) {
		request(server)
			.get('/api/devices')
			.end(function (error, res) {
				var devices = res.body;
				var singleDevice = devices[0];

				expect(res.status).to.equal(200);
				expect(devices.length).to.be.equal(1);
				expect(singleDevice.id).to.be.equal('UhtGcxdV2a4g_AzCOuExR0r4wBujUtaF');
				expect(singleDevice.placement).to.be.equal('Basement');
				expect(singleDevice.schedule.length).to.be.equal(7);

				done();
			});
	});

	it('should update the device', function (done) {
		request(server)
			.patch('/api/devices/UhtGcxdV2a4g_AzCOuExR0r4wBujUtaF')
			.end(function (error, res) {
				expect(res.status).to.equal(204);
				expect(res.error).to.be.false;

				done();
			});
	});

	it('should return a list of heating modes', function (done) {
		request(server)
			.get('/api/modes')
			.end(function (error, res) {
				expect(res.status).to.equal(200);
				expect(res.error).to.be.false;
				expect(res.body.length).to.equal(3);
				done();
			});
	});

	it('should return one heating mode', function (done) {
		request(server)
			.get('/api/modes/569d1b4480a525422502ddbb')
			.end(function (error, res) {
				var mode = res.body;
				expect(res.status).to.equal(200);
				expect(res.error).to.be.false;

				expect(mode).to.be.not.empty;
				expect(mode.id).to.equal('569d1b4480a525422502ddbb');
				expect(mode.schedule.length).to.equal(4);

				done();
			});
	});

	it('should return 404 error while trying to get non existing  mode', function (done) {
		request(server)
			.get('/api/modes/non_existing_mode')
			.end(function (error, res) {
				var mode = res.body;
				expect(res.status).to.equal(404);
				expect(res.error).to.be.not.empty;

				expect(mode).to.be.empty;

				done();
			});
	});

	it('should update heating mode', function (done) {
		request(server)
			.patch('/api/modes/569d1b4480a525422502ddbb')
			.send({
				name: 'New name'
			})
			.end(function (error, res) {
				expect(res.status).to.equal(204);
				expect(res.error).to.be.false;

				done();
			});
	});

	it('should get Bad Request error trying to send update request with empty body', function (done) {
		request(server)
			.patch('/api/modes/569d1b4480a525422502ddbb')
			.end(function (error, res) {
				expect(res.status).to.equal(400);
				expect(res.error).to.be.not.empty;

				done();
			});
	});
});