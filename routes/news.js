const express = require('express');
const router = express.Router();
const News = require('../models/News');

// POST /news - Create a new news article
router.post('/', async (req, res) => {
   const { title, content, author } = req.body;

   // Validation check
   if (!title || !content || !author) {
      return res.status(400).json({ error: 'Title, content, and author are required.' });
   }

   try {
      const newArticle = new News({ title, content, author });
      const savedArticle = await newArticle.save();
      res.status(201).json(savedArticle);
   } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: 'Failed to create article.' });
   }
});

// GET /news - Fetch all news articles
router.get('/', async (req, res) => {
   try {
      const articles = await News.find().sort({ timestamp: -1 });
      if (articles.length === 0) {
         return res.status(404).json({ message: 'No articles found.' });
      }
      res.status(200).json(articles);
   } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: 'Failed to retrieve articles.' });
   }
});

module.exports = router;
