const mongoose = require('mongoose');

// Replace mongoose's promise library with the ES6 Promise
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/users_test');
mongoose.connection
	.once('open', () => {})
	.on('error', (error) => {
		console.warn('Warning', error);
	});

beforeEach((done) => {
	mongoose.connection.collections.users.drop(() => {
		//Ready to run the next test
		done();
	});
});
