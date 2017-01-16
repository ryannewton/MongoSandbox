const Driver = require('../models/driver');

module.exports = {
	greeting(req, res) {
		res.send({ hi: 'there' })
	},

	index(req, res, next) {
		// mywebsite.com/api/drivers?lng=120&lat=42
		//  => query holds values after ?
		const { lng, lat } = req.query;

		Driver.geoNear(
			{ type: 'Point', coordinates: [parseFloat(lng), parseFloat(lat)] },
			// Note: maxDistance uses meters
			{ spherical: true, maxDistance: 200000 }
		)
			.then((drivers) => res.send(drivers))
			.catch(next);
	},

	create(req, res, next) {
		const driverProps = req.body;

		Driver.create(driverProps)
			.then((driver) => res.send(driver))
			.catch(next);
	},

	edit(req, res, next) {
		const driverId = req.params.id;
		const driverProps = req.body;

		Driver.findByIdAndUpdate({ _id: driverId }, driverProps)
			.then(() => Driver.findById({ _id: driverId }))
			.then((driver) => res.send(driver))
			.catch(next);
	},

	delete(req, res, next) {
		const driverId = req.params.id;

		Driver.findByIdAndRemove({ _id: driverId })
			// 204 = record successfully deleted
			.then((driver) => res.status(204).send(driver))
			.catch(next);
	}
};
