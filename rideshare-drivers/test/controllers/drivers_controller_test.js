const assert = require('assert');
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../app');

const Driver = mongoose.model('driver');

describe('The drivers controller', () => {
	it('Post to /api/drivers creates a new driver', (done) => {
		Driver.count().then((count) => {
			request(app)
				.post('/api/drivers')
				.send({ email: 'test@test.com' })
				.end(() => {
					Driver.count().then((newCount) => {
						assert(count + 1 === newCount);
						done();
					});
				});
		});
	});

	it('Put to /api/drivers edits an existing driver', (done) => {
		const driver = new Driver({ email: 't@t.com', driving: false });

		driver.save().then(() => {
			request(app)
				.put(`/api/drivers/${driver._id}`)
				.send({ driving: true })
				.end(() => {
					Driver.findOne({ email: 't@t.com' })
						.then((driver) => {
							assert(driver.driving === true);
							done();
						})
				});
		});
	});

	it('Delete to /api/drivers/:id deletes an existing driver', (done) => {
		const driver = new Driver({ email: 'd@d.com', driving: false });

		driver.save().then(() => {
			request(app)
				.delete(`/api/drivers/${driver._id}`)
				.send()
				.end(() => {
					Driver.findOne({ email: 'd@d.com' })
						.then((driver) => {
							assert(driver === null);
							done();
						});
				});
		});
	});

	it('GET to /api/drivers finds drivers in a location', (done) => {
		const seattleDriver = new Driver({
			email: 'seattle@test.com',
			geometry: { type: 'Point', coordinates: [-122.475989, 47.6147628] }
		});
		const austinDriver = new Driver({
			email: 'austin@test.com',
			geometry: { type: 'Point', coordinates: [ -98.0335961, 30.3074624] }
		});

		Promise.all([ seattleDriver.save(), austinDriver.save() ])
			.then(() => {
				request(app)
					.get('/api/drivers?lng=-122.5&lat=47.6')
					.end((err, response) => {
						assert(response.body.length === 1);
						console.log(response.body[0].obj._id);
						assert(response.body[0].obj._id == seattleDriver._id);
						done();
					})
			});
	});
});
