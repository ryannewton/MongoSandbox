const assert = require('assert');
const User = require('../src/user');

describe('Subdocuments', () => {
	it('can create a subdocument', (done) => {
		const joe = new User({
			name: 'Joe',
			posts: [{ title: 'PostTitle' }]
		});

		joe.save()
			.then(() => User.findOne({ name: 'Joe' }))
			.then((user) => {
				assert(user.posts[0].title === 'PostTitle');
				done();
			});
	});

	it('can add subdocuments to an existing record', (done) => {
		const joe = new User({
			name: 'Joe',
			// Don't have to initialize an empty array, this is just to be clear to anyone looking at this test
			posts: []
		});

		joe.save()
			.then(() => User.findOne({ name: 'Joe' }))
			.then((user) => {
				user.posts.push({ title: 'New Post' });
				return user.save();
			})
			.then(() => User.findOne({ name: 'Joe' }))
			.then((user) => {
				assert(user.posts[0].title === 'New Post');
				done();
			});
	});

	it('can remove an existing subdocument', (done) => {
		const joe = new User({
			name: 'Joe',
			posts: [{title: 'New Title'}]
		});

		joe.save()
			.then(() => User.findOne({name: 'Joe'}))
			.then((user) => {
				// Note: Mongoose's remove() allows removing elements from an array
				user.posts[0].remove();
				// However, using remove() on a subdocument does not automatically save to the database
				return user.save();
			})
			.then(() => User.findOne({name: 'Joe'}))
			.then((user) => {
				assert(user.posts.length === 0);
				done();
			});
	});
});
