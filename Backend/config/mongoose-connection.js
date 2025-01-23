const mongoose = require('mongoose');
const config = require('config');
const dbgr = require('debug')('development:mongoose');

mongoose.connect(`${config.get('MONGODB_URL')}/fullii`)
    .then(() => {
        dbgr('Connected to MongoDB');
    })
    .catch((err) => {
        dbgr('Error connecting to MongoDB:', err.message);
        process.exit(1);
    });

module.exports = mongoose.connection;
