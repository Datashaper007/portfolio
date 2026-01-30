const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema({
  company: {
    type: String,
    required: true
  },
  position: {
    type: String,
    required: true
  },
  duration: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  technologies: [{
    type: String
  }],
  type: {
    type: String,
    enum: ['work', 'education', 'freelance'],
    default: 'work'
  },
  order: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model('Experience', experienceSchema);
