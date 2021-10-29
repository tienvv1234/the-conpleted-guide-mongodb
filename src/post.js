const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    title: {
        type: String,
        required: true
    },
});

// const Post = mongoose.model('Post', PostSchema);

module.exports = PostSchema;