const mongoose = require('mongoose');
const PostSchema = require('./post_schema');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	name: {
		type: String,
		validate: {
			validator: (name) => name.length > 2,
			message: 'Name must be longer than 2 characters.'
		},
		required: [ true, 'Name is required.']
	},
	posts: [PostSchema],
	likes: Number,
	blogPosts: [{
		type: Schema.Types.ObjectId,
		ref: 'blogPost'
	}]
});

UserSchema.virtual('postCount').get(function() {
	// Note: using function() instead of () => so that this behaves as we expect
	return this.posts.length;
});

UserSchema.pre('remove', function(next) {
	// Note: using function() instead of () => so that this behaves as we expect

	// Pulls BlogPost off of mongoose.model instead of require() to avoid
	//  a cyclical loading situation, which could happen if we later require() User in BlogPost
	// This avoids the issue since this function will be loaded after the app first loads
	const BlogPost = mongoose.model('blogPost');

	// remove()'s all BlogPost instances that $INclude an _id matching any in this.blogPosts
	BlogPost.remove({ _id: { $in: this.blogPosts }})
		.then(() => next());
});

const User = mongoose.model('user', UserSchema);

module.exports = User;
