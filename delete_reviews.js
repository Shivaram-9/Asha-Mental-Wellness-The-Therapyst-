const mongoose = require('mongoose');
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI)
    .then(async () => {
        const result = await mongoose.connection.db.collection('reviews').deleteMany({});
        console.log(`Deleted ${result.deletedCount} reviews.`);
        process.exit(0);
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });
