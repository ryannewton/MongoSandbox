const mongoose = require('mongoose');

before((done) => {
	// mongoose.connect() placed in test helper so that it has access
	//  to the done() function, which is not accessible in app.js

	mongoose.connect('mongodb://localhost/rideshare-drivers-test');
	mongoose.connection
		.once('open', () => done())
		.on('error', (error) => {
			console.warn('warning', error);
		});
});

beforeEach((done) => {
	const { drivers } = mongoose.connection.collections;
	drivers.drop()
		.then(() => done())
		// First time the DB runs there will be no drivers collection, returning an
		//  error when we call drop(). Need to still tell the test suite to continue
		.catch(() => done());
});
