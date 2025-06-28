const User = require('../models/User');

module.exports = (bot) => {
  bot.command('leaderboard', async (ctx) => {
    console.log('✅ /leaderboard triggered');

    const topUsers = await User.find().sort({ messageCount: -1 }).limit(25);

    if (topUsers.length === 0) {
      return ctx.reply('📭 No message data available yet.');
    }

    let reply = '🏆 <b>Top Active Users</b>\n\n';
    topUsers.forEach((user, index) => {
      reply += `${index + 1}. <i>${user.username || 'Anonymous'}</i> — ${user.messageCount} msgs\n`;
    });

    ctx.replyWithHTML(reply);
  });
};
