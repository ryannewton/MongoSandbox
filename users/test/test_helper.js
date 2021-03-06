const mongoose = require('mongoose');

// Replace mongoose's promise library with the ES6 Promise
mongoose.Promise = global.Promise;

before((done) => {
	mongoose.connect('mongodb://localhost/users_test');
	mongoose.connection
		// Waits until connection is made to run tests
		.once('open', () => { done(); })
		.on('error', (error) => {
			console.warn('Warning', error);
		});
});

beforeEach((done) => {
	const { users, comments, blogposts } = mongoose.connection.collections;

	users.drop(() => {
		comments.drop(() => {
			blogposts.drop(() => {
				//Ready to run the next test
				done();
			});
		});
	});
});
