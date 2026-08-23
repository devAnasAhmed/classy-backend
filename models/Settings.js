const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true },
  value: { type: String, required: true },
  label: { type: String, default: '' },
  group: { type: String, default: 'general' }, // general, social, shipping
}, { timestamps: true });

module.exports = mongoose.model('Settings', settingsSchema);
