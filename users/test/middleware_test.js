const mongoose = require('mongoose');
const assert = require('assert');
const User = require('../src/user');
const BlogPost = require('../src/user');

describe('Middleware', () => {
	let joe, blogPost;

	beforeEach((done) => {
		joe = new User({ name: 'Joe' });
		blogPost = new BlogPost({ title: 'Blog Title', content: "Blog Content"});

		joe.blogPosts.push(blogPost);

		Promise.all([ joe.save(), blogPost.save() ])
			.then(() => done());
	});

});
