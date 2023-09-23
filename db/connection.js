const mongoose = require('mongoose');
const db = mongoose.connection;

db.on('error', (err) => {
    console.error('Mongo Connection Error:', err)
})

db.once('open', () => {
    console.log('MongoDB connected successfully!');
})

const connectDB = (url) => {
    return mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,        
    })
}

module.exports = connectDB;