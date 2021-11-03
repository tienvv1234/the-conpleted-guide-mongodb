const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

before((done) => {
    mongoose.connect('mongodb://127.0.0.1:27017/users_test');
    mongoose.connection.once('open', () => done()).on('error', (error) => console.warn('Warning', error))
})


beforeEach(async (done) => {
	// console.log(mongoose.connection.collection.users)
    // mongoose.connection.collection.users.drop(() => {
    //     done();
    // });

    const collections = await mongoose.connection.db.collections()
      
    for (let collection of collections) {
      await collection.drop();
    }
    done();
	// mongoose.connection.db.dropCollection('users', (err, result) => {
	// 	done(); 
	// });

    // mongoose.connection.db.dropCollection('users')
})