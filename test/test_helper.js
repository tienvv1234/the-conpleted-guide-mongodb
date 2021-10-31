const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

before((done) => {
    mongoose.connect('mongodb://127.0.0.1:27017/users_test');
    mongoose.connection.once('open', () => done()).on('error', (error) => console.warn('Warning', error))
})


beforeEach((done) => {
	// console.log(mongoose.connection.collection.users)
    // mongoose.connection.collection.users.drop(() => {
    //     done();
    // });

	mongoose.connection.db.dropCollection('users', (err, result) => {
		done();
	})
})