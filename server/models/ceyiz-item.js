const mongoose = require('mongoose');

const ceyizItemSchema = new mongoose.Schema({
    title: String,
    description: String,
    more_description: String,
    category_id: String,
    s3_paths: [String],
    is_favourite: Boolean,
    created_date: Date,
    color: String,
});

const CeyizItem = mongoose.model('ceyiz_item_1', ceyizItemSchema);

module.exports = CeyizItem;
