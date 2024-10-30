
const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const News = require('../models/News');
const connectDB = require('../db');
const app = express();

app.use(express.json());
app.use('/news', require('../routes/news'));

// Set up the database connection before all tests
beforeAll(async () => {
   // Ensure we're connecting to the test database
   await connectDB();
});

// Clear the test database after each test to ensure isolation
afterEach(async () => {
   await News.deleteMany({});
});

// Disconnect from the database after all tests are complete
afterAll(async () => {
   await mongoose.disconnect();
});

// POST /news tests
describe('POST /news', () => {
   it('should create a new article and return 201', async () => {
      const response = await request(app)
         .post('/news')
         .send({
            title: 'Automated Test News',
            content: 'Content for automated test news',
            author: 'Automated Tester'
         });
      expect(response.statusCode).toBe(201);
      expect(response.body).toHaveProperty('title', 'Automated Test News');
   });

   it('should return 400 if required fields are missing', async () => {
      const response = await request(app)
         .post('/news')
         .send({ title: 'Incomplete Test News' });
      expect(response.statusCode).toBe(400);
      expect(response.body).toHaveProperty('error', 'Title, content, and author are required.');
   });
});

// GET /news tests
describe('GET /news', () => {
   it('should fetch all articles and return 200', async () => {
      // Insert a sample article to ensure the database is not empty
      await News.create({
         title: 'Sample Article',
         content: 'Sample content for the article',
         author: 'Sample Author'
      });

      const response = await request(app).get('/news');
      expect(response.statusCode).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
   });

   it('should return 404 if no articles are found', async () => {
      const response = await request(app).get('/news');
      expect(response.statusCode).toBe(404);
      expect(response.body).toHaveProperty('message', 'No articles found.');
   });
});
