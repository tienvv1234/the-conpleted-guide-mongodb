const assert = require('assert');
const User = require('../src/user');

describe('Subdocument', () => {
    it('can create a subdocument', (done) => {
        const joe = new User({
            name: 'Joe',
            posts: [{
                title: 'Post Title',
                content: 'Post Content'
            }]
        });

        joe.save()
            .then(() => User.findOne({ name: 'Joe' }))
            .then((user) => {
                assert(user.posts[0].title === 'Post Title');
                done();
            });
    });

    it('can add subdocuments to an existing record', (done) => {
        const joe = new User({
            name: 'Joe',
            posts: []
        });

        joe.save()
            .then(() => User.findOne({ name: 'Joe' }))
            .then((user) => {
                user.posts.push({
                    title: 'New Post',
                    content: 'New Post Content'
                });
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
            posts: [{
                title: 'New Post',
                content: 'New Post Content'
            }]
        });

        joe.save()
            .then(() => User.findOne({ name: 'Joe' }))
            .then((user) => {
                const post = user.posts[0];
                post.remove(); 
                return user.save();
            })
            .then(() => User.findOne({ name: 'Joe' }))
            .then((user) => {
                assert(user.posts.length === 0);
                done();
            });
    });
});