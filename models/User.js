const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  telegramId: { type: Number, required: true, unique: true },
  username: String,
  messageCount: { type: Number, default: 0 },       // total messages
  dailyCount: { type: Number, default: 0 },         // daily messages
  lastMessageDate: { type: Date, default: null },   // track reset date
});

module.exports = mongoose.model('User', UserSchema);
