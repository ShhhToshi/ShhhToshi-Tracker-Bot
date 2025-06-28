const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  telegramId: { type: Number, required: true, unique: true },
  username: String,
  messageCount: { type: Number, default: 0 },
});

module.exports = mongoose.model('User', UserSchema);
