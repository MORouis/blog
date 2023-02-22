const express = require('express');
const mongoose = require('mongoose')
const dev = process.env.NODE_ENV !== 'production';
var cors = require('cors')
const { ObjectId } = require('mongodb');

const app = express()
app.use(cors())
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
const { Article, Comment } = require('./models/collections');


async function connectToMongoDB() {
  try {
    await mongoose.connect("mongodb://localhost:27017/blog", {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error(error);
  }
}
connectToMongoDB();

app.get('/articles', async (req, res) => {
  try {
    const articles = await Article.find();
    res.json(articles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.get('/articles/:_id', async (req, res) => {
  try {
    const { _id } = req.params;
    const objectId = new ObjectId(_id);
    const article = await Article.findById(objectId);
    const comments = await Comment.find({ articleId: _id });
    res.json({ article, comments });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "An error occurred while fetching the data." });
  }
});

app.post('/add-article', async (req, res) => {
  try {
    const { commentText, articleId } = req.body
    const newArticle = new Article({ ...req.body, totalLikes: 0, totalComments: 0, totalShares: 0 });
    await newArticle.save();
    //avoid sending empty comment by default
    if (commentText) {
      const newComment = new Comment({ commentText, articleId });
      await newComment.save();
    }
    res.json({ addSuccess: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to add article' });
  }
});

app.post('/add-comment', async (req, res) => {
  try {
    const { commentText, articleId } = req.body
    if (!commentText.length) {
      return res.status(400).json({ error: 'Comment text cannot be empty' });
    }
    const newComment = new Comment({ commentText, articleId });
    const article = await Article.findByIdAndUpdate(articleId, { $inc: { totalComments: 1 } }, { new: true });
    await newComment.save();
    res.json({ addCommentSuccess: true, article, newComment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to add comment' });
  }
});

app.post(`/articles/:_id/increment-likes`, async (req, res) => {
  try {
    const { _id } = req.params;
    const { like } = req.body;
    let increment = like ? 1 : -1;
    const updatedLikes = await Article.findOneAndUpdate({ _id }, { $inc: { totalLikes: increment } }, { new: true });
    res.json(updatedLikes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

app.post(`/articles/:_id/increment-shares`, async (req, res) => {
  try {
    const { _id } = req.params;
    const updatedShares = await Article.findOneAndUpdate({ _id }, { $inc: { totalShares: 1 } }, { new: true });
    res.json(updatedShares);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/articles/:_id', async (req, res) => {
  try {
    const { _id } = req.params;
    const objectId = new ObjectId(_id);
    await Article.findByIdAndUpdate(objectId, req.body);
    res.json({ editArticleWithSuccess: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/comments/:_id', async (req, res) => {
  try {
    const {_id} = params
  const objectId = new ObjectId(_id);
  await Comment.findByIdAndUpdate(objectId)
  res.json({editCommentWithSuccess: true})
  } catch (error) {
    res.status(500).json({error: error.message})
  }
})

app.delete('/articles/:_id', async (req, res) => {
  try {
    const { _id } = req.params;
    const objectId = new ObjectId(_id);
    await Article.findByIdAndDelete(objectId);
    await Comment.deleteMany({ articleId: objectId })
    res.json({ deleteArticleWithSuccess: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/comments/:_id', async (req, res) => {
  try {
    const { _id } = req.params;
    const objectId = new ObjectId(_id);
    const deletedComment = await Comment.findByIdAndDelete(objectId);
    const article = await Article.findById(deletedComment.articleId)
    article.totalComments -= 1
    await article.save()
    res.json({deleteCommentWithSuccess: true})
  } catch (error) {
    res.status(500).json({error: error.message})
  }
})

const port = process.env.PORT || 4000;
app.listen(port, (err) => {
  console.log(`CORS-enabled web server, Server is running on port ${port}`);
  if (err) throw err;
  console.log(`> Ready on http://localhost:${port}`);
});


/*app.get('/articles/:category', async (req, res) => {
  console.log(req.body)
  const { category } = req.params;
  const article = await Article.find({ category });
  res.json(article);
  });*/