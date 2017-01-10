const assert = require('assert');
const User = require('../src/user');

describe('Validating records', () => {
	it('requires a user\'s name', () => {
		// By default name would be undefined. This is specified for clearity
		const user = new User({ name: undefined });
		// Note: validateSync() is a synchronous version of validate()
		// Since this doesn't access a DB, no need for using asynchronous code
		const validationResult = user.validateSync();
		const { message } = validationResult.errors.name;
		assert(message === 'Name is required.');
	});

	it('requires a user\'s name longer than 2 characters', () => {
		const user = new User({ name: 'Al' });
		const validationResult = user.validateSync();
		const { message } = validationResult.errors.name;
		assert(message === 'Name must be longer than 2 characters.');
	});

	it('disallows invalid records from being saved', (done) => {
		const user = new User({ name: 'Al' });
		user.save()
			.catch((validationResult) => {
				const { message } = validationResult.errors.name;
				assert(message === 'Name must be longer than 2 characters.');
				done();
			});
	});
});
