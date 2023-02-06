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
const Article = require('./models/Article');

mongoose.connect("mongodb://localhost:27017/blog", 
  {
  useNewUrlParser: true,
  useUnifiedTopology: true
  })
.then(() => console.log("Connected to MongoDB"))
.catch(error => console.error(error));

  app.get('/articles', async (req, res) => {
  const articles = await Article.find();
  res.json(articles);
  });
  app.get('/articles/:_id', async (req, res) => {
    console.log(req.body)
    const { _id } = req.params;
    const objectId = new ObjectId(_id);
    const article = await Article.findById(objectId);
    res.json(article);
    });
    /*app.get('/articles/listing/article/:category', async (req, res) => {
      console.log(req.body)
      const { category } = req.params;
      const article = await Article.find({ category });
      res.json(article);
      });*/
  
  app.post('/add_article', async (req, res) => {
  console.log(req.body)
  const newArticle = new Article({...req.body, totalLikes: 0, totalComments: 0});
  await newArticle.save();
  res.json({ Add_success: true });
  });
  app.post('/articles/:id/increment_likes', async (req, res) => {
    const {_id} = req.params
    const updatedLikes = await Article.findOneAndUpdate(_id, { $inc: { totalLikes: 1 } }, { new: true })
    res.json(updatedLikes)
  });
  app.post('/articles/:id/increment_comments', async (req, res) => {
    const {_id} = req.params
    const updatedComments = await Article.findOneAndUpdate(_id, { $inc: { totalComments: 1 } }, { new: true })
    res.json(updatedComments)
  })

  app.put('/articles/:_id', async (req, res) => {
    const { _id } = req.params;
    const objectId = new ObjectId(_id);
    await Article.findByIdAndUpdate(objectId, req.body);
    res.json({ Edit_success: true });
  });
  
  app.delete('/articles/:_id', async (req, res) => {
    console.log(req.body)
    const { _id } = req.params;
    const objectId = new ObjectId(_id);
    await Article.findByIdAndDelete(objectId);
    res.json({ Delete_success: true });
  });

  const port = process.env.PORT || 4000;
  app.listen(port, (err) => {
    console.log(`CORS-enabled web server, Server is running on port ${port}`);
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
