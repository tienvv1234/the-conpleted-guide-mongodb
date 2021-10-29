const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PostSchema = require('./post');

const UserSchema = new Schema({
    name: {
        type: String,
        validate: {
            validator: (name) => name.length > 2,
            message: 'Name must be longer than 2 characters.'
        },
        required: [true, 'Name is required']
    },
    posts: [PostSchema], 
    likes: Number
});

// note that use keyword function here, not using arrow function
// because the arrow function will point to this file, and this file have no variables of this
UserSchema.virtual('postCount').get(function() {
    return this.posts.length;
});

const User = mongoose.model('User', UserSchema);

module.exports = User;