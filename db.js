
const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
   // Use test database URI if NODE_ENV is set to 'test'
   const dbUri = process.env.NODE_ENV === 'test' ? process.env.MONGO_URI_TEST : process.env.MONGO_URI;
   try {
      await mongoose.connect(dbUri, {
         useNewUrlParser: true,
         useUnifiedTopology: true,
      });
      console.log(`MongoDB connected: ${process.env.NODE_ENV === 'test' ? 'Test Database' : 'Production/Dev Database'}`);
   } catch (error) {
      console.error('Database connection error:', error.message);
      process.exit(1); // Exit process with failure
   }
};

module.exports = connectDB;
