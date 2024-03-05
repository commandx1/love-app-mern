const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
    names: [String],
});

const Place = mongoose.model('place_1', placeSchema);

module.exports = Place;
