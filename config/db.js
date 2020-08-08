const mongoose = require('mongoose');

const MONGO_URI = 'YOUR MONGO ATLAS URI here'

const connectDB = async() => {
    try {
        const conn = await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log(`MongoDB connected on ${conn.connection.host}`);
    } catch (err) {
        console.log(err.message);
        process.exit(1);
    }
}

module.exports = connectDB;
