require('dotenv').config();
const mongoose = require('mongoose');
const dbgr = require('debug')('development:mongoose');

const dbURI = process.env.MONGODB_URL;

mongoose.connect(`${dbURI}/fullii`)
    .then(() => {
        dbgr('✅ Connected to MongoDB');
    })
    .catch((err) => {
        dbgr('❌ Error connecting to MongoDB:', err.message);
        process.exit(1);
    });

module.exports = mongoose.connection;
