const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    enum: ['frontend', 'backend', 'database', 'tools', 'other'],
    required: true
  },
  proficiency: {
    type: Number,
    min: 0,
    max: 100,
    required: true
  },
  icon: {
    type: String
  },
  order: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model('Skill', skillSchema);
