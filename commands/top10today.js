const User = require('../models/User');

function escapeMarkdownV2(text) {
  return text.replace(/([_*\[\]()~`>#+\-=|{}.!\\])/g, '\\$1');
}

module.exports = (bot) => {
  bot.command('top10today', async (ctx) => {
    const today = new Date().toISOString().split('T')[0];

    const users = await User.find({
      lastMessageDate: { $gte: new Date(today) }
    }).sort({ dailyCount: -1 }).limit(25);

    if (!users.length) {
      return ctx.reply('📭 No messages have been sent today.');
    }

    let msg = `🏅 *Top Users Today*\n\n`;

    users.forEach((user, index) => {
      const name = escapeMarkdownV2(user.username || 'Anonymous');
      msg += `\\${index + 1}\\.` + ` ${name} — ${user.dailyCount} messages\n`;
    });

    ctx.replyWithMarkdownV2(msg);
  });
};
