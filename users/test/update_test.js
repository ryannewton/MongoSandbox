const assert = require('assert');
const User = require('../src/user');

describe('Updating records', () => {
	let joe;

	beforeEach((done) => {
		joe = new User({ name: 'Joe' });
		joe.save()
			.then(() => done());
	});

	it('instance type using set() & save()', (done) => {
		// Set a new value for name, then save it
		joe.set('name', 'Alex');
		joe.save()
			.then(() => User.find({}))
			.then((users) => {
				assert(users.length === 1);
				assert(users[0].name === 'Alex');
				done();
			});
	});
});
