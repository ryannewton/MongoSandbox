const assert = require('assert');
const User = require('../src/user');

describe('Updating records', () => {
	let joe;

	beforeEach((done) => {
		joe = new User({ name: 'Joe' });
		joe.save()
			.then(() => done());
	});

	function assertName(operation, done) {
		operation
			.then(() => User.find({}))
			.then((users) => {
				assert(users.length === 1);
				assert(users[0].name === 'Alex');
				done();
			});
	}

	it('instance type using set() & save()', (done) => {
		// Set a new value for name, then save it
		joe.set('name', 'Alex');
		assertName(joe.save(), done);
	});

	it('A model instance can update', (done) => {
		// Update a value directly
		assertName(joe.update({ name: 'Alex' }), done);
	});

	it('A model class can update', (done) => {
		// Update using the class function update()
		assertName(
			User.update({ name: 'Joe' }, { name: 'Alex' }),
			done
		);
	});

	it('A model class can update one record', (done) => {
		// Update using the class function findOneAndUpdate()
		assertName(
			User.findOneAndUpdate({ name: 'Joe' }, { name: 'Alex' }),
			done
		);
	});
});
