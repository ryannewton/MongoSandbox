const assert = require('assert');
const User = require('../src/user');

describe('Reading users out of the database', () => {

	beforeEach((done) => {
		joe = new User({ name: 'Joe' });
		joe.save()
			.then(() => done());
	});

	it('finds all users with a name of joe', (done) => {
		User.find({ name: 'Joe' })
			.then((users) => {
				// Gotcha note: _id is saves as an ObjectId object. To compare, use the .toString() function
				assert(users[0]._id.toString() === joe._id.toString());
				done();
			})
	});
});
