const mongoose = require('mongoose');

const poemSchema = new mongoose.Schema({
    title: String,
    content: String,
    created_date: Date,
    user: String,
});

const Poem = mongoose.model('poem_1', poemSchema);

module.exports = Poem;
