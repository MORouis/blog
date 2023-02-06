const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    strippedContent: {
        type: String,
        required: true,
    },
    totalLikes: { type: Number, default: 0 },
    totalComments: { type: Number, default: 0 },
});

module.exports = mongoose.model('Article', articleSchema);