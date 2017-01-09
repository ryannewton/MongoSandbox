const assert = require('assert');
const User = require('../src/user');

describe('Deleting a user', () => {
	let joe;

	beforeEach((done) => {
		joe = new User({ name: 'Joe' });
		joe.save()
			.then(() => done());
	});

	it('model instance remove', () => {

	});

	it('class metho remove', () => {

	});

	it('class method findAndRemove', () => {

	});

	it('class method findByIdAndRemove', () => {

	});
});
