const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BlogPostSchema = new Schema({
    title: String,
	content: String
});

// const Post = mongoose.model('Post', PostSchema);

module.exports = BlogPostSchema;