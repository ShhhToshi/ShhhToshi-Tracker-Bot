const User = require('../models/User');

// Escape MarkdownV2-reserved characters
const escapeMarkdownV2 = (text) =>
  text.replace(/[_*[\]()~`>#+=|{}.!-]/g, '\\$&');

module.exports = (bot) => {
  bot.command('myrank', async (ctx) => {
    const { id, username } = ctx.from;

    const users = await User.find().sort({ messageCount: -1 });
    const userIndex = users.findIndex(u => u.telegramId === id);

    if (userIndex === -1) {
      return ctx.reply('❌ You are not ranked yet. Send some messages first!');
    }

    const user = users[userIndex];
    const rank = userIndex + 1;

    const safeUsername = escapeMarkdownV2(user.username || 'Anonymous');

    ctx.replyWithMarkdownV2(
      `📊 *Your Stats*\n\n` +
      `👤 *Username*: ${safeUsername}\n` +
      `🏆 *Rank*: ${rank} out of ${users.length}\n` +
      `💬 *Total Messages*: ${user.messageCount}\n` +
      `📅 *Today*: ${user.dailyCount} messages`
    );
  });
};
