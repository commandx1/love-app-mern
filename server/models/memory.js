const mongoose = require('mongoose');

const memorySchema = new mongoose.Schema({
    title: String,
    content: String,
    s3_paths: [String],
    created_date: Date,
    date: Date,
    user: String,
});

const Memory = mongoose.model('memory_1', memorySchema);

module.exports = Memory;
