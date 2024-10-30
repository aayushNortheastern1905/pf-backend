
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid'); // Import uuid to generate unique IDs

const NewsSchema = new mongoose.Schema({
   newsId: { type: String, default: uuidv4, unique: true }, // Custom unique identifier
   title: { type: String, required: [true, 'Title is required'] },
   content: { type: String, required: [true, 'Content is required'] },
   author: { type: String, required: [true, 'Author is required'] },
   timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('News', NewsSchema);
