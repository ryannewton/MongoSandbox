const assert = require('assert');
const User = require('../src/user');

describe('Creating records', () => {
	it('saves a user', (done) => {
			const joe = new User({ name: 'Joe' });

			// save() call returns a promise
			joe.save()
				.then(() => {
					// Has joe been saves successfully?
					assert(!joe.isNew);
					done();
			});
	});
});
