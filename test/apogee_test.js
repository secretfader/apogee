var apogee		= require('../')
, 	request = require('supertest')
, 	expect  = require('chai').expect
, 	express = require('express');

describe('API Versioning', function () {
	beforeEach(function () {
		this.app = express();
		this.app.use(apogee.config({ header: 'x-apogee-version', default: '1' }));
		this.app.use(require('errorhandler')());
	});

	it('should return the apogee header on response', function (done) {
		this.app.route('/widgets').all(apogee.limit('1')).get(function (req, res) {
			res.json({ message: 'Version 1' });
		});

		request(this.app)
			.get('/widgets')
			.expect('x-apogee-version', '1')
			.expect(200)
			.end(function (err, res) {
				if (err) return done(err);
				expect(res.body.message).to.equal('Version 1');
				done();
			});
	});

	it('should respond to a specified version number', function (done) {
		this.app.route('/widgets').all(apogee.limit('2')).get(function (req, res) {
			res.json({ message: 'Version 2' });
		});

		this.app.route('/widgets').all(apogee.limit('1')).get(function (req, res) {
			res.json({ message: 'Version 1' });
		});

		request(this.app)
			.get('/widgets')
			.set('x-apogee-version', '1')
			.expect(200)
			.end(function (err, res) {
				if (err) return done(err);
				expect(res.body.message).to.equal('Version 1');
				done();
			});
	});

	it('should respond with the default if no version is supplied', function (done) {
		this.app.route('/widgets').all(apogee.limit('2')).get(function (req, res) {
			res.json({ message: 'Version 2' });
		});

		this.app.route('/widgets').all(apogee.limit('1')).get(function (req, res) {
			res.json({ message: 'Version 1' });
		});

		request(this.app)
			.get('/widgets')
			.set('x-test', 'yes')
			.expect(200)
			.end(function (err, res) {
				if (err) return done(err);
				expect(res.body.message).to.equal('Version 1');
				done();
			});
	});
});
