const assert = require('assert');
const User = require('../src/user');

describe('Reading Users out of database', () => {
    let joe, maria, alex, zach;

    beforeEach((done) => {
        joe = new User({ name: 'Joe'});
        maria = new User({ name: 'Maria'});
        alex = new User({ name: 'Alex'});
        zach = new User({ name: 'Zach'});

        Promise.all([joe.save(), maria.save(), alex.save(), zach.save()])
            .then(() => done());
        // joe.save().then(() => done());
    });

    it('finds all users with a name of joe', (done) => {
        User.find({ name: 'Joe'})
            .then((users) => {
                assert(users[0]._id.toString() === joe._id.toString());
                done();
            });
    });

    it('find a user with a particular id', (done) => {
        User.findOne({ _id: joe._id})
            .then((user) => {
                assert(user.name === 'Joe');
                done();
            });
    });

   it('can skip and limit the result set', (done) => {
       //sort with -1 means descending order, 1 means ascending order
       User.find({})
           .sort({ name: 1 })
           .skip(1)
           .limit(2)
           .then((users) => {
               assert(users.length === 2);
               assert(users[0].name === 'Joe');
               assert(users[1].name === 'Jill');
               done();
           });
   });  
});