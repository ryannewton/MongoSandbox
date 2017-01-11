const assert = require('assert');
const mongoose = require('mongoose');
const User = require('../src/user');
const Comment = require('../src/comment');
const BlogPost = require('../src/blogPost');

describe('Associations', () => {
	let joe, blogPost, comment;

	beforeEach((done) => {
		joe = new User({ name: 'Joe' });
		blogPost = new BlogPost({ title: 'Blog Title', content: "Blog Content"});
		comment = new Comment({ content: 'Great post!' });

		joe.blogPosts.push(blogPost);
		blogPost.comments.push(comment);
		comment.user = joe;

		Promise.all([ joe.save(), blogPost.save(), comment.save() ])
			.then(() => done());
	});

	it('saves a relation between a user and a blogpost', (done) => {
		User.findOne({ name:'Joe' })
			.populate('blogPosts')
			.then((user) => {
				assert(user.blogPosts[0].title === 'Blog Title');
				done();
			});
	});

	it('saves a full relation graph', (done) => {
		User.findOne({ name: 'Joe' })
			.populate({
				path: 'blogPosts',
				populate: {
					path: 'comments',
					populate: {
						path: 'user',
						model: 'user'
					}
				}
			})
			.then((user) => {
				assert(user.name === 'Joe');
				assert(user.blogPosts[0].title === 'Blog Title');
				assert(user.blogPosts[0].comments[0].content === 'Great post!');
				assert(user.blogPosts[0].comments[0].user.name === 'Joe');

				done();
			});
	});
});
