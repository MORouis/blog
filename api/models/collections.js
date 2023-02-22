const mongoose = require('mongoose');

// comment schema
const commentSchema = new mongoose.Schema({
    commentText: {
      type: String,
      default: '',
    },
    articleId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Article',
    }
  });

// article schema
const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    totalLikes: { type: Number, default: 0 },
    totalComments: { type: Number, default: 0 },
    totalShares: { type: Number, default: 0 }
});

// Create models and export them
module.exports = {
    Comment: mongoose.model('Comment', commentSchema),
    Article: mongoose.model('Article', articleSchema)
  };  