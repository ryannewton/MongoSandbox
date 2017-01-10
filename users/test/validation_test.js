const assert = require('assert');
const User = require('../src/user');

describe('Validating records', () => {
	it('requires a user name', () => {
		const user = new User({ name: undefined });
		// Note: validateSync() is a synchronous version of validate()
		// Since this doesn't access a DB, no need for using asynchronous code
		const validationResult = user.validateSync();
		const { message } = validationResult.errors.name;
		assert(message === 'Name is required.');
	});
});
