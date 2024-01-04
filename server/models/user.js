const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    full_name: String,
    password: String,
    username: String,
    image_path: String,
});

const User = mongoose.model('user_1', userSchema);

module.exports = User;
